import './Notes.css'
import '../Forms.css';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as noteActions from '../../store/notes';
import { Howl } from 'howler';
import scribbleSfx from '../../assets/sfx/scribble.wav';

export default function CreateNoteForm({ add }) {
    const [validationErrors, setValidationErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const playSound = (src) => {
        const sound = new Howl({
            src,
            preload: true,
            volume: 0.5,
        });
        sound.play();
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newNote = await dispatch(noteActions.createNote({ title, body }));
            if (newNote) {
                playSound(scribbleSfx);
                setTitle('');
                setBody('');
                setValidationErrors([]);
                setShowModal(false)
            }
        }

        catch (res) {
            // setValidationErrors(Object.values(data));
            console.log("ANY ERRORS?", res);
        }
    }

    useEffect(() => {
        const errors = [];

        if (title.length && (title.length < 2)) errors.push("Note title must be between 2-16 characters.");
        if (title.length && !title.trim().length) errors.push("Note title cannot be pure whitespace.");
        if (body.length && (body.length < 2)) errors.push("Note body must be between 2-250 characters.");
        if (body.length && !body.trim().length) errors.push("Note body cannot be pure whitespace.");

        setValidationErrors(errors);
    }, [title, body]);


    return (
        <>
            <img className='add-icon' src={add} alt="add" width='50px' onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal
                    className='create-note-modal'
                    onClose={() => {
                            setTitle('');
                            setBody('');
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='create-note-form' onSubmit={submitHandler}>
                        <span className='create-note-title'>Make a Note</span>
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
                                name='title'
                                placeholder='note title*'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                required={true}
                                className='form-field-input first-field-input'
                            />
                            {title.length > 0 && (
                                <small className='input-label'>note title*:</small>
                            )}
                        </div>

                        <div className='form-field-input-container'>
                            <textarea
                                name='body'
                                placeholder="Type your note body here...*"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                required
                                className='form-field-input form-field-textarea last-field-input'
                            />
                            {body.length > 0 && (
                                <small className='input-label'>note body*:</small>
                            )}
                        </div>

                        {(title.length === 0 || body.length === 0) && (
                            <small className='req-text' >*All fields are required.</small>
                        )}

                        <button
                            className='submit-button'
                            type='submit'
                            disabled={validationErrors.length}
                        >Create Note</button>
                    </form>
                </Modal>
            )}
        </>
    )
}
