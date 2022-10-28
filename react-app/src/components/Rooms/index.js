import './Rooms.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
// import * as roomActions from '../../store/rooms';
import * as logActions from '../../store/logs';
import * as sessionActions from '../../store/session';
import * as noteActions from '../../store/notes';
import * as itemActions from '../../store/items';
import wrongRoom from '../../assets/imgs/wrong-room.png';
import keySvg from '../../assets/icons/key.svg';


export default function Rooms({ user, url, userRooms }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userItems = useSelector(state => state.items);
    const [showIntro, setShowIntro] = useState(true);
    const [showBottleEvent, setShowBottleEvent] = useState(false);
    const [showRoom2Intro, setShowRoom2Intro] = useState(true);
    const [showFooterEvent, setShowFooterEvent] = useState(false);
    const [showRoom2Note, setShowRoom2Note] = useState(false);
    const [showRoom3Intro, setShowRoom3Intro] = useState(true);
    const [showRoom3Note, setShowRoom3Note] = useState(false);
    const [showRoom3CorrectKey, setShowRoom3CorrectKey] = useState(false);



    // -------------------- ROOM 1 GAME LOGIC: -------------------- //
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



    // -------------------- ROOM 2 GAME LOGIC: -------------------- //
    const closeRoom2Intro = () => {
        // CLOSE MODAL:
        setShowRoom2Intro(false);

        // UPDATE USER LOG HISTORY:
        const room2log1id = userRooms['2'].Event_Logs[0].id;
        dispatch(logActions.updateLog(room2log1id, { user_id: user.id }));
    }
    const snakeClick = () => setShowFooterEvent(true);
    const closeFooterEvent = () => {
        // CLOSE MODAL:
        setShowFooterEvent(false);

        // UPDATE USER LOG HISTORY:
        const room2log2id = userRooms['2'].Event_Logs[1].id;
        dispatch(logActions.updateLog(room2log2id, { user_id: user.id }));

        // CREATE LINK IN FOOTER:
        const footerContacts = document.querySelector('.footer-contact');
        const keyLink = document.createElement('a');
        keyLink.setAttribute('class', 'keyForRoom3 footer-links');
        keyLink.setAttribute('href', 'https://escape-hatch.herokuapp.com/play/AKDzZV7xMuQ');
        const keyImg = document.createElement('img');
        keyImg.setAttribute('class', 'footer-icons');
        keyImg.setAttribute('src', keySvg);
        keyImg.setAttribute('alt', "key");
        keyLink.appendChild(keyImg);
        footerContacts.appendChild(keyLink);
    }
    const room2NoteClick = () => setShowRoom2Note(true);
    const closeRoom2NoteEvent = () => {
        // CLOSE MODAL:
        setShowRoom2Note(false);

        // UPDATE USER LOG HISTORY:
        const room2log3id = userRooms['2'].Event_Logs[2].id;
        dispatch(logActions.updateLog(room2log3id, { user_id: user.id }));
    }



    // -------------------- ROOM 3 GAME LOGIC: -------------------- //
    const closeRoom3Intro = () => {
        // CLOSE MODAL:
        setShowRoom3Intro(false);

        // UPDATE USER LOG HISTORY:
        const room3log1id = userRooms['3'].Event_Logs[0].id;
        dispatch(logActions.updateLog(room3log1id, { user_id: user.id }));
    }
    useEffect(() => {
        // CHECK IF USER HAS CORRECT ITEM MADE:
        console.log("ITEM MADE");
            if (userItems) {
                Object.values(userItems).forEach(item => {
                    console.log("==>item:", item);
                    if (item.serial_id === "B0A9J19M" && item.img === "https://bit.ly/3fkBytZ") setShowRoom3CorrectKey(true);
                });
            }
    }, [dispatch, userItems]);
    const room3NoteClick = () => setShowRoom3Note(true);
    const closeRoom3NoteEvent = () => {
        // CLOSE MODAL:
        setShowRoom3Note(false);

        // UPDATE USER LOG HISTORY:
        const room3log2id = userRooms['2'].Event_Logs[1].id;
        dispatch(logActions.updateLog(room3log2id, { user_id: user.id }));
    }

    const closeRoom3CorrectKey = () => {
        // UPDATE USER LOG HISTORY:
        const room3log3id = userRooms['3'].Event_Logs[2].id;
        dispatch(logActions.updateLog(room3log3id, { user_id: user.id }));

        // REDIRECT USER TO NEW ROOM:
        history.push('/play/nwgjJHTaYys');
    }




    // -------------------- ROOM 4 GAME LOGIC: -------------------- //
    // -------------------- ROOM 5 GAME LOGIC: -------------------- //
    // -------------------- ROOM 6 GAME LOGIC: -------------------- //
    // -------------------- ROOM 7 GAME LOGIC: -------------------- //
    // -------------------- ROOM 8 GAME LOGIC: -------------------- //



    if (!userRooms) return null;
    return (
        <>
            {url === '/play' && userRooms['1'] && (
                <>
                    <img className='room-img' id='blurry' src={userRooms['1'].Images[0].img} alt="room1" />
                    <button className='rub-eyes-button' onClick={vizHandler}>Rub Eyes</button>
                    <div className='bottle' onClick={bottleClick}></div>
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
                <>
                    <img className='room-img' src={userRooms['2'].Images[0].img} alt="room2" />
                    <div className='room-2-note' onClick={room2NoteClick}></div>
                    <div className='snake' onClick={snakeClick}></div>
                    {showRoom2Intro && (
                        <Modal
                            className='room-2-intro-modal'
                            onClose={closeRoom2Intro}
                        >
                            <div className='event-popup'>
                                "An underground sewage system... smart. Now to keep looking around..."
                            </div>
                        </Modal>
                    )}
                    {showFooterEvent && (
                        <Modal
                            className='bottle-event-modal'
                            onClose={closeFooterEvent}
                        >
                            <div className='event-popup'>
                                "Gross, did I feel something crawling on my feet?"
                            </div>
                        </Modal>
                    )}
                    {showRoom2Note && (
                        <Modal
                            className='room-2-note-event-modal'
                            onClose={closeRoom2NoteEvent}
                        >
                            <div className='event-popup'>
                                A note... it says, "serial id: BA09JM19"
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/AKDzZV7xMuQ' && userRooms['3'] && (
                <>
                    <img className='room-img' src={userRooms['3'].Images[0].img} alt="room3" />
                    <div className='room-3-note' onClick={room3NoteClick}></div>
                    {showRoom3Intro && (
                        <Modal
                            className='room-3-intro-modal'
                            onClose={closeRoom3Intro}
                        >
                            <div className='event-popup'>
                                I found a door, but it's locked... Looks like it wants a very specific key...
                            </div>
                        </Modal>
                    )}
                    {showRoom3Note && (
                        <Modal
                            className='room-3-note-event-modal'
                            onClose={closeRoom3NoteEvent}
                        >
                            <div className='event-popup'>
                                A nother note... it says, "url: https://bit.ly/3fkBytZ"
                            </div>
                        </Modal>
                    )}
                    {showRoom3CorrectKey && (
                        <Modal
                            className='room-3-intro-modal'
                            onClose={closeRoom3CorrectKey}
                        >
                            <div className='event-popup'>
                                You made the right key! Nice...
                            </div>
                        </Modal>
                    )}
                </>
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
