import './Game.css';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Profile/ProfileButton';

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
            <section className='items'>ITEMS</section>
            <section className='rooms'>ROOM</section>
            <section className='notes'>NOTES</section>
            <section className='logs'>LOGS</section>
        </main>
    )
}
