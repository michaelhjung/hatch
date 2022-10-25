from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
# from wtforms.validators import DataRequired


class UpdateUserForm(FlaskForm):
    viz = IntegerField('viz')
    won = BooleanField('won')
    current_room = IntegerField('current_room')
