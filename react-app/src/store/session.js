// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
}

export const login = (credential, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            credential,
            password
        })
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};


export const signUp = (first_name, last_name, username, email, password, profile_pic, secret_code) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password,
            profile_pic,
            secret_code
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

/* -------------------------------- UPDATE: -------------------------------- */
const _updateUser = (updatedUser) => ({
    type: UPDATE_USER,
    payload: updatedUser
});

export const updateUser = (userId, userData) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        const updatedUser = await response.json();
        // console.log("UPDATED ITEM DATA AFTER FETCH:", updatedItem);
        dispatch(_updateUser(updatedUser));
        return updatedUser;
    }
    console.log(response);
}


/* ---------------------------- USERS REDUCER: ---------------------------- */

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        case UPDATE_USER:
            let newState = { ...state };
            newState.viz = action.payload.viz;
            newState.won = action.payload.won;
            newState.current_room = action.payload.current_room;
            // console.log("NEWSTATE AFTER UPDATE_USER ACTION:", newState);
            return newState;
        default:
            return state;
    }
}
