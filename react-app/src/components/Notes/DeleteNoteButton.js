import './Notes.css'
import { useDispatch } from 'react-redux'
import * as noteActions from '../../store/notes';

export default function DeleteNoteButton({ note, trash }) {
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("DELETE NOTE BUTTON WORKING!");
        try {
            const deleteNoteMsg = await dispatch(noteActions.deleteNote(note.id));
        }

        catch (res) {
            // setValidationErrors(Object.values(data));
            console.log("ANY ERRORS?", res);
            console.log("ANY ERRORS? .JSON()", res.json());
        }
    }

    return (
        <img className='delete-icon' src={trash} alt="delete" onClick={submitHandler} />
    )
}
