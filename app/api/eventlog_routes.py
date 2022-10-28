from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, EventLog, Room
from app.forms.eventlog_forms import CreateEventLogForm, UpdateEventLogForm

eventlog_routes = Blueprint('logs', __name__)


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


# CREATE AN EVENT LOG
@eventlog_routes.route("/", methods=['POST'])
@login_required
def create_eventlog():
    """
    Creates an event log
    """
    form = CreateEventLogForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user = current_user.to_dict()


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['room_id']:
        login_val_error["errors"]["room_id"] = "Room ID is required"
    if not form.data['title']:
        login_val_error["errors"]["title"] = "Title is required"
    if not form.data['body']:
        login_val_error["errors"]["body"] = "Event log body is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400

    if form.validate_on_submit():
        new_log = EventLog(
            user_id=form.data['user_id'],
            room_id=form.data['room_id'],
            title=form.data['title'],
            body=form.data['body']
        )
        db.session.add(new_log)
        db.session.commit()
        return new_log.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# READ ALL USER'S EVENT LOGS
@eventlog_routes.route("/user")
@login_required
def read_user_eventlogs():
    """
    Gets all user's event logs
    """

    curr_user = current_user.to_dict()
    logs_query = EventLog.query.filter(EventLog.user_id == curr_user['id']).all()
    logs = [log.to_dict() for log in logs_query]

    return jsonify({ "Event_Logs": logs })


# READ ALL ROOM'S EVENT LOGS
@eventlog_routes.route("/room/<int:room_id>")
@login_required
def read_room_eventlogs(room_id):
    """
    Gets all user's event logs
    """

    room_query = Room.query.get(room_id)
    if not room_query:
        return jsonify({ "message": "Room couldn't be found", "status_code": 404 }), 404
    logs_query = EventLog.query.filter(EventLog.room_id == room_id).all()
    logs = [log.to_dict() for log in logs_query]

    return jsonify({ "Event_Logs": logs })


# READ AN EVENT LOG BY ID
@eventlog_routes.route("/<int:id>")
@login_required
def read_eventlog(id):
    """
    Gets an event log by id
    """

    curr_user = current_user.to_dict()
    log_query = EventLog.query.get(id)
    if not log_query:
        return jsonify({ "message": "Event log couldn't be found", "status_code": 404 }), 404
    log = log_query.to_dict()
    if curr_user['id'] != log['user_id']:
        return jsonify({ "message": "Forbidden - You do not own this event log", "status_code": 403 }), 403
    return log


# UPDATE AN EVENT LOG
@eventlog_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_eventlog(id):
    """
    Updates an event log
    """
    form = UpdateEventLogForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    curr_user = current_user.to_dict()
    log_to_update_query = EventLog.query.get(id)
    if not log_to_update_query:
        return jsonify({ "message": "Event log couldn't be found", "status_code": 404 }), 404
    log_to_update = log_to_update_query.to_dict()
    # if curr_user['id'] != log_to_update['user_id']:
    #     return jsonify({ "message": "Forbidden - You do not own this event log", "status_code": 403 }), 403


    # # BODY VALIDATIONS:
    # login_val_error = {
    #     "message": "Validation error",
    #     "status_code": 400,
    #     "errors": {}
    # }

    # if not form.data['title']:
    #     login_val_error["errors"]["title"] = "Title is required"
    # if not form.data['body']:
    #     login_val_error["errors"]["body"] = "Note body is required"
    # if len(login_val_error["errors"]) > 0:
    #     return jsonify(login_val_error), 400


    if form.validate_on_submit():
        if form.data['user_id']:
            log_to_update_query.user_id = form.data['user_id']
        if form.data['title']:
            log_to_update_query.title = form.data['title']
        if form.data['body']:
            log_to_update_query.body = form.data['body']

        db.session.commit()
        return log_to_update_query.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# DELETE AN EVENT LOG
@eventlog_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_eventlog(id):
    """
    Deletes a user's event log
    """

    curr_user = current_user.to_dict()
    log_to_delete = EventLog.query.get(id)
    if not log_to_delete:
        return jsonify({ "message": "Event log couldn't be found", "status_code": 404 }), 404
    if curr_user['id'] != log_to_delete.to_dict()['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    db.session.delete(log_to_delete)
    db.session.commit()
    return { "message": "Successfully deleted", "status_code": 200 }
