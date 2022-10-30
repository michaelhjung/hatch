from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Room
from app.forms.room_image_forms import CreateRoomImageForm
from app.models.room_image import RoomImage

room_image_routes = Blueprint('room_images', __name__)


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


# CREATE A ROOM IMAGE
@room_image_routes.route("/", methods=['POST'])
@login_required
def create_room_img():
    """
    Creates a room image
    """
    form = CreateRoomImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user = current_user.to_dict()


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    room_query = Room.query.get(form.data['room_id'])
    print("ROOM QUERY =====>", room_query)
    if not form.data['room_id'] or not room_query:
        login_val_error["errors"]["room_id"] = "Room ID is required or Room with provided ID not found"
    if not form.data['name']:
        login_val_error["errors"]["name"] = "Name of room is required"
    if not form.data['img']:
        login_val_error["errors"]["img"] = "Room image url is required"
    if not form.data['order']:
        login_val_error["errors"]["order"] = "Order of room image is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400

    if form.validate_on_submit():
        new_room_img = RoomImage(
            room_id=form.data['room_id'],
            room_progress_id=form.data['room_progress_id'],
            name=form.data['name'],
            img=form.data['img'],
            order=form.data['order']
        )
        db.session.add(new_room_img)
        db.session.commit()
        return new_room_img.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# READ DETAILS OF A ROOM IMAGE BY ROOM IMG ID
@room_image_routes.route("/<int:room_img_id>")
@login_required
def read_room_img(room_img_id):
    """
    Gets a room image by its id
    """

    curr_user = current_user.to_dict()
    room_img_query = RoomImage.query.get(room_img_id)
    if not room_img_query:
        return jsonify({ "message": "Room Image couldn't be found", "status_code": 404 }), 404

    room_img = room_img_query.to_dict()
    room_query = Room.query.get(room_img['room_id'])
    if not room_query:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    room = room_query.to_dict()
    if curr_user['id'] != room['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    return room_img


# DELETE A ROOM IMAGE
@room_image_routes.route("/<int:room_img_id>", methods=['DELETE'])
@login_required
def delete_room_img(room_img_id):
    """
    Deletes a user's room
    """

    curr_user = current_user.to_dict()
    room_img_to_delete = RoomImage.query.get(room_img_id)
    if not room_img_to_delete:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404

    room = Room.query.get(room_img_to_delete.to_dict()['room_id'])
    if curr_user['id'] != room.to_dict()['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    db.session.delete(room_img_to_delete)
    db.session.commit()
    return { "message": "Successfully deleted", "status_code": 200 }
