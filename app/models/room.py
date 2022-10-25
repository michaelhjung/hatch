from .db import db
from datetime import datetime


class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    progress_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=False)
    entered = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.String(255), default=datetime.now)
    updated_at = db.Column(db.String(255), default=datetime.now, onupdate=datetime.now)


    user = db.relationship('User', back_populates='room')
    eventlog = db.relationship('EventLog', back_populates='room')
    item = db.relationship('Item', back_populates='room')


    @property
    def entered(self):
        return self.entered

    @entered.setter
    def entered(self):
        if self.entered == False:
            self.entered == True


    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'progress_id': self.progress_id,
            'name': self.name,
            'img': self.img,
            'entered': self.entered,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
