"""Staff model module."""
from werkzeug.security import generate_password_hash, check_password_hash
from api.app import db


class Staff(db.Model):
    """Staff model class."""
    __tablename__ = 'staff'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    role = db.Column(db.String(300), nullable=False)
    password = db.Column(db.String(300), nullable=False)

    def set_password(self, password):
        """set and hash staff's password."""
        self.password = generate_password_hash(password)
    
    def validate_password(self, password):
        """validate staff's password."""
        return check_password_hash(self.password, password)
