// Expense Tracker JavaScript

const API_BASE = '/api';
let categoryChart = null;

// Categorias predefinidas
const PREDEFINED_CATEGORIES = {
    income: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Outros']
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Definir data atual no formulário
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    
    // Carregar dados iniciais
    loadDashboard();
    setupEventListeners();
    loadCategories();
});

// Configurar event listeners
function setupEventListeners() {
    // Formulário de transação
    document.getElementById('transaction-form').addEventListener('submit', handleTransactionSubmit);
    
    // Mudança de tipo para atualizar categorias
    document.getElementById('type').addEventListener('change', updateCategoriesForType);
    
    // Campo de nova categoria
    document.getElementById('new-category').addEventListener('input', function() {
        if (this.value) {
            document.getElementById('category').value = '';
        }
    });
    
    document.getElementById('category').addEventListener('change', function() {
        if (this.value) {
            document.getElementById('new-category').value = '';
        }
    });
}

// Navegação entre seções
function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar seção selecionada
    document.getElementById(sectionId).style.display = 'block';
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
    
    // Carregar dados específicos da seção
    if (sectionId === 'dashboard') {
        loadDashboard();
    } else if (sectionId === 'transactions') {
        loadTransactions();
    }
}

// Carregar dados do dashboard
async function loadDashboard() {
    try {
        const response = await fetch(`${API_BASE}/dashboard`);
        const data = await response.json();
        
        // Atualizar totais
        document.getElementById('total-income').textContent = formatCurrency(data.totals.income);
        document.getElementById('total-expense').textContent = formatCurrency(data.totals.expense);
        document.getElementById('balance').textContent = formatCurrency(data.totals.balance);
        
        // Atualizar cor do saldo
        const balanceElement = document.getElementById('balance');
        const balanceCard = balanceElement.closest('.card');
        balanceCard.className = balanceCard.className.replace(/bg-\w+/, '');
        balanceCard.classList.add(data.totals.balance >= 0 ? 'bg-success' : 'bg-warning');
        
        // Atualizar gráfico de categorias
        updateCategoryChart(data.expenses_by_category);
        
        // Atualizar transações recentes
        updateRecentTransactions(data.recent_transactions);
        
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        showToast('Erro ao carregar dados do dashboard', 'error');
    }
}

// Atualizar gráfico de categorias
function updateCategoryChart(expensesByCategory) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    if (expensesByCategory.length === 0) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#6c757d';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhuma despesa registrada', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    
    const labels = expensesByCategory.map(item => item.category);
    const data = expensesByCategory.map(item => item.amount);
    const colors = generateColors(labels.length);
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}

// Atualizar transações recentes
function updateRecentTransactions(transactions) {
    const container = document.getElementById('recent-transactions');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhuma transação encontrada</p>';
        return;
    }
    
    container.innerHTML = transactions.map(transaction => `
        <div class="transaction-item transaction-${transaction.type}">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${transaction.category}</strong>
                    <br>
                    <small class="text-muted">${formatDate(transaction.date)}</small>
                    ${transaction.description ? `<br><small>${transaction.description}</small>` : ''}
                </div>
                <div class="text-end">
                    <span class="amount-${transaction.type === 'income' ? 'positive' : 'negative'}">
                        ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Carregar categorias
function loadCategories() {
    const typeSelect = document.getElementById('type');
    const categorySelect = document.getElementById('category');
    
    typeSelect.addEventListener('change', updateCategoriesForType);
}

// Atualizar categorias baseado no tipo
function updateCategoriesForType() {
    const type = document.getElementById('type').value;
    const categorySelect = document.getElementById('category');
    
    categorySelect.innerHTML = '<option value="">Selecione a categoria</option>';
    
    if (type && PREDEFINED_CATEGORIES[type]) {
        PREDEFINED_CATEGORIES[type].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
}

// Manipular envio do formulário
async function handleTransactionSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const category = document.getElementById('category').value || document.getElementById('new-category').value;
    
    if (!category) {
        showToast('Por favor, selecione ou digite uma categoria', 'error');
        return;
    }
    
    const transactionData = {
        type: formData.get('type') || document.getElementById('type').value,
        amount: parseFloat(formData.get('amount') || document.getElementById('amount').value),
        category: category,
        date: formData.get('date') || document.getElementById('date').value,
        description: formData.get('description') || document.getElementById('description').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });
        
        if (response.ok) {
            showToast('Transação adicionada com sucesso!', 'success');
            event.target.reset();
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
            document.getElementById('new-category').value = '';
            loadDashboard();
        } else {
            const error = await response.json();
            showToast(error.error || 'Erro ao adicionar transação', 'error');
        }
    } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        showToast('Erro ao adicionar transação', 'error');
    }
}

// Carregar todas as transações
async function loadTransactions() {
    try {
        const response = await fetch(`${API_BASE}/transactions`);
        const transactions = await response.json();
        
        const tbody = document.getElementById('transactions-table');
        
        if (transactions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Nenhuma transação encontrada</td></tr>';
            return;
        }
        
        tbody.innerHTML = transactions.map(transaction => `
            <tr>
                <td>${formatDate(transaction.date)}</td>
                <td>
                    <span class="badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'}">
                        ${transaction.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                </td>
                <td>${transaction.category}</td>
                <td>${transaction.description || '-'}</td>
                <td class="amount-${transaction.type === 'income' ? 'positive' : 'negative'}">
                    ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                </td>
                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteTransaction(${transaction.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Erro ao carregar transações:', error);
        showToast('Erro ao carregar transações', 'error');
    }
}

// Deletar transação
async function deleteTransaction(id) {
    if (!confirm('Tem certeza que deseja deletar esta transação?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/transactions/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('Transação deletada com sucesso!', 'success');
            loadTransactions();
            loadDashboard();
        } else {
            showToast('Erro ao deletar transação', 'error');
        }
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        showToast('Erro ao deletar transação', 'error');
    }
}

// Utilitários
function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
}

function generateColors(count) {
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
        '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'
    ];
    
    return colors.slice(0, count);
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    
    // Remover classes de tipo anteriores
    toast.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');
    
    // Adicionar classe baseada no tipo
    switch (type) {
        case 'success':
            toast.classList.add('bg-success', 'text-white');
            break;
        case 'error':
            toast.classList.add('bg-danger', 'text-white');
            break;
        case 'warning':
            toast.classList.add('bg-warning');
            break;
        default:
            toast.classList.add('bg-info', 'text-white');
    }
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

