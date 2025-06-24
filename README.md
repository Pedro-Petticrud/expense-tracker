# 💰 Expense Tracker - Controlador de Gastos Pessoais

Um aplicativo web moderno e intuitivo para controle de receitas e despesas pessoais, desenvolvido com Python Flask e interface responsiva.

![Dashboard](https://img.shields.io/badge/Status-Funcional-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.1+-red)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## 🎯 Funcionalidades

- **Dashboard Interativo**: Visualização em tempo real de receitas, despesas e saldo
- **Cadastro de Transações**: Adicionar receitas e despesas com categorização automática
- **Gráficos Dinâmicos**: Visualização de gastos por categoria usando Chart.js
- **Histórico Completo**: Lista de todas as transações com opção de exclusão
- **Interface Responsiva**: Design moderno que funciona em desktop e mobile
- **Categorias Predefinidas**: Categorias organizadas para receitas e despesas
- **Banco de Dados Local**: Armazenamento seguro em SQLite

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| **Backend** | Python + Flask |
| **Frontend** | HTML5 + CSS3 + JavaScript |
| **Banco de Dados** | SQLite |
| **Gráficos** | Chart.js |
| **Estilo** | Bootstrap 5 + CSS customizado |
| **Ícones** | Font Awesome |

## 🚀 Instalação Rápida

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes do Python)

### Passos de Instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se usando Git
   git clone <url-do-repositorio>
   cd expense-tracker
   ```

2. **Crie um ambiente virtual**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute o aplicativo**
   ```bash
   python src/main.py
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5000
   ```

## 📱 Como Usar

### Adicionando uma Transação
1. Clique em **"Nova Transação"**
2. Selecione o tipo (Receita ou Despesa)
3. Digite o valor e escolha uma categoria
4. Adicione uma descrição (opcional)
5. Clique em **"Salvar Transação"**

### Visualizando Relatórios
- **Dashboard**: Visão geral com totais e gráficos
- **Transações**: Lista completa de todas as transações
- **Gráfico de Pizza**: Distribuição de gastos por categoria

## 📊 Estrutura do Projeto

```
expense-tracker/
├── src/
│   ├── models/
│   │   └── transaction.py      # Modelo de dados
│   ├── routes/
│   │   └── transaction.py      # Rotas da API
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css       # Estilos personalizados
│   │   ├── js/
│   │   │   └── script.js       # Lógica do frontend
│   │   └── index.html          # Página principal
│   ├── database/
│   │   └── app.db             # Banco SQLite
│   └── main.py                # Servidor Flask
├── venv/                      # Ambiente virtual
├── requirements.txt           # Dependências
├── GUIA_INSTALACAO.md        # Guia detalhado
└── README.md                 # Este arquivo
```

## 🎨 Capturas de Tela

### Dashboard Principal
- Cartões com totais de receitas, despesas e saldo
- Gráfico de pizza com gastos por categoria
- Lista de transações recentes

### Formulário de Nova Transação
- Interface intuitiva para cadastro
- Categorias predefinidas organizadas por tipo
- Validação de campos obrigatórios

### Lista de Transações
- Tabela responsiva com todas as transações
- Opção de exclusão individual
- Filtros por data e categoria

## 🔧 Personalização

### Adicionando Categorias
Edite o arquivo `src/static/js/script.js` e modifique o objeto `PREDEFINED_CATEGORIES`:

```javascript
const PREDEFINED_CATEGORIES = {
    income: ['Salário', 'Freelance', 'Nova Categoria'],
    expense: ['Alimentação', 'Transporte', 'Nova Categoria']
};
```

### Alterando Cores
Modifique o arquivo `src/static/css/style.css` para personalizar as cores do tema.

### Mudando Moeda
Altere a função `formatCurrency` em `src/static/js/script.js` para usar sua moeda local.

## 📋 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/transactions` | Lista todas as transações |
| `POST` | `/api/transactions` | Cria nova transação |
| `DELETE` | `/api/transactions/<id>` | Deleta transação |
| `GET` | `/api/dashboard` | Dados do dashboard |
| `GET` | `/api/categories` | Lista categorias únicas |

## 🛡️ Segurança

- **Uso Local**: Aplicativo destinado para uso pessoal/local
- **Dados Locais**: Informações armazenadas apenas no seu computador
- **Sem Autenticação**: Não requer login (adequado para uso pessoal)

> ⚠️ **Aviso**: Para uso em produção ou compartilhamento, implemente autenticação e use HTTPS.

## 🔄 Backup e Restauração

### Fazer Backup
```bash
# Copie o arquivo do banco de dados
cp src/database/app.db backup_$(date +%Y%m%d).db
```

### Restaurar Backup
```bash
# Substitua o banco atual pelo backup
cp backup_20250624.db src/database/app.db
```

## 🐛 Solução de Problemas

### Erro: "Módulo não encontrado"
```bash
# Certifique-se de que o ambiente virtual está ativado
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Reinstale as dependências
pip install -r requirements.txt
```

### Erro: "Porta em uso"
Modifique a porta no arquivo `src/main.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Banco de Dados Corrompido
```bash
# Delete o banco e reinicie o servidor
rm src/database/app.db
python src/main.py
```

## 📈 Próximas Funcionalidades

- [ ] Relatórios mensais e anuais
- [ ] Exportação para CSV/PDF
- [ ] Metas de gastos por categoria
- [ ] Gráficos de tendência temporal
- [ ] Backup automático
- [ ] Modo escuro

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.



## 📞 Suporte

Para dúvidas, problemas ou sugestões:
- Consulte o [Guia de Instalação Detalhado](GUIA_INSTALACAO.md)
- Abra uma issue no repositório
- Verifique a seção de solução de problemas acima

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

