"""Module for escrow purchase order object model"""
from api.app import db


class EscrowPurchaseOrder(db.Model):
    """Escrow Purchase order object model"""
    __tablename__ = 'escrow_purchase_orders'
    order_id = db.Column(db.Integer, primary_key=True)
    seller_name = db.Column(db.String(300), nullable=False)
    buyer_name = db.Column(db.String(300), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    delivery_fee = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(100), nullable=False)
    items = db.relationship('EscrowOrderItem', backref='escrow_purchase_order', lazy=True)