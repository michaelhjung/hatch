import './Game.css';
import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../Profile/ProfileButton';
import Notes from '../Notes';
import Items from '../Items';
import Rooms from '../Rooms';
import RoomTitle from '../Rooms/RoomTitle';
import EventLogs from '../EventLogs';
import * as roomActions from '../../store/rooms';

export default function Game() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userRooms = useSelector(state => state.rooms);
    const url = useLocation().pathname;

    useEffect(() => {
        dispatch(roomActions.readRooms());

        return () => dispatch(roomActions.clearData());
    }, [dispatch]);

    if (!user) {
        // alert('You must be logged in to play.');
        return Redirect('/');
    }

    return (
        <main className='game-container'>
            <section className='top'>
                <RoomTitle url={url} userRooms={userRooms} />
                <ProfileButton user={user} />
            </section>
            <section className='notes'>
                <Notes />
            </section>
            <section className='rooms'>
                <Rooms user={user} url={url} userRooms={userRooms} />
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
