"""Flask application entry point"""
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from config import DevConfig
from auth import auth
from views import views


"""setup database"""
db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

"""Enable CORS"""
app.secret_key = "middleman"
cors = CORS(app, resources={r"/*": {"origins": "*"}})

"""register blueprints"""
app.register_blueprint(auth, url_prefix='/')
app.register_blueprint(views, url_prefix='/')

"""handle login"""
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

"""Handle user sessions"""
@login_manager.user_loader
def load_user(user_id):
    """load user details from the database"""
    return User.query.get(int(user_id))

"""on start create all tables"""
with app.app_context():
    db.create_all()

"""handle 404 errors"""
@app.errorhandler(404)
def not_found(error):
    """handle 404 errors"""
    return jsonify({'error': 'Not found'}), 404

"""handle flask syntax or input errors"""
@app.errorhandler(400)
def bad_request(error):
    """handle 400 errors"""
    return jsonify({'error': 'Bad request'}), 400

if __name__ == '__main__':
    app.run()