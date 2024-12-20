import random
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import Product, User, UserDetails, EscrowPurchaseOrder, EscrowOrderItem
from api.app import db
from .utils import create_product_code


@views.route('/add_product', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_product():
    """Add a new product."""
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    details = data.get('details')

    user_id = get_jwt_identity()
    user_obj = User.query.get(user_id)
    if user_obj is None:
        return jsonify({'message': 'User not found'}), 404
    user = model_to_json(user_obj)
    code = create_product_code(name, user['id'])
    product = Product(code=code, name=name, price=price, details=details, user_id=user['id'])
    try:
        db.session.add(product)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"status": "error", 'message': 'An error occurred while adding product'}), 500
    product = model_to_json(product)
    product_data = {'id': product['id'], 'code': product['code'], 'name': product['name'],
                    'price': product['price'], 'details': product['details'], 'owner': product['user_id']}
    return jsonify({'product': product_data, 'message': 'Product added successfully'}), 201


@views.route('/products', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_products():
    """Retrieve all user's products."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    product_data = [model_to_json(product) for product in user.products]
    products = []
    for product in product_data:
        product = {'id': product['id'], 'code': product['code'], 'name': product['name'],
                        'price': product['price'], 'details': product['details'], 'owner': product['user_id']}
        products.append(product)
    return jsonify({'products': products}), 200


@views.route('/user/details', methods=['POST', 'GET'], strict_slashes=False)
@jwt_required()
def add_user_details():
    """Add user business details."""
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.get_json()
        business_name = data.get('business_name')
        bank_name = data.get('bank_name')
        bank_account_number = data.get('bank_account_number')
        bank_account_name = data.get('bank_account_name')
        user_details = UserDetails(user_id=user_id, business_name=business_name, bank_name=bank_name,
                                  bank_account_number=bank_account_number, bank_account_name=bank_account_name)
        try:
            db.session.add(user_details)
            db.session.commit()
            return jsonify({'message': 'User details added successfully'}), 201
        except Exception as e:
            print(e)
            return jsonify({"status": "error", 'message': 'An error occurred while adding user details'}), 500
    user_details = UserDetails.query.filter_by(user_id=user_id).all()
    if user_details == []:
        return jsonify({'message': 'No user details found'}), 404
    user_details = [model_to_json(details) for details in user_details]
    details = []
    for detail in user_details:
        detail = {'business_name': detail['business_name'], 'bank_name': detail['bank_name'],
                  'bank_account_number': detail['bank_account_number'], 'bank_account_name': detail['bank_account_name']}
        details.append(detail)
    return jsonify({'details': details}), 200
