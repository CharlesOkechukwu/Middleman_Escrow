"""Transaction routes module for the API."""
import random
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import Transaction, User, EscrowPurchaseContract, Disputes, DisputePhoto
from api.app import db
from .utils import model_with_date_to_json, upload_image


@views.route('/transaction/create/<escrow_uid>', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_transaction(escrow_uid):
    """creat new transactions for escrow purchase contract."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"status": "error", "message": "User not found"}), 404
    user = model_to_json(user)
    epc = EscrowPurchaseContract.query.filter_by(escrow_uid=escrow_uid).first()
    if epc is None:
        return jsonify({"status": "error", "message": "Escrow Purchase Contract not found"}), 404
    items = epc.items
    transactions = []
    for item in items:
        reference = f"{random.randint(1000, 9999)}{random.randint(1000, 9999)}{random.randint(10, 99)}"
        transaction = Transaction(escrow_uid=escrow_uid, reference=reference, amount=item.total, product_name=item.product_name,
                                  product_id=item.id, product_quantity=item.quantity, buyer_id=epc.buyer_id, buyer_name=epc.buyer_name, seller_id=epc.seller_id,
                                  seller_name=epc.seller_name, transaction_status='pending')
        try:
            db.session.add(transaction)
            db.session.commit()
            transaction = model_with_date_to_json(transaction)
            transactions.append(transaction)
        except Exception as e:
            print(e)
            return jsonify({"status": "error", "message": "An error occurred while creating transaction"}), 500
    epc.status = "paid"
    db.session.commit()
    return jsonify({"status": "success", "message": "Transaction created successfully", "transactions": transactions}), 201


@views.route('/transactions', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_transactions():
    """Get all user's transactions."""
    user_id = get_jwt_identity()
    buy_transactions = Transaction.query.filter_by(buyer_id=user_id).all()
    sell_transactions = Transaction.query.filter_by(seller_id=user_id).all()
    buy_transactions = [model_with_date_to_json(transaction) for transaction in buy_transactions]
    sell_transactions = [model_with_date_to_json(transaction) for transaction in sell_transactions]
    transactions = []
    for transaction in buy_transactions:
        transaction = {'id': transaction['id'], 'reference': transaction['reference'], 'amount': transaction['amount'],
                       'product_name': transaction['product_name'], 'product_id': transaction['product_id'],
                       'product_quantity': transaction['product_quantity'], 'buyer_id': transaction['buyer_id'],
                       'buyer_name': transaction['buyer_name'], 'seller_id': transaction['seller_id'],
                       'seller_name': transaction['seller_name'], 'transaction_status': transaction['transaction_status'],
                       'created_at': transaction['created_at']}
        transactions.append(transaction)
    for transaction in sell_transactions:
        transaction = {'id': transaction['id'], 'reference': transaction['reference'], 'amount': transaction['amount'],
                       'product_name': transaction['product_name'], 'product_id': transaction['product_id'],
                       'product_quantity': transaction['product_quantity'], 'buyer_id': transaction['buyer_id'],
                       'buyer_name': transaction['buyer_name'], 'seller_id': transaction['seller_id'],
                       'seller_name': transaction['seller_name'], 'transaction_status': transaction['transaction_status'],
                       'created_at': transaction['created_at']}
        transactions.append(transaction)
    return jsonify({'transactions': transactions}), 200


@views.route('/transaction/<reference>', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_transaction(reference):
    """Get a single transaction."""
    transaction = Transaction.query.filter_by(reference=reference).first()
    if transaction is None:
        return jsonify({'message': 'Transaction not found'}), 404
    transaction = model_with_date_to_json(transaction)
    transaction = {'id': transaction['id'], 'reference': transaction['reference'], 'amount': transaction['amount'],
                   'product_name': transaction['product_name'], 'product_id': transaction['product_id'],
                   'product_quantity': transaction['product_quantity'], 'buyer_id': transaction['buyer_id'],
                   'buyer_name': transaction['buyer_name'], 'seller_id': transaction['seller_id'],
                   'seller_name': transaction['seller_name'], 'transaction_status': transaction['transaction_status'],
                   'created_at': transaction['created_at']}
    return jsonify({"status": 'success', 'transaction': transaction}), 200


@views.route('/transaction/update/<reference>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_transaction(reference):
    """update transaction status."""
    user_id = get_jwt_identity()
    data = request.get_json()
    status = data.get('status')
    if status is None:
        return jsonify({'status': 'error', 'message': 'Missing status field'}), 400
    transaction = Transaction.query.filter_by(reference=reference).first()
    if transaction is None:
        return jsonify({"status": "error", "message": "Transaction not found"}), 404
    if status not in ['approved', 'disputed']:
        return jsonify({'status': 'error', 'message': 'Invalid status'}), 400
    if user_id != transaction.buyer_id:
        return jsonify({'status': 'error', 'message': 'You are not authorized to update this transaction'}), 403
    if transaction.transaction_status == 'approved':
        return jsonify({'status': 'error', 'message': 'You can not update an already approved transaction'}), 400
    if status == 'approved':
        transaction.transaction_status = 'approved'
        try:
            db.session.commit()
            return jsonify({'status': 'success', 'message': 'Transaction updated successfully'}), 200
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'An error occurred while updating transaction'}), 500
    if status == 'disputed':
        transaction.transaction_status = 'disputed'
        dispute_title = request.form.get('dispute_title')
        dispute_description = request.form.get('dispute_description')
        if not dispute_title or not dispute_description:
            return jsonify({'status': 'error', 'message': 'Missing dispute_title or dispute_description field'}), 400
        photos = request.files.getlist('photos')
        if photos == []:
            photos = None
        dispute_data = {
            'dispute_title': dispute_title,
            'dispute_description': dispute_description,
            'photos': photos,
            'transaction_reference': transaction.reference,
            'buyer_id': transaction.buyer_id,
            'buyer_name': transaction.buyer_name,
            'seller_id': transaction.seller_id,
            'seller_name': transaction.seller_name,
            'escrow_uid': transaction.escrow_uid
        }
        res = create_dispute(dispute_data)
        if res.status == 'success':
            return res
        return jsonify({'status': 'error', 'message': 'An error occurred while creating transaction dispute'}), 500
 
def create_dispute(dispute_data):
    """Create a dispute for a transaction."""
    dispute = Disputes(escrow_uid=dispute_data['escrow_uid'], transaction_reference=dispute_data['transaction_reference'],
                       dispute_topic=dispute_data['dispute_title'], buyer_id=dispute_data['buyer_id'], buyer_name=dispute_data['buyer_name'],
                       seller_id=dispute_data['seller_id'], seller_name=dispute_data['seller_name'], dispute_description=dispute_data['dispute_description'],
                       status='open')
    try:
        db.session.add(dispute)
        db.session.commit()
        photos = []
        if dispute_data['photos']:
            for photo in dispute_data['photos']:
                photo_path = upload_image(photo)
                photo = DisputePhoto(dispute_id=dispute.id, photo_url=photo_path, photo_description=photo.filename, uploaded_by=dispute.buyer_id)
                db.session.add(photo)
                db.session.commit()
                photo = model_with_date_to_json(photo)
                photo_obj = {'id': photo['id'], 'photo_url': photo['photo_url'], 'photo_description': photo['photo_description'],
                             'uploaded_at': photo['uploaded_at'], 'uploaded_by': photo['uploaded_by']}
                photos.append(photo_obj)
        dispute = model_with_date_to_json(dispute)
        dispute_obj = {'id': dispute['id'], 'escrow_uid': dispute['escrow_uid'], 'transaction_reference': dispute['transaction_reference'],
                       'dispute_topic': dispute['dispute_topic'], 'buyer_id': dispute['buyer_id'], 'buyer_name': dispute['buyer_name'],
                       'seller_id': dispute['seller_id'], 'seller_name': dispute['seller_name'], 'dispute_description': dispute['dispute_description'],
                       'created_at': dispute['created_at'], 'updated_at': dispute['updated_at'], 'status': dispute['status'],
                       'resolution': dispute['resolution'], 'photos': photos}
        return jsonify({'status': 'success', 'message': 'Dispute created successfully', 'dispute': dispute_obj}), 201
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'An error occurred while creating dispute'}), 500