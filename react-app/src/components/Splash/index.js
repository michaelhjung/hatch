import './Splash.css'
import logo from '../../assets/imgs/hatch-logo.png';
import heroBg from '../../assets/imgs/watertight-door_door-bg.png';
import heroWheel from '../../assets/imgs/watertight-door_wheel.png';
import Demo from './Demo';

export default function Splash() {
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
                    <button className='login-button'>LOG IN</button>
                    <button className='signup-button'>SIGN UP</button>
                </div>
                <Demo />
            </section>
        </main>
    )
}
