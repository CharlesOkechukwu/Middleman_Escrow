"""Dispute Photo Model Module"""
from api.app import db


class DisputePhoto(db.Model):
    """Dispute Photo model"""
    __tablename__ = 'dispute_photos'
    id = db.Column(db.Integer, primary_key=True)
    dispute_id = db.Column(db.Integer, db.ForeignKey('disputes.id'), nullable=False)
    photo_url = db.Column(db.String(300), nullable=True)
    photo_description = db.Column(db.String(300), nullable=False)
    uploaded_at = db.Column(db.DateTime, nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)