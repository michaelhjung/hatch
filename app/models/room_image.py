from .db import db
from datetime import datetime


class RoomImage(db.Model):
    __tablename__ = 'room_images'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    name = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now)
    updated_at = db.Column(db.String(255), default=datetime.now, onupdate=datetime.now)


    room = db.relationship('Room', back_populates='room_image')


    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'name': self.name,
            'img': self.img,
            'order': self.order,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
