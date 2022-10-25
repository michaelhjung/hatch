from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateNoteForm(FlaskForm):
    title = StringField('user_id', validators=[DataRequired()])
    body = StringField('user_id', validators=[DataRequired()])


class UpdateNoteForm(FlaskForm):
    title = StringField('user_id', validators=[DataRequired()])
    body = StringField('user_id', validators=[DataRequired()])
