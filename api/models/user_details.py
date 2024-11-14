"""User Business Details Module"""
from api.app import db


class UserDetails(db.Model):
    """User Details model class."""
    __tablename__ = 'user_details'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_name = db.Column(db.String(300), nullable=True)
    bank_name = db.Column(db.String(300), nullable=True)
    bank_account_number = db.Column(db.String(300), nullable=True)
    bank_account_name = db.Column(db.String(300), nullable=True)