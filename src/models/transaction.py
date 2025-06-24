from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False)  # 'income' ou 'expense'
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date())
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'amount': self.amount,
            'category': self.category,
            'date': self.date.isoformat(),
            'description': self.description,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<Transaction {self.id}: {self.type} - R$ {self.amount}>'

