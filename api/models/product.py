"""Create Product class model"""
from api.app import db


class Product(db.Model):
    """Product data model class."""
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(300), nullable=False, unique=True)
    name = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    details = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    __table_args__ = (db.UniqueConstraint('code', name='unique_product_code'),)