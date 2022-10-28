// import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const READ_ROOMS = '/rooms/READ_ROOMS';
const CREATE_ROOM = '/rooms/CREATE_ROOM';
const UPDATE_ROOM = '/rooms/UPDATE_ROOM';
const DELETE_ROOM = '/rooms/DELETE_ROOM';
const CLEAR_DATA = '/rooms/CLEAR_DATA';


/* --------------------------------- READ: --------------------------------- */
const _readRooms = (rooms) => ({
    type: READ_ROOMS,
    payload: rooms
});

export const readRooms = () => async dispatch => {
    const response = await fetch(`/api/rooms/`);

    if (response.ok) {
        const userRooms = await response.json();
        // console.log("USER ROOMS DATA AFTER FETCH:", userRooms);
        dispatch(_readRooms(userRooms));
        return userRooms;
    }
}


/* -------------------------------- CREATE: -------------------------------- */
const _createRoom = (roomData) => ({
    type: CREATE_ROOM,
    payload: roomData
});

export const createRoom = (roomData) => async dispatch => {
    const response = await fetch(`/api/rooms/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
    });

    if (response.ok) {
        const newRoom = await response.json();
        // console.log("NEW ROOM DATA AFTER FETCH:", newRoom);
        dispatch(_createRoom(newRoom));
        return newRoom;
    }
}


/* -------------------------------- UPDATE: -------------------------------- */
const _updateRoom = (roomData) => ({
    type: UPDATE_ROOM,
    payload: roomData
});

export const updateRoom = (roomId, roomData) => async dispatch => {
    const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
    });

    if (response.ok) {
        const updatedRoom = await response.json();
        // console.log("UPDATED ROOM DATA AFTER FETCH:", updatedRoom);
        dispatch(_updateRoom(updatedRoom));
        return updatedRoom;
    }
}


/* -------------------------------- DELETE: -------------------------------- */
const _deleteRoom = (roomProgressId) => ({
    type: DELETE_ROOM,
    payload: roomProgressId
});

export const deleteRoom = (roomId, roomProgressId) => async dispatch => {
    const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("DELETE SUCCESS MSG AFTER FETCH:", successMessage);
        dispatch(_deleteRoom(roomProgressId));
        return successMessage;
    }
}


/* ------------------------------ CLEAR DATA: ------------------------------ */
export const clearData = () => ({
    type: CLEAR_DATA
});


/* ---------------------------- ROOMS REDUCER: ---------------------------- */
const initialState = {};

const roomsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_ROOMS:
            newState = { ...state };
            const userRooms = {};
            action.payload.Rooms.forEach(room => userRooms[room.progress_id] = room);
            newState = userRooms;
            // console.log("NEWSTATE AFTER READ_ROOMS ACTION:", newState);
            return newState;
        case CREATE_ROOM:
            newState = { ...state };
            newState[action.payload.progress_id] = action.payload;
            // console.log("NEWSTATE AFTER CREATE_ROOM ACTION:", newState);
            return newState;
        case UPDATE_ROOM:
            newState = { ...state };
            newState[action.payload.progress_id] = action.payload;
            // console.log("NEWSTATE AFTER UPDATE_ROOM ACTION:", newState);
            return newState;
        case DELETE_ROOM:
            newState = { ...state };
            delete newState[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER DELETE_ROOM ACTION:", newState);
            return newState;
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

export default roomsReducer;
