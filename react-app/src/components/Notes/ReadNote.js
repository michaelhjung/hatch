import './Notes.css';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';

export default function ReadNote({ note }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='note-card' onClick={() => setShowModal(true)}>
                <span className='note-title'>{note.title}</span>
            </div>
            {showModal && (
                <Modal
                    className='read-note-modal'
                    onClose={() => setShowModal(false)}
                >
                    <div className='note-details-container'>
                        <div className='note-details-title'>
                            {note.title}
                        </div>
                        <div className='note-details-body'>
                            {note.body}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
