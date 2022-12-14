from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CreateRoomImageForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[DataRequired()])
    room_progress_id = IntegerField('room_progress_id')
    name = StringField('name', validators=[DataRequired()])
    img = StringField('img', validators=[DataRequired()])
    order = IntegerField('order', validators=[DataRequired()])
