"""dispute routes module"""
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import views
from api.auth.utils import model_to_json
from api.models import Disputes, DisputePhoto, User, DisputeComments, Staff
from api.app import db
from .utils import model_with_date_to_json


@views.route('/dispute/<dispute_id>/comment/add', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_comment(dispute_id):
    """Add comment to dispute"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"status": 'error', "message": "User not found"}), 404
    dispute = Disputes.query.get(dispute_id)
    data = request.get_json()
    comment = data.get('comment')
    if dispute.buyer_id == user_id:
        user_role = "buyer"
    elif dispute.seller_id == user_id:
        user_role = "seller"
    else:
        user_role = "staff"
    dispute_comment = DisputeComments(dispute_id=dispute_id, comment=comment, commented_by=user_id, user_role=user_role)
    try:
        db.session.add(dispute_comment)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"status": 'error', "message": "An error occurred while adding comment"}), 500
    comment = model_with_date_to_json(dispute_comment)
    comment_obj = {
        "id": comment["id"],
        "comment": comment["comment"],
        "commented_at": comment["commented_at"],
        "commented_by": user.name,
        "user_role": comment["user_role"]
    }
    return jsonify({"status": 'success', "comment": comment_obj, "message": "Comment added successfully"})

@views.route('/dispute/<dispute_id>/comments', strict_slashes=False)
@jwt_required()
def get_comments(dispute_id):
    """Get all comments for a dispute"""
    dispute = Disputes.query.get(dispute_id).order_by(DisputeComments.commented_at.desc())
    if dispute is None:
        return jsonify({"status": 'error', "message": "Dispute not found"}), 404
    comments = dispute.comments
    comments_list = []
    for comment in comments:
        comment = model_with_date_to_json(comment)
        comment_obj = {
            "id": comment["id"],
            "comment": comment["comment"],
            "commented_at": comment["commented_at"],
            "commented_by": comment["commented_by"],
            "user_role": comment["user_role"]
        }
        comments_list.append(comment_obj)
    return jsonify({"status": 'success', "comments": comments_list})

@views.route('/user/disputes', strict_slashes=False)
@jwt_required()
def get_user_disputes():
    """Get all user's disputes"""
    user_id = get_jwt_identity()
    buy_disputes = Disputes.query.filter_by(buyer_id=user_id).filter_by(status="open").all()
    sell_disputes = Disputes.query.filter_by(seller_id=user_id).filter_by(status="open").all()
    disputes = []
    for dispute in buy_disputes:
        dispute = model_to_json(dispute)
        dispute_obj = {
            "id": dispute["id"],
            "escrow_uid": dispute["escrow_uid"],
            "transaction_refernce": dispute["transaction_refernce"],
            "dispute_topic": dispute["dispute_topic"],
            "buyer_id": dispute["buyer_id"],
            "buyer_name": dispute["buyer_name"],
            "seller_id": dispute["seller_id"],
            "seller_name": dispute["seller_name"],
            "dispute_description": dispute["dispute_description"],
            "created_at": dispute["created_at"],
            "updated_at": dispute["updated_at"],
            "status": dispute["status"],
            "resolution": dispute["resolution"]
        }
        disputes.append(dispute_obj)
    for dispute in sell_disputes:
        dispute = model_to_json(dispute)
        dispute_obj = {
            "id": dispute["id"],
            "escrow_uid": dispute["escrow_uid"],
            "transaction_refernce": dispute["transaction_refernce"],
            "dispute_topic": dispute["dispute_topic"],
            "buyer_id": dispute["buyer_id"],
            "buyer_name": dispute["buyer_name"],
            "seller_id": dispute["seller_id"],
            "seller_name": dispute["seller_name"],
            "dispute_description": dispute["dispute_description"],
            "created_at": dispute["created_at"],
            "updated_at": dispute["updated_at"],
            "status": dispute["status"],
            "resolution": dispute["resolution"]
        }
        disputes.append(dispute_obj)
    return jsonify({"status": 'success', "disputes": disputes})


@views.route('/dispute/<dispute_id>', strict_slashes=False)
@jwt_required()
def get_dispute(dispute_id):
    """Get a single dispute"""
    dispute = Disputes.query.get(dispute_id)
    if dispute is None:
        return jsonify({"status": 'error', "message": "Dispute not found"}), 404
    comments = dispute.comments
    comments_list = []
    for comment in comments:
        comment = model_with_date_to_json(comment)
        comment_obj = {
            "id": comment["id"],
            "comment": comment["comment"],
            "commented_at": comment["commented_at"],
            "commented_by": comment["commented_by"],
            "user_role": comment["user_role"]
        }
        comments_list.append(comment_obj)
    dispute = model_to_json(dispute)
    dispute_obj = {
        "id": dispute["id"],
        "escrow_uid": dispute["escrow_uid"],
        "transaction_refernce": dispute["transaction_refernce"],
        "dispute_topic": dispute["dispute_topic"],
        "buyer_id": dispute["buyer_id"],
        "buyer_name": dispute["buyer_name"],
        "seller_id": dispute["seller_id"],
        "seller_name": dispute["seller_name"],
        "dispute_description": dispute["dispute_description"],
        "created_at": dispute["created_at"],
        "updated_at": dispute["updated_at"],
        "status": dispute["status"],
        "resolution": dispute["resolution"],
        "comments": comments_list
    }
    return jsonify({"status": 'success', "dispute": dispute_obj}), 200


@views.route('/dispute/<dispute_id>/assign', methods=['PUT'], strict_slashes=False)
@jwt_required()
def assign_dispute(dispute_id):
    """Assign Dispute to staff"""
    user_id = get_jwt_identity()
    staff = Staff.query.get(user_id)
    if staff is None:
        return jsonify({"status": 'error', "message": "Staff not found"}), 404
    dispute = Disputes.query.get(dispute_id)
    if dispute is None:
        return jsonify({"status": 'error', "message": "Dispute not found"}), 404
    if dispute.status == "resolved":
        return jsonify({"status": 'error', "message": "Dispute already resolved"}), 400
    data = request.get_json()
    dispute.resolved_by = user_id
    staff = model_to_json(staff)
    dispute.staff_name = staff["name"]
    dispute.status = "open"
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({"status": 'error', "message": "An error occurred while assigning dispute"}), 500
    dispute = model_with_date_to_json(dispute)
    dispute_obj = {
        "id": dispute["id"],
        "escrow_uid": dispute["escrow_uid"],
        "transaction_refernce": dispute["transaction_refernce"],
        "dispute_topic": dispute["dispute_topic"],
        "buyer_id": dispute["buyer_id"],
        "buyer_name": dispute["buyer_name"],
        "seller_id": dispute["seller_id"],
        "seller_name": dispute["seller_name"],
        "dispute_description": dispute["dispute_description"],
        "created_at": dispute["created_at"],
        "updated_at": dispute["updated_at"],
        "resolved_by": staff["id"],
        "staff_name": staff["name"],
        "status": dispute["status"],
        "resolution": dispute["resolution"]
    }
    return jsonify({"status": 'success', "dispute": dispute_obj, "message": "Dispute assigned successfully"}), 200


@views.route('/dispute/<dispute_id>/resolve', methods=['PUT'], strict_slashes=False)
@jwt_required()
def resolve_dispute(dispute_id):
    """resolve a dispute"""
    user_id = get_jwt_identity()
    staff = Staff.query.get(user_id)
    if staff is None:
        return jsonify({"status": "error", "message": "You must be a staff to resolve a dispute"})
    dispute = Disputes.query.get(dispute_id)
    if dispute is None:
        return jsonify({"status": 'error', "message": "dispute not found"}), 404
    data = request.get_json()
    resolution = data.get('resolution')
    dispute.status = "closed"
    dispute.resolution = resolution
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({'status': "error", "message": "an error occured while closing dispute"})
    return jsonify({'status': "success", "message": "Dispute was closed successfully"})
