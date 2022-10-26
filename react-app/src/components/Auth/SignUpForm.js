import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

export default function SignUpForm () {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    type='text'
                    name='firstName'
                    placeholder='first name'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='lastName'
                    placeholder='last name'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='password'
                    name='repeat_password'
                    placeholder='confirm password'
                    onChange={e => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                    required
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='secretCode'
                    placeholder='secret code (for in game)'
                    onChange={e => setSecretCode(e.target.value)}
                    value={secretCode}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type='text'
                    name='profilePic'
                    placeholder='profile picture url'
                    onChange={e => setProfilePic(e.target.value)}
                    value={profilePic}
                    required={true}
                ></input>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    );
};
