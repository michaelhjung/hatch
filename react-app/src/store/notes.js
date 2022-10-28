// import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const READ_NOTES = '/notes/READ_NOTES';
const CREATE_NOTE = '/notes/CREATE_NOTE';
const UPDATE_NOTE = '/notes/UPDATE_NOTE';
const DELETE_NOTE = '/notes/DELETE_NOTE';
const CLEAR_DATA = '/notes/CLEAR_DATA';


/* --------------------------------- READ: --------------------------------- */
const _readNotes = (reviews) => ({
    type: READ_NOTES,
    payload: reviews
});

export const readNotes = () => async dispatch => {
    const response = await fetch(`/api/notes/`);

    if (response.ok) {
        const userNotes = await response.json();
        // console.log("USER NOTES DATA AFTER FETCH:", userNotes);
        dispatch(_readNotes(userNotes));
        return userNotes;
    }
}


/* -------------------------------- CREATE: -------------------------------- */
const _createNote = (noteData) => ({
    type: CREATE_NOTE,
    payload: noteData
});

export const createNote = (noteData) => async dispatch => {
    const response = await fetch(`/api/notes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    });

    if (response.ok) {
        const newNote = await response.json();
        // console.log("NEW NOTE DATA AFTER FETCH:", newNote);
        dispatch(_createNote(newNote));
        return newNote;
    }
}


/* -------------------------------- UPDATE: -------------------------------- */
const _updateNote = (noteData) => ({
    type: UPDATE_NOTE,
    payload: noteData
});

export const updateNote = (noteId, noteData) => async dispatch => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    });

    if (response.ok) {
        const updatedNote = await response.json();
        // console.log("UPDATED NOTE DATA AFTER FETCH:", updatedNote);
        dispatch(_updateNote(updatedNote));
        return updatedNote;
    }
}


/* -------------------------------- DELETE: -------------------------------- */
const _deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId
});

export const deleteNote = (noteId) => async dispatch => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("DELETE SUCCESS MSG AFTER FETCH:", successMessage);
        dispatch(_deleteNote(noteId));
        return successMessage;
    }
}


/* ------------------------------ CLEAR DATA: ------------------------------ */
export const clearData = () => ({
    type: CLEAR_DATA
});


/* ---------------------------- NOTES REDUCER: ---------------------------- */
const initialState = {};

const notesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_NOTES:
            newState = { ...state };
            const userNotes = {};
            action.payload.Notes.forEach(note => userNotes[note.id] = note);
            newState = userNotes;
            // console.log("NEWSTATE AFTER READ_NOTES ACTION:", newState);
            return newState;
        case CREATE_NOTE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER CREATE_NOTE ACTION:", newState);
            return newState;
        case UPDATE_NOTE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER UPDATE_NOTE ACTION:", newState);
            return newState;
        case DELETE_NOTE:
            newState = { ...state };
            delete newState[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER DELETE_NOTE ACTION:", newState);
            return newState;
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

export default notesReducer;
