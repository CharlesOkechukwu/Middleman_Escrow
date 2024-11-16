"""user authentication routes."""
import redis
from datetime import timedelta
from flask import jsonify, request, session
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from . import auth
from .utils import get_user_by_email, model_to_json, jwt_redis_blocklist, send_email, validate_email, validate_password
from api.models import User
from api.app import db, EXPIRY


@auth.route('/register', methods=['POST'], strict_slashes=False)
def register():
    """register a new user."""
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    if not validate_email(email):
        return jsonify({'message': 'Invalid email format'}), 400
    
    if not validate_password(password):
        return jsonify({'message': 'Password must be at least 8 characters long and contain a number and special character'}), 400
    
    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400
    
    user = get_user_by_email(email)
    if user:
        return jsonify({'message': 'User already exists'}), 400
    
    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    new_user = model_to_json(new_user)
    access_token = create_access_token(identity=new_user['id'])
    user_data = {'id': new_user['id'], 'name': new_user['name'], 'email': new_user['email']}
    return jsonify({'status': "success", 'user': user_data, 'message': "User Created Successfully", 'access_token': access_token}), 201


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
        return jsonify({'message': 'Incorrect email or password!'}), 400
    
    if not user.validate_password(password):
        return jsonify({'message': 'Incorrect email or password'}), 400
    
    user = model_to_json(user)
    access_token = create_access_token(identity=user['id'])
    return jsonify({'status': 'success', 'message': 'User logged in successfully', 'access_token': access_token}), 200

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
    return jsonify({"status": "success", 'user': user_data}), 200

@auth.route('/user/update', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_user():
    """update user name."""
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'message': 'Missing name field'}), 400
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'Invalid jwt token or user does not exist'}), 400
    user.name = name
    db.session.commit()
    return jsonify({"status": "success", 'message': 'User updated successfully'}), 200



@auth.route('/logout/', methods=['POST'], strict_slashes=False)
@jwt_required()
def logout():
    """logout a user"""
    jti = get_jwt()['jti']
    jwt_redis_blocklist.set(jti, "", ex=EXPIRY)
    return jsonify({"status": "success", 'message': 'User logged out successfully'}), 200

@auth.route('/forgot-password', methods=['POST'], strict_slashes=False)
def forgot_password():
    """verify and send user forgot password email."""
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"status": "error", 'message': 'Missing email field'}), 400
    user = get_user_by_email(email)
    if user is not None:
        user = model_to_json(user)
        access_token = create_access_token(identity=user['id'], expires_delta=timedelta(minutes=5))
        msg = f"Click the link below to reset your password\nhttp://localhost:5000/reset-password?token={access_token}"
        send_email('Password Reset', 'realcharlieok@gmail.com', user['email'], msg )
    return jsonify({"status": "success", 'message': 'Password reset link sent to email'}), 200


@auth.route('/reset-password', methods=['POST'], strict_slashes=False)
@jwt_required()
def password_reset():
    """reset user password."""
    data = request.get_json()
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    if not password:
        return jsonify({'message': 'Missing password field'}), 400
    if not validate_password(password):
        return jsonify({'message': 'Password must be at least 8 characters long and contain a number and special character'}), 400
    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'Invalid jwt token or user does not exist'}), 400
    user.set_password(password)
    db.session.commit()
    return jsonify({"status": "success", 'message': 'Password reset successfully'}), 200
    