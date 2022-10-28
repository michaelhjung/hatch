import './Rooms.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as roomActions from '../../store/rooms';
import * as logActions from '../../store/logs';
import wrongRoom from '../../assets/imgs/wrong-room.png';

export default function Rooms({ user, url, userRooms }) {
    const dispatch = useDispatch();
    let userLogs = user.Event_Logs;
    // console.log("USER LOGS:", userLogs);

    if (Object.values(userRooms)) {
        if (url === '/play' && userRooms['1']) {
            const roomLogs = userRooms['1'].Event_Logs;
            console.log("ROOM LOGS:", roomLogs);

        }
        if (url === '/play/sewer' && userRooms['2']) {
            const roomLogs = userRooms['2'].Event_Logs;

        }
        if (url === '/play/AKDzZV7xMuQ' && userRooms['3']) {
            const roomLogs = userRooms['3'].Event_Logs;

        }
        if (url === '/play/nwgjJHTaYys' && userRooms['4']) {
            const roomLogs = userRooms['4'].Event_Logs;

        }
        if (url === '/play/cSI7QDhHLW8' && userRooms['5']) {
            const roomLogs = userRooms['5'].Event_Logs;

        }
        if (url === '/play/3RA7Y6eJ2bE' && userRooms['6']) {
            const roomLogs = userRooms['6'].Event_Logs;

        }
        if (url === '/play/jhNmKd74tEA' && userRooms['7']) {
            const roomLogs = userRooms['7'].Event_Logs;

        }
        if (url === '/play/gUpht2fDiqo' && userRooms['8']) {
            const roomLogs = userRooms['8'].Event_Logs;

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
