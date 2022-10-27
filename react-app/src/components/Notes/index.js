import './Notes.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from '../../store/notes';
import CreateNoteForm from './CreateNoteForm';
import ReadNote from './ReadNote';
import UpdateNoteForm from './UpdateNoteForm';
import DeleteNoteButton from './DeleteNoteButton';
import add from '../../assets/icons/add-item.svg';
import pencil from '../../assets/icons/pencil.svg';
import trash from '../../assets/icons/trash.svg';
import x from '../../assets/icons/x.svg';

export default function Notes({ user }) {
    const dispatch = useDispatch();
    const userNotes = useSelector(state => state.notes);

    useEffect(() => {
        dispatch(noteActions.readNotes());

        return () => dispatch(noteActions.clearData());
    }, [dispatch]);

    return (
        <>
            <div className='notes-heading'>
                <h2>notes 🗒️</h2>
                <CreateNoteForm add={add} />
            </div>
            <div className='all-notes-container'>
                {userNotes && (
                    Object.values(userNotes).map(note => (
                        <div className='note-container'>
                            {/* <div className='note-card'>
                                <span className='note-title'>{note.title}</span>
                            </div> */}
                            <ReadNote note={note} />
                            <div className='note-icons-container'>
                                {/* <img className='update-icon' src={pencil} alt="update" /> */}
                                <UpdateNoteForm pencil={pencil} note={note} />
                                <DeleteNoteButton trash={trash} note={note} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
