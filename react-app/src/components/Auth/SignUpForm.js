import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';

export default function SignUpForm () {
    const [validationErrors, setValidationErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(firstName, lastName, username, email, password, profilePic, secretCode));
            if (data) {
                setValidationErrors(Object.values(data));
            }
            else {
                setShowModal(false);
            }
        }
    };

    useEffect(() => {
        const errors = [];
        if (firstName.length > 12) errors.push("First name cannot exceed 12 characters.");
        if (lastName.length > 12) errors.push("Last name cannot exceed 12 characters.");
        if (username.length > 16) errors.push("Username cannot exceed 16 characters.");
        if (email.length) {
            const lastDotIndex = email.lastIndexOf('.');
            const atSymbolIndex = email.indexOf('@');
            const middleSection = email.slice(atSymbolIndex + 1, lastDotIndex)
            const SYMBOLS = ['!', '@', "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ".", ":", ";", "'", '"', "?", ",", "<", ">", "?", "/", "\\", "|", "{", "}", "[", "]", "`", "~"];
            if (!email.includes('@') ||
                !email.includes('.') ||
                email.split('@').length !== 2 ||
                email.slice(lastDotIndex).length < 3 ||
                email.slice(atSymbolIndex).length < 5) errors.push("Please provide a valid email address.");

            if (middleSection) {
                Object.values(middleSection).forEach(char => {
                    if (!errors.includes("Please provide a valid email address.") && SYMBOLS.includes(char)) errors.push("Please provide a valid email address.");
                });
            }
        }
        if ((password.length && repeatPassword.length) && password !== repeatPassword) errors.push("Password confirmation must match.");
        if (secretCode.length > 12) errors.push("Secret code cannot exceed 12 characters.");

        setValidationErrors(errors);
    }, [firstName, lastName, username, email, password, repeatPassword, profilePic, secretCode]);

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <button className='signup-button' onClick={() => setShowModal(true)}>
                SIGN UP
            </button>
            {showModal && (
                <Modal
                    id='login-modal'
                    onClose={() => setShowModal(false)}
                >
                    <form onSubmit={onSignUp}>
                        <div>
                            {validationErrors.map((error, ind) => (
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
                </Modal>
            )}
        </>
    );
};
