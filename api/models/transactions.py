"""Transaction object model module"""
from api.app import db


class Transaction(db.Model):
    """Escrow Transaction object model"""
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    escrow_uid = db.Column(db.String(300), db.ForeignKey('escrow_purchase_contracts.escrow_uid'), nullable=False)
    reference = db.Column(db.String(300), nullable=False, unique=True)
    amount = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('epc_items.id'), nullable=False)
    product_name = db.Column(db.String(300), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    buyer_name = db.Column(db.String(300), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_name = db.Column(db.String(300), nullable=False)
    item_description = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    transaction_status = db.Column(db.String(300), nullable=False)