"""disputes object model module"""
from api.app import db


class Disputes(db.Model):
    """Disputes object model"""
    __tablename__ = 'disputes'
    id = db.Column(db.Integer, primary_key=True)
    escrow_uid = db.Column(db.String(300), db.ForeignKey('escrow_purchase_contracts.escrow_uid'), nullable=False)
    transaction_refernce = db.Column(db.String(300), db.ForeignKey('transactions.reference'), nullable=False)
    dispute_topic = db.Column(db.String(300), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    buyer_name = db.Column(db.String(300), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_name = db.Column(db.String(300), nullable=False)
    dispute_description = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    status = db.Column(db.String(300), nullable=False)
    resolution = db.Column(db.String(500), nullable=True)
    resolved_by = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=True)
    staff_name = db.Column(db.String(300), nullable=True)
    photos = db.relationship('DisputePhoto', backref='dispute', lazy=True)
    comments = db.relationship('DisputeComments', backref='dispute', lazy=True)