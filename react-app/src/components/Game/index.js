import './Game.css';
import { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Profile/ProfileButton';
import Notes from '../Notes';
import Items from '../Items';
import Rooms from '../Rooms';
import RoomTitle from '../Rooms/RoomTitle';
import EventLogs from '../EventLogs';
import Timer from '../Timer';
import * as roomActions from '../../store/rooms';
import * as logActions from '../../store/logs';
import * as noteActions from '../../store/notes';
import * as itemActions from '../../store/items';

export default function Game() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userRooms = useSelector(state => state.rooms);
    const userNotes = useSelector(state => state.notes);
    const userItems = useSelector(state => state.items);
    const userLogs = useSelector(state => state.logs);
    const [showIntro, setShowIntro] = useState(false);
    const url = useLocation().pathname;

    useEffect(() => {
        dispatch(roomActions.readRooms());
        dispatch(noteActions.readNotes());
        dispatch(itemActions.readItems());
        dispatch(logActions.readLogs());

        return () => {
            dispatch(roomActions.clearData());
            dispatch(noteActions.clearData());
            dispatch(itemActions.clearData());
            dispatch(logActions.clearData());
        }
    }, [dispatch]);


    if (!user) return Redirect('/');
    return (
        <main className='game-container'>
            <section className='top'>
                <Timer
                    user={user}
                    url={url}
                />
                <RoomTitle
                    url={url}
                    userRooms={userRooms}
                />
                <ProfileButton
                    user={user}
                    showIntro={showIntro}
                    setShowIntro={setShowIntro}
                />
            </section>
            <section className='notes'>
                <Notes
                    userNotes={userNotes}
                />
            </section>
            <section className='rooms'>
                <Rooms
                    user={user} url={url}
                    userRooms={userRooms}
                    userNotes={userNotes}
                    useItems={userItems}
                    userLogs={userLogs}
                    showIntro={showIntro}
                    setShowIntro={setShowIntro}
                />
            </section>
            <section className='items'>
                <Items
                    userItems={userItems}
                />
            </section>
            <section className='logs'>
                <EventLogs
                    userLogs={userLogs}
                />
            </section>
        </main>
    )
}
