"""utility function for user authentication"""
import json
from threading import Thread
from flask_mail import Message
from api.models import User
from api.app import db, jwt, jwt_redis_blocklist, mail

def get_user_by_email(email):
    """get user by email."""
    return User.query.filter_by(email=email).first()


def model_to_json(obj):
    """serialize SQLALchemy Object to json"""
    data = {}
    fields = [field for field in dir(obj) if not field.startswith('_') and field != 'metadate' and field != 'password']
    for field in fields:
        value = obj.__getattribute__(field)
        try:
            json.dumps(value)
            data[field] = value
        except TypeError:
            data[field] = None
    return data


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    """check if token is revoked."""
    jti = jwt_payload['jti']
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None


def send_email(subject, sender, reciepient, body):
    """Send Email to User."""
    msg = Message(subject, sender=sender, recipients=[reciepient])
    msg.body = body
    mail.send(msg)


def validate_email(email):
    """validate email."""
    return '@' in email and '.' in email


def validate_password(password):
    """check if password is valid."""
    if len(password) < 8:
        return False
    numbers = [str(i) for i in range(10)]
    if not any(char in numbers for char in password):
        return False
    special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=']
    if not any(char in special_chars for char in password):
        return False
    return True