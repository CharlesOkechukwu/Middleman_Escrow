"""Escrow Purchase Contract Items Model Module"""
from api.app import db


class EPCItem(db.Model):
    """Escrow Purchase Contract Items model"""
    __tablename__ = 'epc_items'
    id = db.Column(db.Integer, primary_key=True)
    escrow_uid = db.Column(db.String(300), db.ForeignKey('escrow_purchase_contracts.escrow_uid'), nullable=False)
    product_name = db.Column(db.String(300), nullable=False)
    product_code = db.Column(db.String(300), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(300), nullable=False)