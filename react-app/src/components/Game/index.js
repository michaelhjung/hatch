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

export default function Game() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userRooms = useSelector(state => state.rooms);
    const [showIntro, setShowIntro] = useState(false);
    const url = useLocation().pathname;

    useEffect(() => {
        dispatch(roomActions.readRooms());

        return () => dispatch(roomActions.clearData());
    }, [dispatch]);


    if (!user) return Redirect('/');
    return (
        <main className='game-container'>
            <section className='top'>
                <Timer user={user} />
                <RoomTitle url={url} userRooms={userRooms} />
                <ProfileButton user={user} showIntro={showIntro} setShowIntro={setShowIntro} />
            </section>
            <section className='notes'>
                <Notes />
            </section>
            <section className='rooms'>
                <Rooms user={user} url={url} userRooms={userRooms} showIntro={showIntro} setShowIntro={setShowIntro} />
            </section>
            <section className='items'>
                <Items />
            </section>
            <section className='logs'>
                <EventLogs />
            </section>
        </main>
    )
}
