import './Rooms.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as roomActions from '../../store/rooms';

export default function Rooms({ user }) {
    const url = useLocation().pathname;
    const dispatch = useDispatch();
    const userRooms = useSelector(state => state.rooms)

    useEffect(() => {
        dispatch(roomActions.readRooms());

        return () => dispatch(roomActions.clearData());
    }, [dispatch]);

    if (!userRooms) return null;

    return (
        <>
            {url === '/play' && userRooms['1'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/sewer' && userRooms['2'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/AKDzZV7xMuQ' && userRooms['3'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/nwgjJHTaYys' && userRooms['4'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/cSI7QDhHLW8' && userRooms['5'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/3RA7Y6eJ2bE' && userRooms['6'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/jhNmKd74tEA' && userRooms['7'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/gUpht2fDiqo' && userRooms['8'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
        </>
    )
}
