import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const READ_ITEMS = '/items/READ_ITEMS';
const CREATE_ITEM = '/items/CREATE_ITEM';
const UPDATE_ITEM = '/items/UPDATE_ITEM';
const DELETE_ITEM = '/items/DELETE_ITEM';
const CLEAR_DATA = '/items/CLEAR_DATA';


/* --------------------------------- READ: --------------------------------- */
const _readItems = (items) => ({
    type: READ_ITEMS,
    payload: items
});

export const readItems = () => async dispatch => {
    const response = await fetch(`/api/items/`);

    if (response.ok) {
        const userItems = await response.json();
        // console.log("USER ITEMS DATA AFTER FETCH:", userItems);
        dispatch(_readItems(userItems));
        return userItems;
    }
}


/* -------------------------------- CREATE: -------------------------------- */
const _createItem = (itemData) => ({
    type: CREATE_ITEM,
    payload: itemData
});

export const createItem = (itemData) => async dispatch => {
    const response = await fetch(`/api/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });

    if (response.ok) {
        const newItem = await response.json();
        // console.log("NEW ITEM DATA AFTER FETCH:", newItem);
        dispatch(_createItem(newItem));
        return newItem;
    }
}


/* -------------------------------- UPDATE: -------------------------------- */
const _updateItem = (itemData) => ({
    type: UPDATE_ITEM,
    payload: itemData
});

export const updateItem = (itemId, itemData) => async dispatch => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });

    if (response.ok) {
        const updatedItem = await response.json();
        // console.log("UPDATED ITEM DATA AFTER FETCH:", updatedItem);
        dispatch(_updateItem(updatedItem));
        return updatedItem;
    }
    console.log(response);
}


/* -------------------------------- DELETE: -------------------------------- */
const _deleteItem = (itemId) => ({
    type: DELETE_ITEM,
    payload: itemId
});

export const deleteItem = (itemId) => async dispatch => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("DELETE SUCCESS MSG AFTER FETCH:", successMessage);
        dispatch(_deleteItem(itemId));
        return successMessage;
    }
}


/* ------------------------------ CLEAR DATA: ------------------------------ */
export const clearData = () => ({
    type: CLEAR_DATA
});


/* ---------------------------- ITEMS REDUCER: ---------------------------- */
const initialState = {};

const itemsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_ITEMS:
            newState = { ...state };
            const userItems = {};
            action.payload.Items.forEach(item => userItems[item.id] = item);
            newState = userItems;
            // console.log("NEWSTATE AFTER READ_ITEMS ACTION:", newState);
            return newState;
        case CREATE_ITEM:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER CREATE_ITEM ACTION:", newState);
            return newState;
        case UPDATE_ITEM:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER UPDATE_ITEM ACTION:", newState);
            return newState;
        case DELETE_ITEM:
            newState = { ...state };
            delete newState[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER DELETE_ITEM ACTION:", newState);
            return newState;
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

export default itemsReducer;
