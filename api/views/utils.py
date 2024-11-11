"""Module for all utility function for view routes"""
import os
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

