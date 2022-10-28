import './Rooms.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as roomActions from '../../store/rooms';
import * as logActions from '../../store/logs';
import wrongRoom from '../../assets/imgs/wrong-room.png';

export default function Rooms({ user }) {
    const url = useLocation().pathname;
    const dispatch = useDispatch();
    const userRooms = useSelector(state => state.rooms);
    let userLogs = user.Event_Logs;
    console.log("USER LOGS:", userLogs);

    useEffect(() => {
        dispatch(roomActions.readRooms());

        return () => dispatch(roomActions.clearData());
    }, [dispatch]);


    if (Object.values(userRooms)) {
        if (url === '/play') {

        }
        if (url === '/play/sewer') {

        }
        if (url === '/play/AKDzZV7xMuQ') {

        }
        if (url === '/play/nwgjJHTaYys') {

        }
        if (url === '/play/cSI7QDhHLW8') {

        }
        if (url === '/play/3RA7Y6eJ2bE') {

        }
        if (url === '/play/jhNmKd74tEA') {

        }
        if (url === '/play/gUpht2fDiqo') {

        }
    }

    if (!userRooms) return null;

    return (
        <>
            {url === '/play' && userRooms['1'] && (
                <img className='room-img' src={userRooms['1'].Images[0].img} alt="room1" />
            )}
            {url === '/play/sewer' && userRooms['2'] && (
                <img className='room-img' src={userRooms['2'].Images[0].img} alt="room2" />
            )}
            {url === '/play/AKDzZV7xMuQ' && userRooms['3'] && (
                <img className='room-img' src={userRooms['3'].Images[0].img} alt="room3" />
            )}
            {url === '/play/nwgjJHTaYys' && userRooms['4'] && (
                <img className='room-img' src={userRooms['4'].Images[0].img} alt="room4" />
            )}
            {url === '/play/cSI7QDhHLW8' && userRooms['5'] && (
                <img className='room-img' src={userRooms['5'].Images[0].img} alt="room5" />
            )}
            {url === '/play/3RA7Y6eJ2bE' && userRooms['6'] && (
                <img className='room-img' src={userRooms['6'].Images[0].img} alt="room6" />
            )}
            {url === '/play/jhNmKd74tEA' && userRooms['7'] && (
                <img className='room-img' src={userRooms['7'].Images[0].img} alt="room7" />
            )}
            {url === '/play/gUpht2fDiqo' && userRooms['8'] && (
                <img className='room-img' src={userRooms['8'].Images[0].img} alt="room8" />
            )}
            {url !== '/play' &&
             url !== '/play/sewer' &&
             url !== '/play/AKDzZV7xMuQ' &&
             url !== '/play/nwgjJHTaYys' &&
             url !== '/play/cSI7QDhHLW8' &&
             url !== '/play/3RA7Y6eJ2bE' &&
             url !== '/play/jhNmKd74tEA' &&
             url !== '/play/gUpht2fDiqo' && (
                <img className='room-img' src={wrongRoom} alt="wrong room" />
             )}
        </>
    )
}
