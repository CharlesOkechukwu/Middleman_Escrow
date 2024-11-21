"""Dispute Comments Model Module"""
from api.app import db


class DisputeComments(db.Model):
    """Dispute Comments model"""
    __tablename__ = 'dispute_comments'
    id = db.Column(db.Integer, primary_key=True)
    dispute_id = db.Column(db.Integer, db.ForeignKey('disputes.id'), nullable=False)
    comment = db.Column(db.String(300), nullable=False)
    commented_at = db.Column(db.DateTime, nullable=False)
    commented_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_role = db.Column(db.String(100), nullable=False)