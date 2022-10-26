from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Item
from app.forms.item_forms import CreateItemForm, UpdateItemForm

item_routes = Blueprint('items', __name__)


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


# CREATE A ITEM
@item_routes.route("/", methods=['POST'])
@login_required
def create_item():
    """
    Creates an item owned by the user
    """
    form = CreateItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user = current_user.to_dict()


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['name']:
        login_val_error["errors"]["name"] = "Name of item is required"
    if not form.data['serial_id']:
        login_val_error["errors"]["serial_id"] = "Serial ID is required"
    if not form.data['img']:
        login_val_error["errors"]["img"] = "Image is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400

    if form.validate_on_submit():
        new_item = Item(
            user_id=curr_user['id'],
            name=form.data['name'],
            serial_id=form.data['serial_id'],
            img=form.data['img']
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# READ ALL USER'S ITEMS
@item_routes.route("/")
@login_required
def read_user_items():
    """
    Gets all user's items
    """

    curr_user = current_user.to_dict()
    items_query = Item.query.filter(Item.user_id == curr_user['id']).all()
    items = [item.to_dict() for item in items_query]

    return jsonify({ "Items": items })


# READ AN ITEM BY ID
@item_routes.route("/<int:id>")
@login_required
def read_item(id):
    """
    Gets a item by id
    """

    curr_user = current_user.to_dict()
    item_query = Item.query.get(id)
    if not item_query:
        return jsonify({ "message": "Item couldn't be found", "status_code": 404 }), 404
    item = item_query.to_dict()
    if curr_user['id'] != item['user_id']:
        return jsonify({ "message": "Forbidden - You do not own this item", "status_code": 403 }), 403
    return item


# UPDATE AN ITEM
@item_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_item(id):
    """
    Updates a user's item
    """
    form = UpdateItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    curr_user = current_user.to_dict()
    item_to_update_query = Item.query.get(id)
    if not item_to_update_query:
        return jsonify({ "message": "Item couldn't be found", "status_code": 404 }), 404
    item_to_update = item_to_update_query.to_dict()
    if curr_user['id'] != item_to_update['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403


    # BODY VALIDATIONS:
    login_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if not form.data['name']:
        login_val_error["errors"]["name"] = "Name of item is required"
    if not form.data['serial_id']:
        login_val_error["errors"]["serial_id"] = "Serial ID is required"
    if not form.data['img']:
        login_val_error["errors"]["img"] = "Image is required"
    if len(login_val_error["errors"]) > 0:
        return jsonify(login_val_error), 400


    if form.validate_on_submit():
        if form.data['name']:
            item_to_update_query.name = form.data['name']
        if form.data['serial_id']:
            item_to_update_query.serial_id = form.data['serial_id']
        if form.data['img']:
            item_to_update_query.img = form.data['img']

        db.session.commit()
        return item_to_update_query.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# DELETE AN ITEM
@item_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_item(id):
    """
    Deletes a user's item
    """

    curr_user = current_user.to_dict()
    item_to_delete = Item.query.get(id)
    if not item_to_delete:
        return jsonify({ "message": "Item couldn't be found", "status_code": 404 }), 404
    if curr_user['id'] != item_to_delete.to_dict()['user_id']:
        return jsonify({ "message": "Forbidden", "status_code": 403 }), 403

    db.session.delete(item_to_delete)
    db.session.commit()
    return { "message": "Successfully deleted", "status_code": 200 }
