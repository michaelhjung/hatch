import './Splash.css'
import { useSelector } from 'react-redux';
import logo from '../../assets/imgs/hatch-logo.png';
import heroBg from '../../assets/imgs/watertight-door_door-bg.png';
import heroWheel from '../../assets/imgs/watertight-door_wheel.png';
import LoginForm from '../Auth/LoginForm';
import SignUpForm from '../Auth/SignUpForm';
import LogoutButton from '../Auth/LogoutButton';
import Demo from './Demo';

export default function Splash() {
    const user = useSelector(state => state.session.user);

    return (
        <main className='hero-splash-container'>
            <section className='hero-container'>
                {/* <img className='hero-bg' src={hero} alt='watertight door'/> */}
            </section>


            <section className='splash-container'>
                <div className='splash-logo-container'>
                    <img src={logo} alt='hatch logo' />
                </div>
                <div className='login-signup-container'>
                    <LoginForm />
                    <SignUpForm />
                </div>
                {user && (
                    <>
                        <div>
                            <h1 className='welcome-title'>Welcome, {user.username}.</h1>
                        </div>
                        <LogoutButton />
                    </>
                )}
                <Demo />
            </section>
        </main>
    )
}