import './Game.css';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Profile/ProfileButton';
import Notes from '../Notes';
import Items from '../Items';
import Rooms from '../Rooms';

export default function Game() {
    const user = useSelector(state => state.session.user);

    if (!user) {
        // alert('You must be logged in to play.');
        return Redirect('/');
    }

    return (
        <main className='game-container'>
            <section className='top'>
                <ProfileButton user={user} />
            </section>
            <section className='notes'>
                <Notes />
            </section>
            <section className='rooms'>
                <Rooms />
            </section>
            <section className='items'>
                <Items />
            </section>
            <section className='logs'>LOGS</section>
        </main>
    )
}
