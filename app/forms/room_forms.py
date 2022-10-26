from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CreateRoomForm(FlaskForm):
    progress_id = IntegerField('progress_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])


class UpdateRoomForm(FlaskForm):
    progress_id = IntegerField('progress_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    entered = BooleanField('entered', validators=[DataRequired()])
