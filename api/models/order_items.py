"""Escrow Order items object model module"""
from api.app import db


class EscrowOrderItem(db.Model):
    """Escrow Order Items object model"""
    __tablename__ = 'escrow_order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('escrow_purchase_orders.order_id'), nullable=False)
    item_name = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity =  db.Column(db.Integer, nullable=False)
    total = db.Column(db.Float, nullable=False)