import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../../context/Modal';
import '../Forms.css';

export default function LoginForm () {
    const [validationErrors, setValidationErrors] = useState([]);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(credential, password));
        if (data) {
            setValidationErrors(Object.values(data));
        }
        else {
            setCredential('');
            setPassword('');
            setValidationErrors([]);
            setShowModal(false);
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <button className='login-button' onClick={() => setShowModal(true)}>
                LOG IN
            </button>
            {showModal && (
                <Modal
                    className='login-modal'
                    onClose={() => {
                            setCredential('')
                            setPassword('')
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='auth-form' onSubmit={onLogin}>
                        {validationErrors.length > 0 && (
                            <div className='error-list'>
                                {validationErrors.map((error, ind) => (
                                    <div className='error-list-item' key={ind}>{error}</div>
                                ))}
                            </div>
                        )}
                        <div className='form-field-input-container'>
                            <input
                                name='credential'
                                type='text'
                                placeholder='Email or Username'
                                value={credential}
                                onChange={e => setCredential(e.target.value)}
                                className='form-field-input first-field-input'
                            />
                            {credential.length > 0 && (
                                <small className='input-label'>email or username:</small>
                            )}
                        </div>

                        <div className='form-field-input-container'>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='form-field-input last-field-input'
                            />
                            {password.length > 0 && (
                                <small className='input-label'>password:</small>
                            )}
                        </div>
                        {(credential.length === 0 || password.length === 0) && (
                            <small className='req-text' >*All fields are required.</small>
                        )}
                        <button
                            className='submit-button'
                            type='submit'
                        >Log In</button>
                    </form>
                </Modal>
            )}
        </>
    );
};
