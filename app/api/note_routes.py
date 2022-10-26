from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Note
from app.forms.note_forms import CreateNoteForm, UpdateNoteForm

note_routes = Blueprint('notes', __name__)


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


# CREATE A NOTE
@note_routes.route("/", methods=['POST'])
@login_required
def create_note():
    """
    Creates a note owned by the user
    """
    form = CreateNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user = current_user.to_dict()


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['title']:
        login_val_error["errors"]["title"] = "Title is required"
    if not form.data['body']:
        login_val_error["errors"]["body"] = "Note body is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400

    if form.validate_on_submit():
        new_note = Note(
            user_id=curr_user['id'],
            title=form.data['title'],
            body=form.data['body']
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# READ ALL USER'S NOTES
@note_routes.route("/")
@login_required
def read_user_notes():
    """
    Gets all user's notes
    """

    curr_user = current_user.to_dict()
    notes_query = Note.query.filter(Note.user_id == curr_user['id']).all()
    notes = [note.to_dict() for note in notes_query]

    return jsonify({ "Notes": notes })


# READ A NOTE BY ID
@note_routes.route("/<int:id>")
@login_required
def read_note(id):
    """
    Gets a note by id
    """

    # curr_user = current_user.to_dict()
    note_query = Note.query.get(id)
    if not note_query:
        return jsonify({ "message": "Note couldn't be found", "status_code": 404 }), 404
    # if curr_user['id'] != note['user_id']:
    #     return jsonify({ "message": "Forbidden", "status_code": 403 }), 403
    note = note_query.to_dict()
    return note


# UPDATE A NOTE
@note_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_note(id):
    """
    Updates a user's note
    """
    form = UpdateNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    curr_user = current_user.to_dict()
    note_to_update_query = Note.query.get(id)
    if not note_to_update_query:
        return jsonify({ "message": "Note couldn't be found", "status_code": 404 }), 404
    note_to_update = note_to_update_query.to_dict()
    if curr_user['id'] != note_to_update['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['title']:
        login_val_error["errors"]["title"] = "Title is required"
    if not form.data['body']:
        login_val_error["errors"]["body"] = "Note body is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        if form.data['title']:
            note_to_update_query.title = form.data['title']
        if form.data['body']:
            note_to_update_query.body = form.data['body']

        db.session.commit()
        return note_to_update_query.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# DELETE A NOTE
@note_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Deletes a user's note
    """

    curr_user = current_user.to_dict()
    note_to_delete = Note.query.get(id)
    if not note_to_delete:
        return jsonify({ "message": "Note couldn't be found", "status_code": 404 }), 404
    if curr_user['id'] != note_to_delete.to_dict()['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    db.session.delete(note_to_delete)
    db.session.commit()
    return { "message": "Successfully deleted", "status_code": 200 }
