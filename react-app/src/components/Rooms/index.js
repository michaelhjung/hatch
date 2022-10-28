import './Rooms.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
// import * as roomActions from '../../store/rooms';
import * as logActions from '../../store/logs';
import * as sessionActions from '../../store/session';
import * as noteActions from '../../store/notes';
import * as itemActions from '../../store/items';
import wrongRoom from '../../assets/imgs/wrong-room.png';

export default function Rooms({ user, url, userRooms }) {
    const dispatch = useDispatch();
    const [showIntro, setShowIntro] = useState(true);
    const [showBottleEvent, setShowBottleEvent] = useState(false);
    // let userLogs = user.Event_Logs;
    // console.log("USER LOGS:", userLogs);

    // // TODO: LOGIC FOR UPDATING EVENT LOGS TO ADD USER ID:
    // if (Object.values(userRooms)) {
    //     if (url === '/play' && userRooms['1']) {
    //         const roomLogs = userRooms['1'].Event_Logs;
    //         // console.log("ROOM LOGS:", roomLogs);

    //     }
    //     if (url === '/play/sewer' && userRooms['2']) {
    //         const roomLogs = userRooms['2'].Event_Logs;

    //     }
    //     if (url === '/play/AKDzZV7xMuQ' && userRooms['3']) {
    //         const roomLogs = userRooms['3'].Event_Logs;

    //     }
    //     if (url === '/play/nwgjJHTaYys' && userRooms['4']) {
    //         const roomLogs = userRooms['4'].Event_Logs;

    //     }
    //     if (url === '/play/cSI7QDhHLW8' && userRooms['5']) {
    //         const roomLogs = userRooms['5'].Event_Logs;

    //     }
    //     if (url === '/play/3RA7Y6eJ2bE' && userRooms['6']) {
    //         const roomLogs = userRooms['6'].Event_Logs;

    //     }
    //     if (url === '/play/jhNmKd74tEA' && userRooms['7']) {
    //         const roomLogs = userRooms['7'].Event_Logs;

    //     }
    //     if (url === '/play/gUpht2fDiqo' && userRooms['8']) {
    //         const roomLogs = userRooms['8'].Event_Logs;

    //     }
    // }

    // ROOM 1 GAME LOGIC:
    const vizHandler = async (e) => {
        e.preventDefault();
        const roomImg = document.querySelector('.room-img');
        const rubEyesButton = document.querySelector('.rub-eyes-button');
        if (user.viz < 3) {
            await dispatch(sessionActions.updateUser(user.id, { viz: user.viz + 1} ));
        }
        roomImg.removeAttribute('id');
        rubEyesButton.setAttribute('id', 'hidden');
    }

    const closeIntro = () => {
        // CLOSE MODAL:
        setShowIntro(false);

        // UPDATE USER LOG HISTORY:
        const room1log1id = userRooms['1'].Event_Logs[0].id;
        dispatch(logActions.updateLog(room1log1id, { user_id: user.id }));
        // dispatch(logActions.readLogs());
    }

    const bottleClick = () => setShowBottleEvent(true);
    const closeBottleEvent = async () => {
        // CLOSE MODAL:
        setShowBottleEvent(false);

        // UPDATE USER LOG HISTORY:
        const room1log2id = userRooms['1'].Event_Logs[1].id;
        dispatch(logActions.updateLog(room1log2id, { user_id: user.id }));

        // CREATE NOTE WITH ROOM 2 KEY:
        if (user.Notes) {
            const userNotes = Object.values(user.Notes);
            let hasNote = false;
            userNotes.forEach(note => {
                if (note.body === "https://escape-hatch.herokuapp.com/play/sewer") hasNote = true;
            })
            if (!hasNote) {
                await dispatch(noteActions.createNote({ title: "A Back Door", body: "https://escape-hatch.herokuapp.com/play/sewer" }));
            }
        }
    }



    if (!userRooms) return null;
    return (
        <>
            {url === '/play' && userRooms['1'] && (
                <>
                    <img className='room-img' id='blurry' src={userRooms['1'].Images[0].img} alt="room1" />
                    <button className='rub-eyes-button' onClick={vizHandler}>Rub Eyes</button>
                    {showIntro && (
                        <Modal
                            className='intro-story-modal'
                            onClose={closeIntro}
                        >
                            <div className='intro-story'>
                                You are a genius mechanical/software engineer multi-billionaire and weapons manufacturer, hired by the federal government. Unfortunately, you have been kidnapped by a terrorist group who are forcing you to create weapons of mass destruction for them. They offer you unlimited resources to be able to create these weapons. Use this to your advantage to find a way to escape! You can write, read, update, and delete notes on your left and same thing for items on the right. Good luck!
                            </div>
                        </Modal>
                    )}
                    {user.Event_Logs && user.Event_Logs.length >= 1 && (
                        <div className='bottle' onClick={bottleClick}></div>
                    )}
                    {showBottleEvent && (
                        <Modal
                            className='bottle-event-modal'
                            onClose={closeBottleEvent}
                        >
                            <div className='event-popup'>
                                You found a bottle on the ground. There's a note inside... It says "Check your pockets."
                            </div>
                        </Modal>
                    )}
                </>
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
