import './Splash.css'
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/imgs/hatch-logo.png';
import hero from '../../assets/imgs/hero-normal.gif';
import heroAnimate from '../../assets/imgs/hero-animate.gif';
import LoginForm from '../Auth/LoginForm';
import SignUpForm from '../Auth/SignUpForm';
import LogoutButton from '../Auth/LogoutButton';
import Demo from './Demo';
import * as roomActions from '../../store/rooms';
import * as noteActions from '../../store/notes'
import * as itemActions from '../../store/items';
import * as logActions from '../../store/logs';
import * as sessionActions from '../../store/session';


export default function Splash() {
    const user = useSelector(state => state.session.user);
    const userRooms = useSelector(state => state.rooms);
    const userLogs = useSelector(state => state.logs);
    const userItems = useSelector(state => state.items);
    const userNotes = useSelector(state => state.notes);
    const [showLastRoom, setShowLastRoom] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();


    // ----- NEW USER SIGN UP: AUTO-GENERATE ROOMS ----- //
    // ROOMS SETUP LOGIC:
    const roomsSetup = useCallback(async (user) => {
        // ALL ROOMS
        const room1 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 1, name: "The Cave" }));
        const room2 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 2, name: "The Sewer" }));
        const room3 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 3, name: "The Locked Door" }));
        const room4 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 4, name: "The Empty Room" }));
        const room5 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 5, name: "The Bat Cave" }));
        const room6 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 6, name: "The Telegraph" }));
        const room7 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 7, name: "The Dead End" }));
        const room8 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 8, name: "Game Over?" }));
        const room9 = await dispatch(roomActions.createRoom({ user_id: user.id, progress_id: 9, name: "The Real Final Room" }));

        if (room1 && room2 && room3 && room4 && room5 && room6 && room7 && room8 && room9) {

            // ROOM 1 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room1.id, room_progress_id: 1, name: "The Cave", img: "https://bit.ly/3DxLKss", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room1.id, title: "The Cave - Waking Up", body: "Oh God, why is it so blurry..." }));
            await dispatch(logActions.createLog({ room_id: room1.id, title: "The Cave - Found Item", body: `You found a bottle on the ground. There's a note inside... It says "A back door has opened."` }));

            // ROOM 2 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room2.id, room_progress_id: 2, name: "The Sewer", img: "https://bit.ly/3f5D8Qd", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room2.id, title: "The Sewer - Observing New Room", body: `An underground sewage system... Now to keep looking around...` }));
            await dispatch(logActions.createLog({ room_id: room2.id, title: "The Sewer - Creepy Thing in Water", body: `Gross, did I feel something crawling on my foot?` }));
            await dispatch(logActions.createLog({ room_id: room2.id, title: "The Sewer - Found Note", body: `A note... it says, "serial id: BA09JM19"` }));

            // ROOM 3 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room3.id, room_progress_id: 3, name: "The Locked Door", img: "https://bit.ly/3Ff8O06", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room3.id, title: "The Locked Door - Observing New Room", body: `I found a door, but it's locked... Looks like it wants a very specific key...` }));
            await dispatch(logActions.createLog({ room_id: room3.id, title: "The Locked Door - Found Note", body: `Another note... it says, "url: https://bit.ly/3fkBytZ"` }));
            await dispatch(logActions.createLog({ room_id: room3.id, title: "The Locked Door - Key", body: `You made the right key! Nice...` }));

            // ROOM 4 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room4.id, room_progress_id: 4, name: "The Empty Room", img: "https://bit.ly/3DwkLgI", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room4.id, title: "The Empty Room - Observing New Room", body: `There's a hole in the ceiling, but how do I get up there? Hmm what tools do I have?  Maybe I can make something...` }));
            await dispatch(logActions.createLog({ room_id: room4.id, title: "The Empty Room - Game Console?", body: `What is this old video game console doing here...? Someone must be living around here... gotta be careful...` }));
            await dispatch(logActions.createLog({ room_id: room4.id, title: "The Empty Room - Random Rabbit", body: `A random rabbit.` }));
            await dispatch(logActions.createLog({ room_id: room4.id, title: "The Empty Room - The Right Tool", body: `Nice job again, let's get out of here...` }));

            // ROOM 5 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room5.id, room_progress_id: 5, name: "The Bat Cave", img: "https://bit.ly/3W0Yrmy", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room5.id, title: "The Bat Cave - Observing New Room", body: `What is this the bat cave? Am I supposed to be iron man or batman?` }));
            await dispatch(logActions.createLog({ room_id: room5.id, title: "The Bat Cave - Bat 1", body: `A bat flew into you.` }));
            await dispatch(logActions.createLog({ room_id: room5.id, title: "The Bat Cave - Bat 2", body: `Another bat flew into you.` }));
            await dispatch(logActions.createLog({ room_id: room5.id, title: "The Bat Cave - Bat 3", body: `A third bat flew into you. This one dropped a note.` }));

            // ROOM 6 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room6.id, room_progress_id: 6, name: "The Telegraph", img: "https://i.imgur.com/fS1Ko2e.gif", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room6.id, title: "The Telegraph - Observing New Room", body: `Ok, now this is just getting weird. Did I teleport in time? Who designed this game?` }));
            await dispatch(logActions.createLog({ room_id: room6.id, title: "The Telegraph - Success", body: `Solid work.` }));

            // ROOM 7 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room7.id, room_progress_id: 7, name: "The Dead End", img: "https://bit.ly/3TYRIrJ", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room7.id, title: "The Dead End - Observing New Room", body: `Dang it, I'm back in the caves... but it looks like all I need to do now is get this final lock!` }));
            await dispatch(logActions.createLog({ room_id: room7.id, title: "The Dead End - Success", body: `How long were those cookies there!?` }));

            // ROOM 8 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room8.id, room_progress_id: 8, name: "Game Over?", img: "https://i.imgur.com/426V0Hu.gif", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room8.id, title: "Game Over?", body: `Congratulations, you escaped.` }));

            // ROOM 9 IMGS & LOGS:
            await dispatch(roomActions.createRoomImg({ room_id: room9.id, room_progress_id: 9, name: "The Real Final Room", img: "https://i.imgur.com/CxAZUho.gif", order: 1 }));

            await dispatch(logActions.createLog({ room_id: room9.id, title: "The Real Final Room - The Reality", body: `Congratulations. You found the real final room. This world is not what it seems... Do you want to stay in this fantasy world and believe whatever you want? Or do you want me to show you how deep the rabbit hole goes...?` }));
        }

        await dispatch(sessionActions.updateUser(user.id, { current_room: 1 }));
    }, [dispatch]);
    // NOTES SETUP LOGIC:
    const notesSetup = useCallback((user) => {
        dispatch(noteActions.createNote({ user_id: user.id, title: `Hi, ${user.first_name}`, body: `Welcome to hatch, a virtual escape room!` }));
        dispatch(noteActions.createNote({ user_id: user.id, title: `Notes`, body: `Feel free to create, read, update, or delete notes!` }));
        dispatch(noteActions.createNote({ user_id: user.id, title: `Items`, body: `Feel free to create, read, update, or delete items on the right side. We made some examples for you already, check them out.` }));
    }, [dispatch]);
    // ITEMS SETUP LOGIC:
    const itemsSetup = useCallback((user) => {
        dispatch(itemActions.createItem({ user_id: user.id, name: "Random Tool", serial_id: "T25976", img: "https://bit.ly/3fkwTbg" }));
        dispatch(itemActions.createItem({ user_id: user.id, name: "Cookies", serial_id: "COOKI35", img: "https://bit.ly/3DGqFfz" }));
    }, [dispatch]);


    // USE EFFECTS TO INITIALIZE GAME SETUP FOR NEW USERS:
    useEffect(() => {
        if (user) {
            if (!user.Rooms || (user.Rooms && user.Rooms.length === 0)) {
                console.log(`Welcome, ${user.username}!`);

                // CREATE USER ROOMS:
                console.log("Setting up rooms...");
                roomsSetup(user);
                console.log("Finished setting up all rooms.");

                // CREATE USER NOTES:
                console.log("Setting up notes...");
                notesSetup(user);
                console.log("Finished setting up all notes.");

                // CREATE USER ITEMS:
                console.log("Setting up items...");
                itemsSetup(user);
                console.log("Finished setting up all items.");
            }
        }
    }, [dispatch, user, roomsSetup, notesSetup, itemsSetup]);



    // ANIMATION LOGIC FOR ENTER ROOM:
    const handleEnterRoom = () => {
        const hero = document.getElementById('hero');
        hero.src = heroAnimate;

        const hatchLogo = document.querySelector('.hero-logo');
        const userButtons = document.querySelector('.user-buttons');

        hatchLogo.setAttribute('class', 'hero-logo fade-out');
        userButtons.setAttribute('class', 'user-buttons fade-out');


        setTimeout(() => {
            history.push('/play');
        }, 3500);
    }
    const handleEnterLastRoom = () => {
        const hero = document.getElementById('hero');
        hero.src = heroAnimate;

        const hatchLogo = document.querySelector('.hero-logo');
        const userButtons = document.querySelector('.user-buttons');

        hatchLogo.setAttribute('class', 'hero-logo fade-out');
        userButtons.setAttribute('class', 'user-buttons fade-out');


        setTimeout(() => {
            if (user.current_room === 1) history.push('/play');
            else if (user.current_room === 2) history.push('/play/sewer');
            else if (user.current_room === 3) history.push('/play/AKDzZV7xMuQ');
            else if (user.current_room === 4) history.push('/play/nwgjJHTaYys');
            else if (user.current_room === 5) history.push('/play/cSI7QDhHLW8');
            else if (user.current_room === 6) history.push('/play/3RA7Y6eJ2bE');
            else if (user.current_room === 7) history.push('/play/jhNmKd74tEA');
            else if (user.current_room === 8) history.push('/play/gUpht2fDiqo');
            else if (user.current_room === 9) history.push('/play/OakSkzL3XaZM2VUR');
        }, 3500);
    }



    // USE EFFECT TO GRAB USER'S ROOMS, NOTES, ITEMS, & EVENT LOGS:
    useEffect(() => {
        if (user) {
            dispatch(roomActions.readRooms());
            dispatch(logActions.readLogs());
            dispatch(noteActions.readNotes());
            dispatch(itemActions.readItems());

            return () => {
                dispatch(roomActions.clearData());
                dispatch(logActions.clearData());
                dispatch(noteActions.clearData());
                dispatch(itemActions.clearData());
            }
        }
    }, [dispatch, user]);

    const resetUserData = () => {
        Object.values(userNotes).forEach(note => {
            dispatch(noteActions.deleteNote(note.id));
        });
        Object.values(userItems).forEach(item => {
            dispatch(itemActions.deleteItem(item.id));
        });
        Object.values(userLogs).forEach(log => {
            dispatch(logActions.deleteLog(log.id));
        });
        Object.values(userRooms).forEach(room => {
            dispatch(roomActions.deleteRoom(room.id, room.progress_id));
        })
    }

    // RESET BUTTON HANDLER:
    const handleReset = () => {
        if (window.confirm(`Please verify you would like to reset the game data by clicking "OK". This action cannot be undone.`)) {
            resetUserData();
            roomsSetup(user);
            notesSetup(user);
            itemsSetup(user);

            // UPDATE CURRENT ROOM & REMOVE ENTER LAST ROOM BUTTON:
            dispatch(sessionActions.updateUser(user.id, { current_room: 1 }));
            setShowLastRoom(false);

            // REMOVE SESSION STORAGE:
            sessionStorage.removeItem(`${user.id}_savedEndDate`);

            alert("Data has been reset.");
        }
    }

    useEffect(() => {
        if (user && user.current_room !== 1) setShowLastRoom(true);

        return () => setShowLastRoom(false);
    }, [user]);


    return (
        <main className='hero-splash-container'>
            <section className='hero-container'>
                <img className='hero-img' id='hero' src={hero} alt='hatch hero' />
            </section>


            <section className='splash-container'>
                <div className='login-signup-container'>
                    <img className='hero-logo fade-in-logo' src={logo} alt='hatch logo' />
                    <LoginForm />
                    <SignUpForm />
                    <Demo />
                    {user && (
                        <div className='user-buttons fade-in-buttons'>
                            <h1 className='welcome-title'>Welcome, {user.username}.</h1>
                            <button className='enter-room-button' onClick={handleEnterRoom}>ENTER ROOM <span className='enter-room-num-1'>1</span></button>
                            {showLastRoom && (
                                <button className='enter-last-room-button' onClick={handleEnterLastRoom}>LAST ENTERED ROOM: <span className='enter-room-num'>{user.current_room}</span></button>
                            )}
                            <button className='reset-button' onClick={handleReset}>RESET GAME DATA</button>
                            <LogoutButton />
                        </div>
                    )}
                    {!user && (
                        <small className='demo-rec fade-in-buttons'>*NOTE: it is recommended to sign up and use your own account rather than using the demo login (in case someone else is using the demo login at the same time)</small>
                    )}
                </div>
            </section>
        </main>
    )
}
