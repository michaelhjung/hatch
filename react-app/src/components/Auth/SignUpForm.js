import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';
import '../Forms.css';

export default function SignUpForm () {
    const [validationErrors, setValidationErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();

        if (validationErrors.length > 0) return null;

        if (password === repeatPassword) {
            const data = await dispatch(signUp(firstName, lastName, username, email, password, profilePic));
            if (data) {
                setValidationErrors(Object.values(data));
            }
            else {
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');
                setProfilePic('');
                setValidationErrors([]);
                setShowModal(false);
            }
        }
    };

    useEffect(() => {
        const errors = [];

        if (firstName.length && (firstName.length < 2 || firstName.length > 12)) errors.push("First name must be between 2-12 characters.");
        if (lastName.length && (lastName.length < 2 || lastName.length > 12)) errors.push("Last name must be between 2-12 characters.");
        if (username.length && (username.length < 4 || username.length > 14)) errors.push("Username must be between 4-14 characters.");
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

            if (email.length > 100) errors.push("Maximum email character limit is 100.");
        }
        if (password.length && (password.length < 6 || password.length > 20)) errors.push("Password must be between 6-20 characters.");
        if ((password.length && repeatPassword.length) && password !== repeatPassword) errors.push("Password confirmation must match.");

        setValidationErrors(errors);
    }, [firstName, lastName, username, email, password, repeatPassword, profilePic]);

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
                    className='signup-modal'
                    onClose={() => {
                            setFirstName('');
                            setLastName('');
                            setUsername('');
                            setEmail('');
                            setPassword('');
                            setRepeatPassword('');
                            setProfilePic('');
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='auth-form' onSubmit={onSignUp}>
                        {validationErrors.length > 0 && (
                            <div className='error-list'>
                                {validationErrors.map((error, ind) => (
                                    <div className='error-list-item' key={ind}>{error}</div>
                                ))}
                            </div>
                        )}
                            <div className='form-field-input-container'>
                                <input
                                    type='text'
                                    name='firstName'
                                    placeholder='first name*'
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    required={true}
                                    className='form-field-input first-field-input'
                                />
                                {firstName.length > 0 && (
                                    <small className='input-label'>first name*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='text'
                                    name='lastName'
                                    placeholder='last name*'
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    required={true}
                                    className='form-field-input'
                                />
                                {lastName.length > 0 && (
                                    <small className='input-label'>last name*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='username*'
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    required={true}
                                    className='form-field-input'
                                />
                                {username.length > 0 && (
                                    <small className='input-label'>username*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='text'
                                    name='email'
                                    placeholder='email*'
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required={true}
                                    className='form-field-input'
                                />
                                {email.length > 0 && (
                                    <small className='input-label'>email*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='password*'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required={true}
                                    className='form-field-input'
                                />
                                {password.length > 0 && (
                                    <small className='input-label'>password*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='password'
                                    name='repeat_password'
                                    placeholder='confirm password*'
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    value={repeatPassword}
                                    required={true}
                                    className='form-field-input'
                                />
                                {repeatPassword.length > 0 && (
                                    <small className='input-label'>confirm password*:</small>
                                )}
                            </div>

                            <div className='form-field-input-container'>
                                <input
                                    type='text'
                                    name='profilePic'
                                    placeholder='profile picture url*'
                                    onChange={e => setProfilePic(e.target.value)}
                                    value={profilePic}
                                    required={true}
                                    className='form-field-input last-field-input'
                                />
                                {profilePic.length > 0 && (
                                    <small className='input-label'>profile pic url*:</small>
                                )}
                            </div>
                            {(firstName.length === 0 || lastName.length === 0 || username.length === 0 || email.length === 0 || password.length === 0 || repeatPassword.length === 0 || profilePic.length === 0) && (
                                <small className='req-text' >*All fields are required.</small>
                            )}
                            <small className='req-text' >*A default profile picture will be provided if the link is invalid.</small>
                            {profilePic && (
                                <div className='profile-pic-prev-container'>
                                    <span>Profile Picture Preview:</span>
                                    <img className='profile-pic-preview' src={profilePic} alt="avatar" onError={e => e.target.src="https://bit.ly/3Ddiwxy"} />
                                </div>
                            )}
                        <button
                            className='submit-button'
                            type='submit'
                        >Sign Up</button>
                    </form>
                </Modal>
            )}
        </>
    );
};
