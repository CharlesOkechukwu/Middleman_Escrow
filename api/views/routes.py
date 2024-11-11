import random
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import Product, User
from api.app import db


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
    user = model_to_json(user_obj)
    code = f"{name[:3]}-{user['id']}-{random.randint(100, 9999)}"
    product = Product(code=code, name=name, price=price, details=details, user_id=user['id'])
    db.session.add(product)
    db.session.commit()
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
    product_data = [model_to_json(product) for product in user.products]
    products = []
    for product in product_data:
        product = {'id': product['id'], 'code': product['code'], 'name': product['name'],
                        'price': product['price'], 'details': product['details'], 'owner': product['user_id']}
        products.append(product)
    return jsonify({'products': products}), 200
