from flask import Blueprint, request, jsonify
from src.models.transaction import Transaction, db
from datetime import datetime
from sqlalchemy import func, extract

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_transactions():
    """Retorna todas as transações"""
    transactions = Transaction.query.order_by(Transaction.date.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])

@transaction_bp.route('/transactions', methods=['POST'])
def add_transaction():
    """Adiciona uma nova transação"""
    try:
        data = request.get_json()
        
        # Validação básica
        if not data.get('type') or not data.get('amount') or not data.get('category'):
            return jsonify({'error': 'Campos obrigatórios: type, amount, category'}), 400
        
        # Converte a data se fornecida
        date = datetime.strptime(data.get('date', datetime.now().strftime('%Y-%m-%d')), '%Y-%m-%d').date()
        
        transaction = Transaction(
            type=data['type'],
            amount=float(data['amount']),
            category=data['category'],
            date=date,
            description=data.get('description', '')
        )
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify(transaction.to_dict()), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    """Deleta uma transação"""
    transaction = Transaction.query.get_or_404(transaction_id)
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transação deletada com sucesso'})

@transaction_bp.route('/dashboard', methods=['GET'])
def get_dashboard_data():
    """Retorna dados para o dashboard"""
    # Totais gerais
    total_income = db.session.query(func.sum(Transaction.amount)).filter(Transaction.type == 'income').scalar() or 0
    total_expense = db.session.query(func.sum(Transaction.amount)).filter(Transaction.type == 'expense').scalar() or 0
    balance = total_income - total_expense
    
    # Gastos por categoria (apenas despesas)
    expenses_by_category = db.session.query(
        Transaction.category,
        func.sum(Transaction.amount).label('total')
    ).filter(Transaction.type == 'expense').group_by(Transaction.category).all()
    
    # Transações recentes (últimas 5)
    recent_transactions = Transaction.query.order_by(Transaction.date.desc()).limit(5).all()
    
    return jsonify({
        'totals': {
            'income': total_income,
            'expense': total_expense,
            'balance': balance
        },
        'expenses_by_category': [{'category': cat, 'amount': float(amount)} for cat, amount in expenses_by_category],
        'recent_transactions': [transaction.to_dict() for transaction in recent_transactions]
    })

@transaction_bp.route('/report/<int:year>/<int:month>', methods=['GET'])
def get_monthly_report(year, month):
    """Retorna relatório mensal"""
    transactions = Transaction.query.filter(
        extract('year', Transaction.date) == year,
        extract('month', Transaction.date) == month
    ).all()
    
    income = sum(t.amount for t in transactions if t.type == 'income')
    expense = sum(t.amount for t in transactions if t.type == 'expense')
    
    # Gastos por categoria no mês
    expenses_by_category = {}
    for t in transactions:
        if t.type == 'expense':
            if t.category not in expenses_by_category:
                expenses_by_category[t.category] = 0
            expenses_by_category[t.category] += t.amount
    
    return jsonify({
        'year': year,
        'month': month,
        'income': income,
        'expense': expense,
        'balance': income - expense,
        'expenses_by_category': expenses_by_category,
        'transactions': [t.to_dict() for t in transactions]
    })

@transaction_bp.route('/categories', methods=['GET'])
def get_categories():
    """Retorna lista de categorias únicas"""
    categories = db.session.query(Transaction.category).distinct().all()
    return jsonify([cat[0] for cat in categories])

