from .db import db
from datetime import datetime


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(255), nullable=False)
    serial_id = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now)
    updated_at = db.Column(db.String(255), default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='item')
    room = db.relationship('Room', back_populates='item')


    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'user_id': self.user_id,
            'name': self.name,
            'serial_id': self.serial_id,
            'img': self.img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
