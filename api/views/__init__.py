"""Register the views blueprint."""
from flask import Blueprint


views = Blueprint('views', __name__, url_prefix='/')

from .routes import *
from .escrow_purchase_contract import *
from .escrow_purchase_order import *