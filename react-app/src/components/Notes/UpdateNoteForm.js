import './Notes.css'
import '../Forms.css';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as noteActions from '../../store/notes';

export default function UpdateNoteForm({ user, note, pencil }) {
    const [validationErrors, setValidationErrors] = useState([]);
    const [title, setTitle] = useState(note.title || '');
    const [body, setBody] = useState(note.body || '');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    // if (!user) {
    //     return <Redirect to='/' />;
    // }

    useEffect(() => {
        setTitle(note.title);
        setBody(note.body);
    }, [showModal]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedNote = await dispatch(noteActions.updateNote(note.id, { title, body }));
            if (updatedNote) {
                setTitle('');
                setBody('');
                setValidationErrors([]);
                setShowModal(false)
            }
        }

        catch (res) {
            // setValidationErrors(Object.values(data));
            console.log("ANY ERRORS?", res);
            console.log("ANY ERRORS? .JSON()", res.json());
        }
    }

    useEffect(() => {
        const errors = [];

        if (title.length && (title.length < 2 || title.length > 12)) errors.push("Note title must be between 2-12 characters.");
        if (body.length && (body.length < 2 || body.length > 250)) errors.push("Note body must be between 2-250 characters.");

        setValidationErrors(errors);
    }, [title, body]);


    return (
        <>
            <img className='update-icon' src={pencil} alt="update" onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal
                    className='update-note-modal'
                    onClose={() => {
                            setTitle('');
                            setBody('');
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='update-note-form' onSubmit={submitHandler}>
                        <span className='update-note-title'>Update Your Note</span>
                        {validationErrors.length > 0 && (
                            <div className='error-list'>
                                {validationErrors.map((error, ind) => (
                                    <div className='error-list-item' key={ind}>{error}</div>
                                ))}
                            </div>
                        )}
                            <input
                                type='text'
                                name='title'
                                placeholder='note title*'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                required={true}
                                className='form-field-input first-field-input'
                            />
                            <textarea
                                name='body'
                                placeholder="Type your note body here...*"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                required
                                className='form-field-input form-field-textarea last-field-input'
                            />
                            {(title.length === 0 || body.length === 0) && (
                                <small className='req-text' >*All fields are required.</small>
                            )}
                        <button
                            className='submit-button'
                            type='submit'
                            disabled={validationErrors.length}
                        >Update Note</button>
                    </form>
                </Modal>
            )}
        </>
    )
}
