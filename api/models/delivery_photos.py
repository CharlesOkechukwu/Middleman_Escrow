"""Delivery Details Photo model module"""
from api.app import db


class DeliveryPhotos(db.Model):
    """Delivery Details photo model class."""
    __tablename__ = 'delivery_photos'
    id = db.Column(db.Integer, primary_key=True)
    delivery_id = db.Column(db.Integer, db.ForeignKey('delivery_details.id'), nullable=False)
    photo_url = db.Column(db.String(300), nullable=False)
    uploaded_at = db.Column(db.DateTime, nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)