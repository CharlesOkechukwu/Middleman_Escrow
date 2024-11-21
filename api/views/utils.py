"""Module for all utility function for view routes"""
import os
import json
import random
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import current_app


def allowed_file(filename):
    """check if file extension is allowed."""
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def upload_image(file):
    """upload an image file and return uploaded file path."""
    if file and allowed_file(file.filename):
        upload_path = os.path.join('static', 'img_uploads')
        current_app.config['UPLOAD_FOLDER'] = upload_path
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return file_path
    return None


def model_with_date_to_json(obj):
    """serialize SQLALchemy Object with datetime to json"""
    data = {}
    fields = [field for field in dir(obj) if not field.startswith('_') and field != 'metadate' and field != 'password']
    for field in fields:
        value = obj.__getattribute__(field)
        if isinstance(value, datetime):
            data[field] = value.strftime('%Y-%m-%d %H:%M:%S')
        else:
            try:
                json.dumps(value)
                data[field] = value
            except TypeError:
                data[field] = None
    return data


def create_product_code(product_name, user_id):
    """create product code from product name and user id."""
    product_code = f"{product_name[:3].upper()}-{user_id}-{random.randint(1000, 9999)}"
    return product_code