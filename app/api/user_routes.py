from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User
from app.forms.update_user_form import UpdateUserForm

user_routes = Blueprint('users', __name__)


# FOR VALIDATION ERRORS:
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_user(id):
    """
    Updates a user's attributes
    """
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user_query = User.query.get(id)
    curr_user = current_user.to_dict()
    if not user_query:
        return jsonify({ "message": "User couldn't be found", "status_code": 404 }), 404
    user = user_query.to_dict()
    if curr_user['id'] != user['id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if form.data['viz'] and (form.data['viz'] < 1 or form.data['viz'] > 3):
        login_val_error["errors"]["viz"] = "Viz must be an integer between 1-3"
    if form.data['won'] and type(form.data['won']) != bool:
        login_val_error["errors"]["won"] = "Won must be a boolean"
    if form.data['current_room'] and (form.data['current_room'] < 1 or form.data['current_room'] > 9):
        login_val_error["errors"]["current_room"] = "Current room must be an integer between 1-9"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        if form.data['viz']:
            user_query.viz = form.data['viz']
        if form.data['won']:
            user_query.won = form.data['won']
        if form.data['current_room']:
            user_query.current_room = form.data['current_room']

        db.session.commit()
        return user_query.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
