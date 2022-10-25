from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    serial_id = StringField('serial_id', validators=[DataRequired()])
    img = StringField('img', validators=[DataRequired()])


class UpdateItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    serial_id = StringField('serial_id', validators=[DataRequired()])
    img = StringField('img', validators=[DataRequired()])
