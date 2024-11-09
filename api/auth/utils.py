"""utility function for user authentication"""
import json
from api.models import User
from api.app import db, jwt, jwt_redis_blocklist

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