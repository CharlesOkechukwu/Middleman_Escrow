"""user authentication routes."""
from flask import jsonify, request, session
from flask_login import login_user, logout_user
from . import auth
from .utils import get_user_by_email, model_to_json
from api.models import User
from api.app import db


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
    
    login_user(user)
    user = model_to_json(user)
    print(user['id'])
    return jsonify({'id': user['id'], 'name': user['name'], 'email': user['email'], 'message': 'User logged in successfully'}), 200


@auth.route('/logout/', methods=['POST'], strict_slashes=False)
def logout():
    """logout a user"""
    logout_user()
    return jsonify({'message': 'User logged out successfully'}), 200