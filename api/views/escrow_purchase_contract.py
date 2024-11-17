"""Escrow Purchase Contract routes"""
import datetime
import uuid
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import EscrowPurchaseContract, EPCItem, User
from api.app import db
from .utils import model_with_date_to_json



@views.route('/add/epc', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_epc():
    """Create a new Escrow Purchase Contract."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    user = model_to_json(user)
    data = request.get_json()
    escrow_uid = str(uuid.uuid4())
    buyer_id = data.get('buyer_id')
    buyer_name = data.get('buyer_name')
    seller_id = user_id
    seller_name = user['name']
    created_at = datetime.datetime.now()
    delivery_fee = data.get('delivery_fee')
    delivery_date = data.get('delivery_date')
    total_amount = data.get('total_amount')
    status = 'pending'
    epc = EscrowPurchaseContract(escrow_uid=escrow_uid, buyer_id=buyer_id, buyer_name=buyer_name,
                                 seller_id=seller_id, seller_name=seller_name, delivery_fee=delivery_fee,
                                 delivery_date=delivery_date, total_amount=total_amount, status=status)
    try:
        db.session.add(epc)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'An error occurred while creating Escrow Purchase Contract'}), 500
    items = data.get('items')
    for item in items:
        escrow_uid = epc.escrow_uid
        product_name = item.get('product_name')
        product_code = item.get('product_code')
        quantity = item.get('quantity')
        price = item.get('price')
        total = item.get('total')
        description = item.get('description')
        epc_item = EPCItem(escrow_uid=escrow_uid, product_name=product_name, product_code=product_code, quantity=quantity,
                           price=price, total=total, description=description)
        try:
            db.session.add(epc_item)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({"status": "error", 'message': 'An error occurred while adding item to Escrow Purchase Contract'}), 500
    return jsonify({'message': 'Escrow Purchase Contract created successfully', 'escrow_unique_id': escrow_uid}), 201


@views.route('/epc', strict_slashes=False)
@jwt_required()
def get_epcs():
    """Get All Escrow Purchase Contracts."""
    user_id = get_jwt_identity()
    buyer_epcs = EscrowPurchaseContract.query.filter_by(buyer_id=user_id).all()
    seller_epcs = EscrowPurchaseContract.query.filter_by(seller_id=user_id).all()
    if buyer_epcs == [] and seller_epcs == []:
        return jsonify({'message': 'No Escrow Purchase Contracts found'}), 404
    buyer_epcs = [model_with_date_to_json(epc) for epc in buyer_epcs]
    seller_epcs = [model_with_date_to_json(epc) for epc in seller_epcs]
    all_epcs = []
    for epc in buyer_epcs:
        epc = {'escrow_uid': epc['escrow_uid'], 'buyer_name': epc['buyer_name'],
               'seller_name': epc['seller_name'], 'delivery_fee': epc['delivery_fee'],
               'delivery_date': epc['delivery_date'], 'total_amount': epc['total_amount'], 'status': epc['status'], "created_at": epc['created_at']}
        all_epcs.append(epc)
    for epc in seller_epcs:
        epc = {'escrow_uid': epc['escrow_uid'], 'buyer_name': epc['buyer_name'],
               'seller_name': epc['seller_name'], 'delivery_fee': epc['delivery_fee'],
               'delivery_date': epc['delivery_date'], 'total_amount': epc['total_amount'], 'status': epc['status'], "created_at": epc['created_at']}
        all_epcs.append(epc)
    return jsonify({'epcs': all_epcs}), 200


@views.route('/epc/<escrow_uid>', strict_slashes=False)
def view_epc(escrow_uid):
    """View single Escrow Purchase Contract."""
    epc = EscrowPurchaseContract.query.filter_by(escrow_uid=escrow_uid).first()
    if epc is None:
        return jsonify({'message': 'Escrow Purchase Contract not found'}), 404
    items = epc.items
    epc = model_with_date_to_json(epc)
    items = [model_to_json(item) for item in items]
    items_data = []
    for item in items:
        item = {'item_id': item['id'], 'product_name': item['product_name'], 'product_code': item['product_code'],
                'quantity': item['quantity'], 'price': item['price'], 'total': item['total'], 'description': item['description']}
        items_data.append(item)
    epc_data = {'escrow_uid': epc['escrow_uid'], 'created_at': epc['created_at'], 'buyer_name': epc['buyer_name'],
                'seller_name': epc['seller_name'], 'delivery_fee': epc['delivery_fee'],
                'delivery_date': epc['delivery_date'], 'total_amount': epc['total_amount'], 'status': epc['status'],
                'items': items_data}
    return jsonify({'epc': epc_data}), 200


@views.route('/edit/epc/<escrow_uid>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def edit_epc(escrow_uid):
    """Update or delete Escrow Purchase Contract."""
    user_id = get_jwt_identity()
    epc = EscrowPurchaseContract.query.filter_by(escrow_uid=escrow_uid).first()
    if epc is None:
        return jsonify({'message': 'Escrow Purchase Contract not found'}), 404
    epc_json = model_to_json(epc)
    if request.method == 'DELETE':
        if user_id != epc.seller_id:
            return jsonify({'message': 'You are not authorized to delete this Escrow Purchase Contract'}), 403
        if epc.status == 'paid':
            return jsonify({'message': 'Cannot delete a paid Escrow Purchase Contract'}), 400   
        try:
            db.session.delete(epc)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'An error occurred while deleting Escrow Purchase Contract'}), 500
        message = f'Escrow Purchase Contract {epc_json["escrow_uid"]} deleted successfully'
        return jsonify({'message': message}), 200
    data = request.get_json()
    if user_id == epc.seller_id and epc.status == 'pending':
        delivery_fee = data.get('delivery_fee')
        new_total_amount = (epc.total_amount - epc.delivery_fee) + delivery_fee
        epc.delivery_fee = delivery_fee
        epc.delivery_date = data.get('delivery_date')
        epc.total_amount = new_total_amount
        try:
            db.session.commit()
            return jsonify({'message': 'Escrow Purchase Contract updated successfully'}), 200
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'An error occurred while updating Escrow Purchase Contract'}), 500
    
    status = data.get('status')
    if status != 'accepted':
        return jsonify({"Message": "Status must be 'accepted' to update escrow purchase contract status"})
    user = User.query.filter_by(id=user_id).first()
    user = model_to_json(user)
    epc.status = status
    epc.buyer_id = user_id
    epc.buyer_name = user['name']
    try:
        db.session.commit()
        return jsonify({"Message": f"Escrow Contract {epc_json['escrow_uid']} accepted"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "An error occurred while updating Escrow Purchase Contract"}), 500


@views.route('/edit/item/<item_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def edit_item(item_id):
    """update or delete an item in an Escrow Purchase Contract."""
    item = EPCItem.query.filter_by(id=item_id).first()
    if item is None:
        return jsonify({'message': 'Item not found'}), 404
    epc = EscrowPurchaseContract.query.filter_by(escrow_uid=item.escrow_uid).first()
    if epc is None:
        return jsonify({'message': 'Escrow Purchase Contract not found for this item'}), 404
    item_json = model_to_json(item)
    if request.method == 'DELETE':
        if epc.status == 'paid':
            return jsonify({'message': 'Cannot delete item from a paid Escrow Purchase Contract'}), 400
        try:
            db.session.delete(item)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'An error occurred while deleting item'}), 500
        
        message = f'Item {item_json["product_name"]} deleted successfully'
        return jsonify({'message': message}), 200
    if epc.status == 'paid':
        return jsonify({'message': 'Cannot update item in a paid Escrow Purchase Contract'}), 400
    data = request.get_json()
    product_name = data.get('product_name')
    quantity = data.get('quantity')
    price = data.get('price')
    total = data.get('total')
    description = data.get('description')
    if product_name is not None:
        item.product_name = product_name
    if quantity is not None:
        item.quantity = quantity
    if price is not None:
        item.price = price
    if total is not None:
        item.total = total
    if description is not None:
        item.description = description
    try:
        db.session.commit()
        msg = f'Item {item_json["product_name"]} updated successfully'
        return jsonify({'message': msg}), 200
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'An error occurred while updating item'}), 500