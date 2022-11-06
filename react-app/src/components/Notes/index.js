import './Notes.css'
import CreateNoteForm from './CreateNoteForm';
import ReadNote from './ReadNote';
import UpdateNoteForm from './UpdateNoteForm';
import DeleteNoteButton from './DeleteNoteButton';
import add from '../../assets/icons/add-item.svg';
import pencil from '../../assets/icons/pencil.svg';
import trash from '../../assets/icons/trash.svg';

export default function Notes({ userNotes }) {

    if (!userNotes) return null;

    return (
        <>
            <div className='notes-heading'>
                <h2>🗒️ notes</h2>
                <CreateNoteForm add={add} />
            </div>
            <div className='all-notes-container'>
                {userNotes && (
                    Object.values(userNotes).map(note => (
                        <div className='note-container' key={note.id}>
                            <ReadNote note={note} />
                            <div className='note-icons-container'>
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
