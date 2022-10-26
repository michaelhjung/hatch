import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from '../../context/Modal';

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
                    id='login-modal'
                    onClose={() => setShowModal(false)}
                >
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
                </Modal>
            )}
        </>
    );
};
