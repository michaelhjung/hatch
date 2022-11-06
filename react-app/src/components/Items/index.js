import './Items.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemActions from '../../store/items';
import CreateItemForm from './CreateItemForm';
import ReadItem from './ReadItem';
import UpdateItemForm from './UpdateItemForm';
import DeleteItemButton from './DeleteItemButton';
import add from '../../assets/icons/add-item.svg';
import pencil from '../../assets/icons/pencil.svg';
import trash from '../../assets/icons/trash.svg';

export default function Items({ userItems }) {
    // const dispatch = useDispatch();
    // const userItems = useSelector(state => state.items);

    // useEffect(() => {
    //     dispatch(itemActions.readItems());

    //     return () => dispatch(itemActions.clearData());
    // }, [dispatch]);

    if (!userItems) return null;

    return (
        <>
            <div className='items-heading'>
                <h2>🔧 items</h2>
                <CreateItemForm add={add} />
            </div>
            <div className='all-items-container'>
                {userItems && (
                    Object.values(userItems).map(item => (
                        <div className='item-container' key={item.id}>
                            <ReadItem item={item} />
                            <div className='item-icons-container'>
                                <UpdateItemForm pencil={pencil} item={item} />
                                <DeleteItemButton trash={trash} item={item} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
