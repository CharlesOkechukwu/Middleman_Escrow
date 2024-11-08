"""utility function for user authentication"""
import json
from api.models import User
from api.app import db

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