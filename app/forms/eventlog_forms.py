from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateEventLogForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[DataRequired()])
    user_id = IntegerField('user_id')
    title = StringField('title', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])


class UpdateEventLogForm(FlaskForm):
    user_id = IntegerField('user_id')
    title = StringField('title')
    body = StringField('body')
