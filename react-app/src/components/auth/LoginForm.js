import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

export default function LoginForm () {
    const [errors, setErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (data) {
            setErrors(data);
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onLogin}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor='credential'>Email or Username</label>
                <input
                    name='credential'
                    type='text'
                    placeholder='Email or Username'
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </div>
        </form>
    );
};
