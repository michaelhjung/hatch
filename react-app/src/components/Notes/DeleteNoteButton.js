import './Notes.css'
import { useDispatch } from 'react-redux'
import * as noteActions from '../../store/notes';
import { Howl } from 'howler';
import trashSfx from '../../assets/sfx/trash.wav';

export default function DeleteNoteButton({ note, trash }) {
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
            await dispatch(noteActions.deleteNote(note.id));
            playSound(trashSfx);
        }

        catch (res) {
            // setValidationErrors(Object.values(data));
            console.log("ANY ERRORS?", res);
        }
    }

    return (
        <img className='delete-icon' src={trash} alt="delete" onClick={submitHandler} />
    )
}
