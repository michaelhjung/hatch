from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateItemForm(FlaskForm):
    name = StringField('user_id', validators=[DataRequired()])
    serial_id = StringField('user_id', validators=[DataRequired()])
    img = StringField('user_id', validators=[DataRequired()])


class UpdateItemForm(FlaskForm):
    name = StringField('user_id', validators=[DataRequired()])
    serial_id = StringField('user_id', validators=[DataRequired()])
    img = StringField('user_id', validators=[DataRequired()])
