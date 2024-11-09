"""user authentication routes."""
import redis
from flask import jsonify, request, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from . import auth
from .utils import get_user_by_email, model_to_json, jwt_redis_blocklist
from api.models import User
from api.app import db, EXPIRY


@auth.route('/register', methods=['POST'], strict_slashes=False)
def register():
    """register a new user."""
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    user = get_user_by_email(email)
    if user:
        return jsonify({'message': 'User already exists'}), 400
    
    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    new_user = model_to_json(new_user)
    user_data = {'id': new_user['id'], 'name': new_user['name'], 'email': new_user['email']}
    return jsonify({'user': user_data, 'message': "User Created Successfully"}), 201


@auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """autheticate and login a user."""
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing input for email or password"}), 400
    
    user = get_user_by_email(email)
    if not user:
        return jsonify({'message': 'Incorrect email, user does not exist!'}), 400
    
    if not user.validate_password(password):
        return jsonify({'message': 'Incorrect password'}), 400
    
    user = model_to_json(user)
    access_token = create_access_token(identity=user['id'])
    return jsonify({'message': 'User logged in successfully', 'access_token': access_token}), 200

@auth.route('/user', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_user():
    """retrieve user details."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'Invalid jwt token or user does not exist'}), 400
    user = model_to_json(user)
    user_data = {'name': user['name'], 'email': user['email']}
    return jsonify({'user': user_data}), 200


@auth.route('/logout/', methods=['POST'], strict_slashes=False)
@jwt_required()
def logout():
    """logout a user"""
    jti = get_jwt()['jti']
    jwt_redis_blocklist.set(jti, "", ex=EXPIRY)
    return jsonify({'message': 'User logged out successfully'}), 200