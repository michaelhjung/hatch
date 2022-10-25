from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
# from wtforms.validators import DataRequired


class UpdateUserForm(FlaskForm):
    viz = IntegerField('viz')
    str = IntegerField('str')
    pickup_count = IntegerField('pickup_count')
    drop_count = IntegerField('drop_count')
    clue_count = IntegerField('clue_count')
    won = BooleanField('won')
    current_room = IntegerField('current_room')
