"""Module for Escrow Purchase Contract Model"""
from api.app import db


class EscrowPurchaseContract(db.Model):
    """Escrow purchase contract model class."""
    __tablename__ = 'escrow_purchase_contracts'
    id = db.Column(db.Integer, primary_key=True)
    escrow_uid = db.Column(db.String(300), unique=True, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_name = db.Column(db.String(300), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    buyer_name = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    delivery_fee = db.Column(db.Float, nullable=False)
    delivery_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(300), nullable=False)
    items = db.relationship('EPCItem', backref='escrow_purchase_contract', lazy=True)
    delivery_details = db.relationship('DeliveryDetails', backref='escrow_purchase_contract', lazy=True)