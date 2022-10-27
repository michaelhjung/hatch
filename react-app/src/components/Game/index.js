import './Game.css';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Profile/ProfileButton';
import Notes from '../Notes';

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
                <Notes user={user} />
            </section>
            <section className='rooms'>ROOM</section>
            <section className='items'>ITEMS</section>
            <section className='logs'>LOGS</section>
        </main>
    )
}
