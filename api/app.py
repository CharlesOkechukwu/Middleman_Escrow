import redis
from flask import Flask, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from datetime import timedelta
from .config import DevConfig


EXPIRY = timedelta(hours=24)
"""initialize the database"""
db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(DevConfig)
app.config['JWT_SECRET_KEY'] = 'mdmsecrete'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = EXPIRY
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'realcharlieok@gmail.com'
app.config['MAIL_PASSWORD'] = 'ifkzempywmtjokwm'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

db.init_app(app)

jwt = JWTManager(app)

"""setup redis server to store jwt_blocklist tokens"""
jwt_redis_blocklist = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

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

"""Handle login"""
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

"""handle user loader"""
@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    from .models import User
    return User.query.get(int(user_id))

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