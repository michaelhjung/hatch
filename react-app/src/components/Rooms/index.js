import './Rooms.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as roomActions from '../../store/rooms';

export default function Rooms() {
    const url = useLocation().pathname;
    const dispatch = useDispatch();
    const userRooms = useSelector(state => state.rooms)

    useEffect(() => {
        dispatch(roomActions.readRooms());

        return () => dispatch(roomActions.clearData());
    }, [dispatch]);


    return (
        <>
            {/* {url === '/play' && (
                <img src={}
            )} */}
        </>
    )
}
