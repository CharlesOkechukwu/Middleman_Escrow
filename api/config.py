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

class TestConfig:
    """SQLite test database config"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}_test.db'.format(DB_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = False