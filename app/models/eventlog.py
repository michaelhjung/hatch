from .db import db
from datetime import datetime


class EventLog(db.Model):
    __tablename__ = 'eventlogs'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), default=None)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now)
    updated_at = db.Column(db.String(255), default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='eventlog')
    room = db.relationship('Room', back_populates='eventlog')


    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'user_id': self.user_id,
            'title': self.title,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
