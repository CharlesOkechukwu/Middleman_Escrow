"""Delivery details model module"""
from api.app import db


class DeliveryDetails(db.Model):
    """Delivery Details model class."""
    __tablename__ = 'delivery_details'
    id = db.Column(db.Integer, primary_key=True)
    escrow_uid = db.Column(db.String(300), db.ForeignKey('escrow_purchase_contracts.escrow_uid'), nullable=False)
    dispatch_date = db.Column(db.DateTime, nullable=False)
    logistics_company = db.Column(db.String(300), nullable=False)
    tracking_number = db.Column(db.String(300), nullable=False)
    delivery_location = db.Column(db.String(300), nullable=False)
    delivery_due_date = db.Column(db.DateTime, nullable=False)
    delivery_contact_number = db.Column(db.String(300), nullable=True)
    delivery_status = db.Column(db.String(300), nullable=False)
    photos = db.relationship('DeliveryPhotos', backref='delivery_details', lazy=True)