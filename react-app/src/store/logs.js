import { csrfFetch } from './csrf';

/* ----------------------------- ACTION TYPES: ----------------------------- */
const READ_LOGS = '/logs/READ_LOGS';
const CREATE_LOG = '/logs/CREATE_LOG';
const UPDATE_LOG = '/logs/UPDATE_LOG';
const DELETE_LOG = '/logs/DELETE_LOG';
const CLEAR_DATA = '/logs/CLEAR_DATA';


/* --------------------------------- READ: --------------------------------- */
const _readLogs = (logs) => ({
    type: READ_LOGS,
    payload: logs
});

export const readLogs = () => async dispatch => {
    const response = await fetch(`/api/logs/user`);

    if (response.ok) {
        const userLogs = await response.json();
        // console.log("USER EVENT LOGS DATA AFTER FETCH:", userLogs);
        dispatch(_readLogs(userLogs));
        return userLogs;
    }
}


/* -------------------------------- CREATE: -------------------------------- */
const _createLog = (logData) => ({
    type: CREATE_LOG,
    payload: logData
});

export const createLog = (logData) => async dispatch => {
    const response = await fetch(`/api/logs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
    });

    if (response.ok) {
        const newLog = await response.json();
        // console.log("NEW LOG DATA AFTER FETCH:", newLog);
        dispatch(_createLog(newLog));
        return newLog;
    }
}


/* -------------------------------- UPDATE: -------------------------------- */
const _updateLog = (logData) => ({
    type: UPDATE_LOG,
    payload: logData
});

export const updateLog = (logId, logData) => async dispatch => {
    const response = await fetch(`/api/logs/${logId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
    });

    if (response.ok) {
        const updatedLog = await response.json();
        // console.log("UPDATED NOTE DATA AFTER FETCH:", updatedLog);
        dispatch(_updateLog(updatedLog));
        return updatedLog;
    }
}


/* -------------------------------- DELETE: -------------------------------- */
const _deleteLog = (logId) => ({
    type: DELETE_LOG,
    payload: logId
});

export const deleteLog = (logId) => async dispatch => {
    const response = await fetch(`/api/logs/${logId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const successMessage = await response.json();
        // console.log("DELETE SUCCESS MSG AFTER FETCH:", successMessage);
        dispatch(_deleteLog(logId));
        return successMessage;
    }
}


/* ------------------------------ CLEAR DATA: ------------------------------ */
export const clearData = () => ({
    type: CLEAR_DATA
});


/* ---------------------------- NOTES REDUCER: ---------------------------- */
const initialState = {};

const logsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_LOGS:
            newState = { ...state };
            const userLogs = {};
            action.payload.Event_Logs.forEach(log => userLogs[log.id] = log);
            newState = userLogs;
            // console.log("NEWSTATE AFTER READ_LOGS ACTION:", newState);
            return newState;
        case CREATE_LOG:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER CREATE_LOG ACTION:", newState);
            return newState;
        case UPDATE_LOG:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("NEWSTATE AFTER UPDATE_LOG ACTION:", newState);
            return newState;
        case DELETE_LOG:
            newState = { ...state };
            delete newState[action.payload];
            newState = { ...newState };
            // console.log("NEWSTATE AFTER DELETE_LOG ACTION:", newState);
            return newState;
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
};

export default logsReducer;
