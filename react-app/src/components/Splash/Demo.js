import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

export default function Demo() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demouser', 'username'));
        alert(`Welcome ${user.username}`);
    };

    // if (user) {
    //     return <Redirect to='/' />;
    // }

    return (
        <button
            className="demo-button"
            onClick={demoLogin}
        >
            DEMO
        </button>
    )
}
