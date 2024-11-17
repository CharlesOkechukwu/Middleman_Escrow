"""Escrow Purchase Order routes module"""
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import EscrowPurchaseOrder, EscrowOrderItem, User, UserDetails
from api.app import db


@views.route('/order/create', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_order():
    """Create Escrow Purchase Order"""
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"status": "error", "message": "User not found"}), 404
    user = model_to_json(user)
    print(user["name"])
    data = request.get_json()
    seller_name = data.get("seller_name")
    buyer_id = user_id
    buyer_name = user['name']
    delivery_fee = data.get("delivery_fee")
    total_amount = data.get("total_amount")
    status = "pending"
    items = data.get('items')
    seller_id = data.get("seller_id")
    escrow_order = EscrowPurchaseOrder(seller_name=seller_name, buyer_name=buyer_name, buyer_id=buyer_id,
                                       seller_id=seller_id, delivery_fee=delivery_fee, total_amount=total_amount, status=status)
    try:
        db.session.add(escrow_order)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "An error occurred while creating Escrow Purchase Order"}), 500
    escrow_order = model_to_json(escrow_order)
    for item in items:
        order_id = escrow_order['order_id']
        item_name = item.get("item_name")
        price = item.get("price")
        quantity = item.get("quantity")
        total = item.get("total")
        order_item = EscrowOrderItem(order_id=order_id, item_name=item_name, price=price, quantity=quantity,
                                     total=total)
        try:
            db.session.add(order_item)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({"status": "error", "message": "An error occurred while adding item to Escrow Purchase Order"}), 500
    return jsonify({"status": 'success', "order_id": escrow_order["order_id"], "message": "Escrow Purchase Order Created Successfully, click share to send link to seller"})

@views.route('/orders', strict_slashes=False)
@jwt_required()
def get_orders():
    """Get all user's escrow purchase orders."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    escrow_oders = EscrowPurchaseOrder.query.filter_by(buyer_id=user_id).all()
    orders = []
    for order in escrow_oders:
        order = model_to_json(order)
        order_items = EscrowOrderItem.query.filter_by(order_id=order['order_id']).all()
        items = []
        for item in order_items:
            item = model_to_json(item)
            item = {"item_name": item["item_name"], "price": item["price"], "quantity": item["quantity"], "total": item["total"]}
            items.append(item)
        order = {"order_id": order["order_id"], "seller_name": order["seller_name"], "buyer_name": order["buyer_name"], "buyer_id": order["buyer_id"], "seller_id": order["seller_id"],
                 "delivery_fee": order["delivery_fee"], "total_amount": order["total_amount"], "status": order["status"], "items": items}
        orders.append(order)
    return jsonify({"status": "success", "orders": orders}), 200


@views.route('/order/<int:order_id>', strict_slashes=False)
def get_order(order_id):
    """Get a single escrow purchase order."""
    order = EscrowPurchaseOrder.query.filter_by(order_id=order_id).first()
    if order is None:
        return jsonify({"status": "error", "message": "Order not found"}), 404
    if request.method == 'GET':
        order_items = order.items
        order = model_to_json(order)
        items = []
        for item in order_items:
            item = model_to_json(item)
            item = {"item_name": item["item_name"], "price": item["price"], "quantity": item["quantity"], "total": item["total"]}
            items.append(item)
        order = {"order_id": order["order_id"], "seller_name": order["seller_name"], "buyer_name": order["buyer_name"], "buyer_id": order["buyer_id"], "seller_id": order["seller_id"],
                 "delivery_fee": order["delivery_fee"], "total_amount": order["total_amount"], "status": order["status"], "items": items}
        return jsonify({"status": "success", "order": order}), 200


@views.route('/order/<int:order_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def update_order(order_id):
    """Update or delete escrow purchase order."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    order = EscrowPurchaseOrder.query.filter_by(order_id=order_id).first()
    if order is None:
        return jsonify({"status": "error", "message": "Order not found"}), 404
    
    if request.method == 'DELETE':
        if user_id != order.buyer_id:
            return jsonify({"status": "error", "message": "You are not authorized to delete this order"}), 403
        order_items = order.items
        try:
            for item in order_items:
                db.session.delete(item)
            db.session.delete(order)
            db.session.commit()
            return jsonify({"status": "success", "message": "Order deleted successfully"}), 200
        except Exception as e:
            print(e)
            return jsonify({"status": "error", "message": "An error occurred while deleting order"}), 500
    
    data = request.get_json()
    if user_id == order.buyer_id and order.status == 'pending':
        delivery_fee = data.get('delivery_fee')
        new_total_amount = (order.total_amount - order.delivery_fee) + delivery_fee
        order.delivery_fee = delivery_fee
        order.total_amount = new_total_amount
        try:
            db.session.commit()
            return jsonify({"status": "success", "message": "Order updated successfully"}), 200
        except Exception as e:
            print(e)
            return jsonify({"status": "error", "message": "An error occurred while updating order"}), 500
    status = data.get('status')
    if status == 'accepted':
        order.status = status
        user_details =  UserDetails.query.filter_by(user_id=user_id).first()
        if user_details is not None:
            user_details = model_to_json(user_details)
        user = model_to_json(user)
        order.seller_id = user_id
        order.seller_name = user['name']
        if user_details is not None and user_details['business_name'] is not None:
            order.seller_name = user_details['business_name']
        try:
            db.session.commit()
            order = model_to_json(order)
            return jsonify({"status": "success", "order_id": order['order_id'], "message": "Order accepted successfully, Please create escrow purchase contract"}), 200
        except Exception as e:
            print(e)
            return jsonify({"status": "error", "message": "An error occurred while accepting order"}), 500