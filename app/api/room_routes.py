from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Room, EventLog, Item, RoomImage
from app.forms.room_forms import CreateRoomForm, UpdateRoomForm

room_routes = Blueprint('rooms', __name__)


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


# CREATE A ROOM
@room_routes.route("/", methods=['POST'])
@login_required
def create_room():
    """
    Creates a room owned by the user
    """
    form = CreateRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user = current_user.to_dict()


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['progress_id']:
        login_val_error["errors"]["progress_id"] = "Progress ID is required"
    if not form.data['name']:
        login_val_error["errors"]["name"] = "Name of room is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400

    if form.validate_on_submit():
        new_room = Room(
            user_id=curr_user['id'],
            progress_id=form.data['progress_id'],
            name=form.data['name']
        )
        db.session.add(new_room)
        db.session.commit()
        return new_room.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# READ ALL USER'S ROOMS
@room_routes.route("/")
@login_required
def read_user_rooms():
    """
    Gets all user's rooms
    """

    curr_user = current_user.to_dict()
    rooms_query = Room.query.filter(Room.user_id == curr_user['id']).all()
    rooms = [room.to_dict() for room in rooms_query]
    for room in rooms:
        event_log_query = EventLog.query.filter(EventLog.room_id == room['id']).all()
        room['Event_Logs'] = [log.to_dict() for log in event_log_query]
        items_query = Item.query.filter(Item.room_id == room['id']).all()
        room['Items'] = [item.to_dict() for item in items_query]
        images_query = RoomImage.query.filter(RoomImage.room_id == room['id']).all()
        room['Images'] = [img.to_dict() for img in images_query]

    return jsonify({ "Rooms": rooms })


# READ AN ROOM BY ID
@room_routes.route("/<int:id>")
@login_required
def read_room(id):
    """
    Gets a room by id
    """

    curr_user = current_user.to_dict()
    room_query = Room.query.get(id)
    if not room_query:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    room = room_query.to_dict()
    if curr_user['id'] != room['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    event_log_query = EventLog.query.filter(EventLog.room_id == room['id']).all()
    room['Event_Logs'] = [log.to_dict() for log in event_log_query]
    items_query = Item.query.filter(Item.room_id == room['id']).all()
    room['Items'] = [item.to_dict() for item in items_query]

    return room


# UPDATE A ROOM
@room_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_room(id):
    """
    Updates a user's room
    """
    form = UpdateRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    curr_user = current_user.to_dict()
    room_to_update_query = Room.query.get(id)
    if not room_to_update_query:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    room_to_update = room_to_update_query.to_dict()
    if curr_user['id'] != room_to_update['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['progress_id']:
        login_val_error["errors"]["progress_id"] = "Progress ID is required"
    if not form.data['name']:
        login_val_error["errors"]["name"] = "Name of room is required"
    if not form.data['entered']:
        login_val_error["errors"]["entered"] = "Entered boolean is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        if form.data['progress_id']:
            room_to_update_query.progress_id = form.data['progress_id']
        if form.data['name']:
            room_to_update_query.name = form.data['name']
        if form.data['entered']:
            room_to_update_query.entered = form.data['entered']

        db.session.commit()
        return room_to_update_query.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE A ROOM
@room_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_room(id):
    """
    Deletes a user's room
    """

    curr_user = current_user.to_dict()
    room_to_delete = Room.query.get(id)
    if not room_to_delete:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    if curr_user['id'] != room_to_delete.to_dict()['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    db.session.delete(room_to_delete)
    db.session.commit()
    return { "message": "Successfully deleted", "status_code": 200 }


# READ ALL ROOM IMAGES BY ROOM ID
@room_routes.route("/<int:room_id>/images")
@login_required
def read_room_images(room_id):
    """
    Gets room images by id
    """

    curr_user = current_user.to_dict()
    room_query = Room.query.get(room_id)
    if not room_query:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    room = room_query.to_dict()
    if curr_user['id'] != room['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    room_images_query = RoomImage.query.filter(RoomImage.room_id == room_id).all()
    room_images = [img.to_dict() for img in room_images_query]

    return jsonify({ "Images": room_images })
