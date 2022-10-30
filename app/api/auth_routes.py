from flask import Blueprint, jsonify, session, request
from app.models import db, User, EventLog, Item, Note, Room
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_

auth_routes = Blueprint('auth', __name__)


# FOR VALIDATION ERRORS:
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            if field == "email" or field == "password":
                field = "message"
            errorMessages[field] = error
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user = current_user.to_dict()

        event_log_query = EventLog.query.filter(EventLog.user_id == user['id']).all()
        user['Event_Logs'] = [log.to_dict() for log in event_log_query]
        items_query = Item.query.filter(Item.user_id == user['id']).all()
        user['Items'] = [item.to_dict() for item in items_query]
        notes_query = Note.query.filter(Note.user_id == user['id']).all()
        user['Notes'] = [note.to_dict() for note in notes_query]
        rooms_query = Room.query.filter(Room.user_id == user['id']).all()
        user['Rooms'] = [room.to_dict() for room in rooms_query]

        return user
    return jsonify({ "message": "Forbidden - please log in", "status_code": 403 }), 403


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }
    if not form.data['credential']:
        login_val_error["errors"]["credential"] = "Email or username is required"
    if not form.data['password']:
        login_val_error["errors"]["password"] = "Password is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user_query = User.query.filter(or_(User.email == form.data['credential'], User.username == form.data['credential'])).first()
        login_user(user_query)

        user = user_query.to_dict()

        event_log_query = EventLog.query.filter(EventLog.user_id == user['id']).all()
        user['Event_Logs'] = [log.to_dict() for log in event_log_query]
        items_query = Item.query.filter(Item.user_id == user['id']).all()
        user['Items'] = [item.to_dict() for item in items_query]
        notes_query = Note.query.filter(Note.user_id == user['id']).all()
        user['Notes'] = [note.to_dict() for note in notes_query]
        rooms_query = Room.query.filter(Room.user_id == user['id']).all()
        user['Rooms'] = [room.to_dict() for room in rooms_query]

        return user
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }
    if "@" not in form.data['email'] or "." not in form.data['email']:
        login_val_error["errors"]["email"] = "Invalid email"

    if not form.data['first_name']:
        login_val_error["errors"]["first_name"] = "First name is required"
    if not form.data['last_name']:
        login_val_error["errors"]["last_name"] = "Last name is required"
    if not form.data['username']:
        login_val_error["errors"]["username"] = "Username is required"
    if not form.data['email']:
        login_val_error["errors"]["email"] = "Email is required"
    if not form.data['password']:
        login_val_error["errors"]["password"] = "Password is required"
    if not form.data['profile_pic']:
        login_val_error["errors"]["profile_pic"] = "Profile picture is required"
    if not form.data['secret_code']:
        login_val_error["errors"]["secret_code"] = "Secret code is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'].title(),
            last_name=form.data['last_name'].title(),
            username=form.data['username'].lower(),
            email=form.data['email'].lower(),
            password=form.data['password'],
            profile_pic=form.data['profile_pic'],
            secret_code=form.data['secret_code']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)

        user_query = User.query.get(user.id)

        newUser = user_query.to_dict()

        event_log_query = EventLog.query.filter(EventLog.user_id == newUser['id']).all()
        newUser['Event_Logs'] = [log.to_dict() for log in event_log_query]
        items_query = Item.query.filter(Item.user_id == newUser['id']).all()
        newUser['Items'] = [item.to_dict() for item in items_query]
        notes_query = Note.query.filter(Note.user_id == newUser['id']).all()
        newUser['Notes'] = [note.to_dict() for note in notes_query]
        rooms_query = Room.query.filter(Room.user_id == newUser['id']).all()
        newUser['Rooms'] = [room.to_dict() for room in rooms_query]

        return newUser
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
