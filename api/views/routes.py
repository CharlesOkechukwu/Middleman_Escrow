from flask import jsonify
from . import views


@views.route('/view', strict_slashes=False)
def view():
    """Test route."""
    return jsonify({'message': 'Welcome to the views page'}), 200