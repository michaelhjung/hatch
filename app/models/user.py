from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=False)
    secret_code = db.Column(db.String(255), nullable=False)
    viz = db.Column(db.Integer, default=1)
    won = db.Column(db.Boolean, default=False)
    current_room = db.Column(db.Integer, default=1)
    created_at = db.Column(db.String(255), default=datetime.now)
    updated_at = db.Column(db.String(255), default=datetime.now, onupdate=datetime.now)


    note = db.relationship('Note', back_populates='user')
    item = db.relationship('Item', back_populates='user')
    eventlog = db.relationship('EventLog', back_populates='user')
    room = db.relationship('Room', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    # @property
    # def viz(self):
    #     return self.viz

    # @viz.setter
    # def viz(self):
    #     if self.viz < 3:
    #         self.viz += 1

    # @property
    # def won(self):
    #     return self.won

    # @won.setter
    # def won(self):
    #     if self.won == False:
    #         self.won == True

    # @property
    # def current_room(self):
    #     return self.current_room

    # @current_room.setter
    # def current_room(self):
    #     if self.current_room < 8:
    #         self.current_room += 1

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'viz': self.viz,
            'won': self.won,
            'current_room': self.current_room,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
