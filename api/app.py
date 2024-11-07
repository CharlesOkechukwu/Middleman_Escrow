from flask import Flask, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import DevConfig


"""initialize the database"""
db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

"""register auth and views blueprints"""
from .auth import auth
from .views import views

app.register_blueprint(auth)
app.register_blueprint(views)

"""enable CORS"""
app.secret_key = "middleman"
cors = CORS(app, resources={r"/*": {"origins": "*"}})

"""create all tables on startup"""
with app.app_context():
    db.create_all()

"""Handle 404 errors"""
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Page Not Found'}), 404

"""Handle 400 errors"""
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request'}), 400

"""Handle 500 errors"""
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500


if __name__ == '__main__':
    app.run(debug=True)