#!/usr/bin/python3
"""Database Configuration settings for middleman escrow"""

DB_NAME = "middleman"

class DevConfig:
    """Flask development environment config"""
    username = "admin"
    password = 'Okechukwu338'
    host = 'localhost'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "mysql+mysqldb://{}:{}@{}/{}".format(username, password, host, DB_NAME)
