"""Create User class model for the API."""
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from api.app import db


class User(UserMixin, db.Model):
    """User model class."""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    products = db.relationship('Product', backref='user')
    details = db.relationship('UserDetails', backref='user_details')

    def set_password(self, password):
        """set and hash user's password."""
        self.password = generate_password_hash(password)
    
    def validate_password(self, password):
        """validate user's password."""
        return check_password_hash(self.password, password)