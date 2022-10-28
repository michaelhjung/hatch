import './Items.css'
import { useDispatch } from 'react-redux'
import * as itemActions from '../../store/items';

export default function DeleteItemButton({ item, trash }) {
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await dispatch(itemActions.deleteItem(item.id));
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
