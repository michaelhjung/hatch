import './Rooms.css';
import { useEffect, useState, useRef } from 'react';
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
import toolSvg from '../../assets/icons/tool.svg';
import morseSvg from '../../assets/icons/morse.svg';
import cookieSvg from '../../assets/icons/cookie.svg';
import add from '../../assets/icons/add-item-dark.svg';
import pencil from '../../assets/icons/pencil-dark.svg';
import trash from '../../assets/icons/trash-dark.svg';
import matrix from '../../assets/imgs/9-matrix.gif';
import { Howl } from 'howler';
import glassBottleSfx from '../../assets/sfx/glass-bottle.wav';
import doorSfx from '../../assets/sfx/door.wav';
import snakeSfx from '../../assets/sfx/snake.wav';
import paperSfx from '../../assets/sfx/paper.wav';
import nintendoSfx from '../../assets/sfx/nintendo.wav';
import rabbitSfx from '../../assets/sfx/rabbit.wav';
import batscreechSfx from '../../assets/sfx/batscreech.wav';
import morseDotSfx from '../../assets/sfx/morse-dot.wav';
import morseDashSfx from '../../assets/sfx/morse-dash.wav';
import beachSfx from '../../assets/sfx/beach.wav';
import matrixSfx from '../../assets/sfx/matrix.wav';


export default function Rooms({ user, url, userRooms, showIntro, setShowIntro }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userNotes = useSelector(state => state.notes);
    const userItems = useSelector(state => state.items);

    const [showBottleEvent, setShowBottleEvent] = useState(false);
    const [showRoom2Intro, setShowRoom2Intro] = useState(true);
    const [showFooterEvent, setShowFooterEvent] = useState(false);
    const [showRoom2Note, setShowRoom2Note] = useState(false);
    const [showRoom3Intro, setShowRoom3Intro] = useState(true);
    const [showRoom3Note, setShowRoom3Note] = useState(false);
    const [showRoom3CorrectKey, setShowRoom3CorrectKey] = useState(false);
    const [showRoom4Intro, setShowRoom4Intro] = useState(true);
    const [showRoom4ConsoleEvent, setShowRoom4ConsoleEvent] = useState(false);
    const [showRoom4RabbitEvent, setShowRoom4RabbitEvent] = useState(false);
    const [showRoom4CorrectKey, setShowRoom4CorrectKey] = useState(false);
    const [showRoom5Intro, setShowRoom5Intro] = useState(true);
    const [showRoom5BatEvent, setShowRoom5BatEvent] = useState(false);
    const [showRoom6Intro, setShowRoom6Intro] = useState(true);
    const [showRoom6CorrectKey, setShowRoom6CorrectKey] = useState(false);
    const [showRoom7Intro, setShowRoom7Intro] = useState(true);
    const [showRoom7CorrectKey, setShowRoom7CorrectKey] = useState(false);
    const [showRoom8Intro, setShowRoom8Intro] = useState(true);
    const [showRoom9Intro, setShowRoom9Intro] = useState(true);

    useEffect(() => {
        dispatch(noteActions.readNotes());
        dispatch(itemActions.readItems());

        return () => {
            dispatch(noteActions.clearData());
            dispatch(itemActions.clearData());
        }
    }, [dispatch]);

    const playSound = (src) => {
        const sound = new Howl({
            src,
            preload: true,
            volume: 0.5,
        });
        sound.play();
    }

    const playLoopSound = (src) => {
        const sound = new Howl({
            src,
            preload: true,
            volume: 0.5,
            loop: true,
        });
        sound.play();
    }

    // --------------- USER CURRENT ROOM UPDATING LOGIC: ------------- //
    useEffect(() => {
        // ROOM 1:
        if (url === '/play' && userRooms['1']) dispatch(sessionActions.updateUser(user.id, { current_room: 1 }));
        // ROOM 2:
        if (url === '/play/sewer' && userRooms['2']) dispatch(sessionActions.updateUser(user.id, { current_room: 2 }));
        // ROOM 3:
        if (url === '/play/AKDzZV7xMuQ' && userRooms['3']) dispatch(sessionActions.updateUser(user.id, { current_room: 3 }));
        // ROOM 4:
        if (url === '/play/nwgjJHTaYys' && userRooms['4']) dispatch(sessionActions.updateUser(user.id, { current_room: 4 }));
        // ROOM 5:
        if (url === '/play/cSI7QDhHLW8' && userRooms['5']) dispatch(sessionActions.updateUser(user.id, { current_room: 5 }));
        // ROOM 6:
        if (url === '/play/3RA7Y6eJ2bE' && userRooms['6']) dispatch(sessionActions.updateUser(user.id, { current_room: 6 }));
        // ROOM 7:
        if (url === '/play/jhNmKd74tEA' && userRooms['7']) dispatch(sessionActions.updateUser(user.id, { current_room: 7 }));
        // ROOM 8:
        if (url === '/play/gUpht2fDiqo' && userRooms['8']) dispatch(sessionActions.updateUser(user.id, { current_room: 8 }));
        // ROOM 9:
        if (url === '/play/OakSkzL3XaZM2VUR' && userRooms['9']) dispatch(sessionActions.updateUser(user.id, { current_room: 9 }));
    }, [url, dispatch, user.id, userRooms]);



    // -------------------- ROOM 1 GAME LOGIC: -------------------- //
    useEffect(() => {
        if (url === "/play") setShowIntro(true);
    }, [url, setShowIntro]);
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
        const room1logs = userRooms['1'].Event_Logs;
        const introLog = room1logs.find(log => log.title === "The Cave - Waking Up");
        dispatch(logActions.updateLog(introLog.id, { user_id: user.id }));
    }
    const bottleClick = () => setShowBottleEvent(true);

    const closeBottleEvent = () => {
        // CLOSE MODAL:
        setShowBottleEvent(false);

        // UPDATE USER LOG HISTORY:
        const room1logs = userRooms['1'].Event_Logs;
        const bottleLog = room1logs.find(log => log.title === "The Cave - Found Item");
        dispatch(logActions.updateLog(bottleLog.id, { user_id: user.id }));

        // CREATE NOTE WITH ROOM 2 KEY:
        (async () => {
            if (userNotes) {
                let hasNote = false;
                Object.values(userNotes).forEach(note => {
                    if (note.body === "room 2 url: https://escape-hatch.herokuapp.com/play/sewer") hasNote = true;
                })
                if (!hasNote) {
                    await dispatch(noteActions.createNote({ title: "A Back Door", body: "room 2 url: https://escape-hatch.herokuapp.com/play/sewer" }));
                    playSound(doorSfx);
                    const notesContainer = document.querySelector('.all-notes-container');
                    const lastNoteMade = notesContainer.lastElementChild;
                    const noteCardOnly = lastNoteMade.firstElementChild;
                    noteCardOnly.setAttribute('id', 'backdoor-card');
                    const updateDeleteIcons = lastNoteMade.lastElementChild;
                    lastNoteMade.removeChild(updateDeleteIcons);
                    const room1key = document.createElement('a');
                    room1key.setAttribute('href', 'https://escape-hatch.herokuapp.com/play/sewer');
                    room1key.setAttribute('id', 'backdoor');
                    room1key.appendChild(lastNoteMade);
                    notesContainer.appendChild(room1key);
                }
            }
        })();
    }



    // -------------------- ROOM 2 GAME LOGIC: -------------------- //
    let footerUpdatedSnake = useRef(false);
    const closeRoom2Intro = () => {
        // CLOSE MODAL:
        setShowRoom2Intro(false);
        footerUpdatedSnake.current = false;

        // UPDATE USER LOG HISTORY:
        const room2logs = userRooms['2'].Event_Logs;
        const room2introLog = room2logs.find(log => log.title === "The Sewer - Observing New Room");
        dispatch(logActions.updateLog(room2introLog.id, { user_id: user.id }));
    }
    const snakeClick = () => setShowFooterEvent(true);
    const closeFooterEvent = () => {
        // CLOSE MODAL:
        setShowFooterEvent(false);
        playSound(doorSfx);

        // UPDATE USER LOG HISTORY:
        const room2logs = userRooms['2'].Event_Logs;
        const room2footerLog = room2logs.find(log => log.title === "The Sewer - Creepy Thing in Water");
        dispatch(logActions.updateLog(room2footerLog.id, { user_id: user.id }));

        if (!footerUpdatedSnake.current) {
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
            footerUpdatedSnake.current = true;
        }
    }
    const room2NoteClick = () => setShowRoom2Note(true);
    const closeRoom2NoteEvent = () => {
        // CLOSE MODAL:
        setShowRoom2Note(false);

        // UPDATE USER LOG HISTORY:
        const room2logs = userRooms['2'].Event_Logs;
        const room2noteLog = room2logs.find(log => log.title === "The Sewer - Found Note");
        dispatch(logActions.updateLog(room2noteLog.id, { user_id: user.id }));
    }



    // -------------------- ROOM 3 GAME LOGIC: -------------------- //
    const closeRoom3Intro = () => {
        // CLOSE MODAL:
        setShowRoom3Intro(false);

        // UPDATE USER LOG HISTORY:
        const room3logs = userRooms['3'].Event_Logs;
        const room3introLog = room3logs.find(log => log.title === "The Locked Door - Observing New Room");
        dispatch(logActions.updateLog(room3introLog.id, { user_id: user.id }));
    }
    useEffect(() => {
        // RUN FOR ROOM 3 ONLY:
        if (url === '/play/AKDzZV7xMuQ' && userRooms['3']) {
            // RESET CORRECT KEY STATE
            setShowRoom3CorrectKey(false);

            // CHECK IF USER HAS CORRECT ITEM MADE:
            if (userItems) {
                Object.values(userItems).forEach(item => {
                    if (item.serial_id === "BA09JM19" && item.img === "https://bit.ly/3fkBytZ") setShowRoom3CorrectKey(true);
                });
            }
        }

        return () => setShowRoom3CorrectKey(false);
    }, [dispatch, userItems, url, userRooms]);
    const room3NoteClick = () => setShowRoom3Note(true);
    const closeRoom3NoteEvent = () => {
        // CLOSE MODAL:
        setShowRoom3Note(false);

        // UPDATE USER LOG HISTORY:
        const room3logs = userRooms['3'].Event_Logs;
        const room3noteLog = room3logs.find(log => log.title === "The Locked Door - Found Note");
        dispatch(logActions.updateLog(room3noteLog.id, { user_id: user.id }));
    }
    const closeRoom3CorrectKey = () => {
        // UPDATE USER LOG HISTORY:
        const room3logs = userRooms['3'].Event_Logs;
        const room3keyLog = room3logs.find(log => log.title === "The Locked Door - Key");
        dispatch(logActions.updateLog(room3keyLog.id, { user_id: user.id }));

        // REDIRECT USER TO NEW ROOM:
        history.push('/play/nwgjJHTaYys');
    }



    // -------------------- ROOM 4 GAME LOGIC: -------------------- //
    let footerUpdatedRabbit = useRef(false);
    const closeRoom4Intro = () => {
        // CLOSE MODAL:
        setShowRoom4Intro(false);
        footerUpdatedRabbit.current = false;

        // UPDATE USER LOG HISTORY:
        const room4logs = userRooms['4'].Event_Logs;
        const room4introLog = room4logs.find(log => log.title === "The Empty Room - Observing New Room");
        dispatch(logActions.updateLog(room4introLog.id, { user_id: user.id }));
    }
    useEffect(() => {
        // RUN FOR ROOM 4 ONLY:
        if (url === '/play/nwgjJHTaYys' && userRooms['4']) {
            // RESET CORRECT KEY STATE
            setShowRoom4CorrectKey(false);

            // CHECK IF USER HAS CORRECT ITEM MADE:
            if (userItems) {
                Object.values(userItems).forEach(item => {
                    if (item.name === "metal ladder" && item.serial_id === "9lcTOjGQRsI" && item.img === "https://bit.ly/3FqXWfV") setShowRoom4CorrectKey(true);
                });
            }
        }

        return () => setShowRoom4CorrectKey(false);
    }, [dispatch, userItems, url, userRooms]);
    useEffect(() => {
        // RUN FOR ROOM 4 ONLY:
        if (url === '/play/nwgjJHTaYys' && userRooms['4']) {

            // CONSOLE LOG THE HINT:
            console.log("*hint* { name: metal ladder, serial id: 9lcTOjGQRsI, url: https://bit.ly/3FqXWfV }");
        }
    }, [dispatch, userItems, url, userRooms]);
    const room4ConsoleClick = () => {
        playSound(nintendoSfx);
        setShowRoom4ConsoleEvent(true);

        // CONSOLE LOG THE HINT:
        console.log("*hint* { name: metal ladder, serial id: 9lcTOjGQRsI, url: https://bit.ly/3FqXWfV }");
    }
    const closeRoom4ConsoleEvent = () => {
        // CLOSE MODAL:
        setShowRoom4ConsoleEvent(false);

        // UPDATE USER LOG HISTORY:
        const room4logs = userRooms['4'].Event_Logs;
        const room4consoleLog = room4logs.find(log => log.title === "The Empty Room - Game Console?");
        dispatch(logActions.updateLog(room4consoleLog.id, { user_id: user.id }));
    }
    const room4RabbitClick = () => setShowRoom4RabbitEvent(true);
    const closeRoom4RabbitEvent = () => {
        // CLOSE MODAL:
        setShowRoom4RabbitEvent(false);

        // UPDATE USER LOG HISTORY:
        const room4logs = userRooms['4'].Event_Logs;
        const room4rabbitLog = room4logs.find(log => log.title === "The Empty Room - Random Rabbit");
        dispatch(logActions.updateLog(room4rabbitLog.id, { user_id: user.id }));

        if (!footerUpdatedRabbit.current) {
            // CREATE LINK IN FOOTER:
            const footerContacts = document.querySelector('.footer-contact');
            const rscLink = document.createElement('a');
            rscLink.setAttribute('class', 'keyForRoom4 footer-links');
            rscLink.setAttribute('href', 'https://developer.chrome.com/docs/devtools/open/#shortcuts');
            rscLink.setAttribute('target', '_blank');
            const rscImg = document.createElement('img');
            rscImg.setAttribute('class', 'footer-icons');
            rscImg.setAttribute('src', toolSvg);
            rscImg.setAttribute('alt', "resource");
            rscLink.appendChild(rscImg);
            footerContacts.appendChild(rscLink);
            footerUpdatedRabbit.current = true;
        }
    }
    const closeRoom4CorrectKey = () => {
        // UPDATE USER LOG HISTORY:
        const room4logs = userRooms['4'].Event_Logs;
        const room4successLog = room4logs.find(log => log.title === "The Empty Room - The Right Tool");
        dispatch(logActions.updateLog(room4successLog.id, { user_id: user.id }));

        // REDIRECT USER TO NEW ROOM:
        history.push('/play/cSI7QDhHLW8');
    }



    // -------------------- ROOM 5 GAME LOGIC: -------------------- //
    let batCount = useRef(0);
    const closeRoom5Intro = () => {

        // RESET BAT COUNT:
        batCount.current = 0;

        // CLOSE MODAL:
        setShowRoom5Intro(false);

        // UPDATE USER LOG HISTORY:
        const room5logs = userRooms['5'].Event_Logs;
        const room5introLog = room5logs.find(log => log.title === "The Bat Cave - Observing New Room");
        dispatch(logActions.updateLog(room5introLog.id, { user_id: user.id }));
    }
    const room5BatClick = () => setShowRoom5BatEvent(true);
    const closeRoom5BatEvent = () => {
        // CLOSE MODAL:
        batCount.current = batCount.current + 1;
        setShowRoom5BatEvent(false);
        const room5logs = userRooms['5'].Event_Logs;

        if (batCount.current === 1) {
            // UPDATE USER LOG HISTORY:
            const room5bat1Log = room5logs.find(log => log.title === "The Bat Cave - Bat 1");
            dispatch(logActions.updateLog(room5bat1Log.id, { user_id: user.id }));
        }
        if (batCount.current === 2) {
            // UPDATE USER LOG HISTORY:
            const room5bat2Log = room5logs.find(log => log.title === "The Bat Cave - Bat 2");
            dispatch(logActions.updateLog(room5bat2Log.id, { user_id: user.id }));
        }
        if (batCount.current === 3) {
            // UPDATE USER LOG HISTORY:
            const room5bat3Log = room5logs.find(log => log.title === "The Bat Cave - Bat 3");
            dispatch(logActions.updateLog(room5bat3Log.id, { user_id: user.id }));

            // CREATE NOTE WITH ROOM 5 HINT:
            if (userNotes) {
                let hasNote = false;
                Object.values(userNotes).forEach(note => {
                    if (note.body === "#antman") hasNote = true;
                })
                if (!hasNote) {
                    playSound(paperSfx);
                    dispatch(noteActions.createNote({ title: "find me", body: "#antman" }));
                }
            }

        }
    }



    // -------------------- ROOM 6 GAME LOGIC: -------------------- //
    let morseCode = useRef([]);
    const closeRoom6Intro = () => {
        // RESET MORSE CODE EVERY TIME ROOM 6 INTRO CLOSED:
        morseCode.current = [];

        // CLOSE MODAL:
        setShowRoom6Intro(false);

        // UPDATE USER LOG HISTORY:
        const room6logs = userRooms['6'].Event_Logs;
        const room6introLog = room6logs.find(log => log.title === "The Telegraph - Observing New Room");
        dispatch(logActions.updateLog(room6introLog.id, { user_id: user.id }));

        // CREATE LINK IN FOOTER:
        const footerContacts = document.querySelector('.footer-contact');
        const morseLink = document.createElement('a');
        morseLink.setAttribute('class', 'rscForRoom6 footer-links');
        morseLink.setAttribute('href', 'https://morsecode.world/international/translator.html');
        morseLink.setAttribute('target', '_blank');
        const morseImg = document.createElement('img');
        morseImg.setAttribute('class', 'footer-icons');
        morseImg.setAttribute('src', morseSvg);
        morseImg.setAttribute('alt', "morse");
        morseLink.appendChild(morseImg);
        footerContacts.appendChild(morseLink);
    }
    useEffect(() => {
        // RESET MORSE CODE EVERY PAGE LOAD:
        morseCode.current = [];

        // RUN FOR ROOM 6 ONLY:
        if (url === '/play/3RA7Y6eJ2bE') {

            const detectMorseCode = (e) => {
                const key = e.key;

                if (key === '.') playSound(morseDotSfx);
                if (key === '-') playSound(morseDashSfx);

                if (key === '.' || key === '-' || key === ' ') {
                    if (morseCode.current.slice(0).join('') === '' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '.' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '..' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '...' && key === ' ') {
                        if (key === ' ') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... ' && key === '-') {
                        if (key === '-') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... -' && key === '-') {
                        if (key === '-') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... --' && key === '-') {
                        if (key === '-') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... ---' && key === ' ') {
                        if (key === ' ') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... --- ' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... --- .' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You're on the right track!");
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else if (morseCode.current.slice(0).join('') === '... --- ..' && key === '.') {
                        if (key === '.') {
                            morseCode.current.push(key);
                            console.log("You did it!");
                            setShowRoom6CorrectKey(true);
                        } else {
                            morseCode.current = [];
                            console.log("Fail!");
                        }
                    }
                    else {
                        morseCode.current = [];
                        console.log("Fail!");
                    }
                } else {
                    morseCode.current = [];
                    console.log("Fail!");
                }
            }

            // ADD KEY PRESS EVENT LISTENER:
            document.addEventListener('keydown', detectMorseCode);

            // CLEAN UP FUNCTION:
            return () => document.removeEventListener('keydown', detectMorseCode);
        }
    }, [url]);
    const closeRoom6CorrectKey = () => {
        // UPDATE USER LOG HISTORY:
        const room6logs = userRooms['6'].Event_Logs;
        const room6successLog = room6logs.find(log => log.title === "The Telegraph - Success");
        dispatch(logActions.updateLog(room6successLog.id, { user_id: user.id }));

        // REDIRECT USER TO NEW ROOM:
        history.push('/play/jhNmKd74tEA');
    }



    // -------------------- ROOM 7 GAME LOGIC: -------------------- //
    // SET COOKIES (THIS WILL HAPPEN ON THE FIRST ROOM):
    document.cookie = "note_title=finalkey";
    document.cookie = "note_body=hiremichaeljung";

    const closeRoom7Intro = () => {
        // CLOSE MODAL:
        setShowRoom7Intro(false);

        // UPDATE USER LOG HISTORY:
        const room7logs = userRooms['7'].Event_Logs;
        const room7introLog = room7logs.find(log => log.title === "The Dead End - Observing New Room");
        dispatch(logActions.updateLog(room7introLog.id, { user_id: user.id }));

        // CREATE LINK IN FOOTER:
        const footerContacts = document.querySelector('.footer-contact');
        const cookieLink = document.createElement('a');
        cookieLink.setAttribute('class', 'rscForRoom7 footer-links');
        cookieLink.setAttribute('href', 'https://bit.ly/3U9VTAU');
        cookieLink.setAttribute('target', '_blank');
        const cookieImg = document.createElement('img');
        cookieImg.setAttribute('class', 'footer-icons');
        cookieImg.setAttribute('src', cookieSvg);
        cookieImg.setAttribute('alt', "cookie");
        cookieLink.appendChild(cookieImg);
        footerContacts.appendChild(cookieLink);
    }
    useEffect(() => {
        // RUN FOR ROOM 7 ONLY:
        if (url === '/play/jhNmKd74tEA' && userRooms['7']) {
            // RESET CORRECT KEY STATE
            setShowRoom7CorrectKey(false);

            // CHECK IF USER HAS CORRECT NOTE MADE:
            if (userNotes) {
                Object.values(userNotes).forEach(note => {
                    if (note.title === "finalkey" && note.body === "hiremichaeljung") setShowRoom7CorrectKey(true);
                });
            }
        }

        return () => setShowRoom7CorrectKey(false);
    }, [dispatch, userNotes, url, userRooms]);
    const closeRoom7CorrectKey = () => {
        // UPDATE USER LOG HISTORY:
        const room7logs = userRooms['7'].Event_Logs;
        const room7successLog = room7logs.find(log => log.title === "The Dead End - Success");
        dispatch(logActions.updateLog(room7successLog.id, { user_id: user.id }));

        // REDIRECT USER TO NEW ROOM:
        history.push('/play/gUpht2fDiqo');
    }



    // -------------------- ROOM 8 GAME LOGIC: -------------------- //
    const closeRoom8Intro = () => {
        // CLOSE MODAL:
        playLoopSound(beachSfx);
        setShowRoom8Intro(false);

        // UPDATE USER LOG HISTORY:
        const room8logs = userRooms['8'].Event_Logs;
        const room8introLog = room8logs.find(log => log.title === "Game Over?");
        dispatch(logActions.updateLog(room8introLog.id, { user_id: user.id }));
    }



    // -------------------- ROOM 9 GAME LOGIC: -------------------- //
    const closeRoom9Intro = () => {
        // CLOSE MODAL:
        playLoopSound(matrixSfx);
        setShowRoom9Intro(false);

        // UPDATE USER LOG HISTORY:
        const room9logs = userRooms['9'].Event_Logs;
        const room9introLog = room9logs.find(log => log.title === "The Real Final Room - The Reality");
        dispatch(logActions.updateLog(room9introLog.id, { user_id: user.id }));

        // CREATE ITEM REWARD:
        if (userItems) {
            let hasItem = false;
            Object.values(userItems).forEach(item => {
                if (item.name === "Choice" && item.serial_id === "#bigquestions" && item.img === "https://i.imgur.com/SDYUHbe.png") hasItem = true;
            })
            if (!hasItem) {
                dispatch(itemActions.createItem({ name: "Choice", serial_id: "#bigquestions", img: "https://i.imgur.com/SDYUHbe.png" }));
            }
        }
    }





    // ========================= RENDERED PAGE ========================= //
    if (!userRooms) return null;
    return (
        <>
            {showIntro && (
                <Modal
                    className='intro-story-modal'
                    onClose={closeIntro}
                >
                    <div className='intro-story'>
                        <p className='intro-welcome'>Welcome to Hatch, a virtual escape room!</p>
                        <br />
                        <p className='intro-title'>
                            Story:
                        </p>
                        <p className='intro-body'>
                            You are a genius mechanical/software engineer multi-billionaire and weapons manufacturer, hired by the federal government. Unfortunately, you have been kidnapped by a terrorist group who are forcing you to create weapons of mass destruction for them. They offer you unlimited resources to make these weapons. Use this to your advantage to find a way to escape! You can create, view, update, and delete notes and items (see instructions below). Good luck!
                        </p>
                        <br />
                        <p className='intro-title'>
                            Instructions:
                        </p>
                        <div className='intro-body'>
                            <ol className='intro-instructions-list'>
                                <li className='intro-list-item'>There is a 35 minute countdown timer that has already begun. It will keep running as long as you have this tab in your browser open (even if you are logged out). If you want to reset the timer, exit out of this tab/browser and log back in.</li>
                                <li className='intro-list-item'>There are a total of 9 rooms.</li>
                                <li className='intro-list-item'>Click around in the room to find clues.</li>
                                <li className='intro-list-item'>
                                    Some rooms may require you to create specific notes and/or items to get to the next room.
                                    <ul className='intro-instructions-nested-list'>
                                        <li className='intro-nested-list-item'>Use the "notes" and "items" sections on the left and right of the page to do this.</li>
                                        <li className='intro-nested-list-item'>Click the note or item card itself to view it.</li>
                                        <li className='intro-nested-list-item'>Click the <img src={add} alt="add" width='25px' /> icon to create a note or item.</li>
                                        <li className='intro-nested-list-item'>Click the <img src={pencil} alt="update" width='25px' /> icon to update a note or item.</li>
                                        <li className='intro-nested-list-item'>Click the <img src={trash} alt="delete" width='25px' /> icon to delete a note or item.</li>
                                    </ul>
                                </li>
                                <li className='intro-list-item'>You may need to utilize <a href="https://developer.chrome.com/docs/devtools/" target='_blank' rel='noreferrer'>Chrome DevTools</a> for some rooms.</li>
                                <li className='intro-list-item'>This <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#id_selectors" target='_blank' rel='noreferrer'>resource</a> may come in handy at some point.</li>
                                <li className='intro-list-item'>If you get stuck, you can check out my <a href="https://github.com/michaelhjung/hatch/wiki/BTS-Game-Walkthrough-*SPOILER-WARNING*" target="_blank" rel="noreferrer">game walkthrough</a> as a last resort (*spoiler warning*, this has all the room solutions).</li>
                                <li className='intro-list-item'>If you ever need to revisit these instructions, click on the profile button at the top-right!</li>
                                <li className='intro-list-item'>Have fun!</li>
                            </ol>
                        </div>
                    </div>
                </Modal>
            )}




            {url === '/play' && userRooms['1'] && (
                <>
                    <img className='room-img' id='blurry' src={userRooms['1']?.Images[0]?.img} alt="room1" />
                    <button className='rub-eyes-button' onClick={vizHandler}>Rub Eyes</button>
                    <div className='bottle' onClick={bottleClick} onMouseEnter={() => playSound(glassBottleSfx)}>
                        <img className='bottle-img' src="https://i.imgur.com/MxqBtSE.png" alt="bottle" />
                    </div>
                    {showBottleEvent && (
                        <Modal
                            className='bottle-event-modal'
                            onClose={closeBottleEvent}
                        >
                            <div className='event-popup'>
                                You found a bottle on the ground. There's a note inside... It says "A back door has opened."
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/sewer' && userRooms['2'] && (
                <>
                    <img className='room-img' src={userRooms['2']?.Images[0]?.img} alt="room2" />
                    <div className='room-2-note' onClick={room2NoteClick} onMouseEnter={() => playSound(paperSfx)}></div>
                    <div className='snake' onClick={snakeClick} onMouseEnter={() => playSound(snakeSfx)}>
                        <img className='snake-img' src='https://i.imgur.com/ixNino2.png' alt="snake" />
                    </div>
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
                            className='footer-event-modal'
                            onClose={closeFooterEvent}
                        >
                            <div className='event-popup'>
                                "Gross, did I feel something crawling on my foot?"
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
                    <img className='room-img' src={userRooms['3']?.Images[0]?.img} alt="room3" />
                    <div className='room-3-note' onClick={room3NoteClick} onMouseEnter={() => playSound(paperSfx)}></div>
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
                            className='room-3-success-modal'
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
                <>
                    <img className='room-img' src={userRooms['4']?.Images[0]?.img} alt="room4" />
                    <div className='room-4-console' onClick={room4ConsoleClick}>
                        <img className='room-4-console-img' src="https://i.imgur.com/Aky9pGi.png" alt="console" />
                    </div>
                    <div className='room-4-rabbit' onClick={room4RabbitClick} onMouseEnter={() => playSound(rabbitSfx)}>
                        <img className='room-4-rabbit-img' src="https://i.imgur.com/ujM26Nw.png" alt="rabbit" />
                    </div>
                    {showRoom4Intro && (
                        <Modal
                            className='room-4-intro-modal'
                            onClose={closeRoom4Intro}
                        >
                            <div className='event-popup'>
                                There's a hole in the ceiling, but how do I get up there? Hmm what tools do I have? Maybe I can make something again...
                            </div>
                        </Modal>
                    )}
                    {showRoom4ConsoleEvent && (
                        <Modal
                            className='room-4-console-event-modal'
                            onClose={closeRoom4ConsoleEvent}
                        >
                            <div className='event-popup'>
                                What is this old video game console doing here...? Someone must be living around here... gotta be careful...
                            </div>
                        </Modal>
                    )}
                    {showRoom4RabbitEvent && (
                        <Modal
                            className='room-4-rabbit-event-modal'
                            onClose={closeRoom4RabbitEvent}
                        >
                            <div className='event-popup'>
                                A random rabbit.
                            </div>
                        </Modal>
                    )}
                    {showRoom4CorrectKey && (
                        <Modal
                            className='room-4-success-modal'
                            onClose={closeRoom4CorrectKey}
                        >
                            <div className='event-popup'>
                                Nice job again, let's get out of here...
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/cSI7QDhHLW8' && userRooms['5'] && (
                <>
                    <img className='room-img' src={userRooms['5']?.Images[0]?.img} alt="room5" />
                    <div className='room-5-bat' onClick={room5BatClick} onMouseEnter={() => playSound(batscreechSfx)}>
                        <img className='room-5-bat-img bat1' src="https://i.imgur.com/R2EUztL.png" alt="bat" />
                        <img className='room-5-bat-img bat2' src="https://i.imgur.com/R2EUztL.png" alt="bat" />
                        <img className='room-5-bat-img bat3' src="https://i.imgur.com/R2EUztL.png" alt="bat" />
                        <img className='room-5-bat-img bat4' src="https://i.imgur.com/R2EUztL.png" alt="bat" />
                        <img id="antman |room-6=> /play/3RA7Y6eJ2bE" className='room-5-bat-img bat5' src="https://i.imgur.com/R2EUztL.png" alt="bat" />
                    </div>
                    {showRoom5Intro && (
                        <Modal
                            className='room-5-intro-modal'
                            onClose={closeRoom5Intro}
                        >
                            <div className='event-popup'>
                                What is this the bat cave? Am I supposed to be iron man or batman?
                            </div>
                        </Modal>
                    )}
                    {showRoom5BatEvent && batCount.current === 0 && (
                        <Modal
                            className='room-5-bat-event-1-modal'
                            onClose={closeRoom5BatEvent}
                        >
                            <div className='event-popup'>
                                A bat flew into you.
                            </div>
                        </Modal>
                    )}
                    {showRoom5BatEvent && batCount.current === 1 && (
                        <Modal
                            className='room-5-bat-event-2-modal'
                            onClose={closeRoom5BatEvent}
                        >
                            <div className='event-popup'>
                                Another bat flew into you.
                            </div>
                        </Modal>
                    )}
                    {showRoom5BatEvent && batCount.current === 2 && (
                        <Modal
                            className='room-5-bat-event-3-modal'
                            onClose={closeRoom5BatEvent}
                        >
                            <div className='event-popup'>
                                A third bat flew into you. This one dropped a note.
                            </div>
                        </Modal>
                    )}
                    {showRoom5BatEvent && batCount.current >= 3 && (
                        <Modal
                            className='room-5-bat-event-3-modal'
                            onClose={closeRoom5BatEvent}
                        >
                            <div className='event-popup'>
                                The bats stare at you from above.
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/3RA7Y6eJ2bE' && userRooms['6'] && (
                <>
                    <img className='room-img' src={userRooms['6']?.Images[0]?.img} alt="room6" />
                    {showRoom6Intro && (
                        <Modal
                            className='room-6-intro-modal'
                            onClose={closeRoom6Intro}
                        >
                            <div className='event-popup'>
                                Ok, now this is just getting weird. Did I teleport in time? Who designed this game?
                            </div>
                        </Modal>
                    )}
                    {showRoom6CorrectKey && (
                        <Modal
                            className='room-6-success-modal'
                            onClose={closeRoom6CorrectKey}
                        >
                            <div className='event-popup'>
                                Solid work.
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/jhNmKd74tEA' && userRooms['7'] && (
                <>
                    <img className='room-img' src={userRooms['7']?.Images[0]?.img} alt="room7" />
                    {showRoom7Intro && (
                        <Modal
                            className='room-7-intro-modal'
                            onClose={closeRoom7Intro}
                        >
                            <div className='event-popup'>
                                Dang it I'm back in the caves... but it looks like all I need to do now is get this final lock!
                            </div>
                        </Modal>
                    )}
                    {showRoom7CorrectKey && (
                        <Modal
                            className='room-7-success-modal'
                            onClose={closeRoom7CorrectKey}
                        >
                            <div className='event-popup'>
                                Were those always there?
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/gUpht2fDiqo' && userRooms['8'] && (
                <>
                    <img className='room-img' id="room9? OakSkzL3XaZM2VUR" src={userRooms['8']?.Images[0]?.img} alt="room8" />
                    {showRoom8Intro && (
                        <Modal
                            className='room-8-intro-modal'
                            onClose={closeRoom8Intro}
                        >
                            <div className='event-popup'>
                                Congratulations, you escaped.
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url === '/play/OakSkzL3XaZM2VUR' && userRooms['9'] && (
                <>
                    <img className='room-img' src={userRooms['9']?.Images[0]?.img} alt="room9" onError={e => e.target.src={matrix}} />
                    {showRoom9Intro && (
                        <Modal
                            className='room-9-intro-modal'
                            onClose={closeRoom9Intro}
                        >
                            <div className='event-popup'>
                                You found the real final room. This world is not what it seems... Do you want to stay in wonderland, or see how far the rabbit hole goes...?
                                <br/>
                                <br/>
                                Thanks for playing!
                            </div>
                        </Modal>
                    )}
                </>
            )}



            {url !== '/play' &&
             url !== '/play/sewer' &&
             url !== '/play/AKDzZV7xMuQ' &&
             url !== '/play/nwgjJHTaYys' &&
             url !== '/play/cSI7QDhHLW8' &&
             url !== '/play/3RA7Y6eJ2bE' &&
             url !== '/play/jhNmKd74tEA' &&
             url !== '/play/gUpht2fDiqo' &&
             url !== '/play/OakSkzL3XaZM2VUR' && (
                <img className='room-img' src={wrongRoom} alt="wrong room" />
             )}
        </>
    )
}
