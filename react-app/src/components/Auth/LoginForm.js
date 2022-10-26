import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

export default function LoginForm () {
    const [validationErrors, setValidationErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (data) {
            setValidationErrors(Object.values(data));
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onLogin}>
            <div>
                {validationErrors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    name='credential'
                    type='text'
                    placeholder='Email or Username'
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                />
            </div>
            <div>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    );
};
