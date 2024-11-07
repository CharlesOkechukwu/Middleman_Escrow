"""Register the views blueprint."""
from flask import Blueprint


views = Blueprint('views', __name__, url_prefix='/')

from .routes import *