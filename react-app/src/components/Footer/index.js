import './Footer.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import github from '../../assets/icons/github.svg';
import linkedin from '../../assets/icons/linkedin.svg';

export default function Footer() {
    const url = useLocation().pathname;

    useEffect(() => {
        const footer = document.getElementById('footer');
        if (url === '/') footer.setAttribute('class', 'fixed');
        if (url !== '/') footer.removeAttribute('class', 'fixed');

    }, [url]);

    return (
        <footer id='footer' >
            <div className='footer-copyright-wrapper'>
                <span className='footer-copyright'>
                    Copyright ©2022 Michael Jung. Hatch is an original virtual escape room designed by <a className='michael-linkedin' href='https://www.linkedin.com/in/michael-h-jung/' target='_blank' rel='noreferrer'>Michael Jung</a>.
                </span>
            </div>
            <div className='footer-resources'>
                <div className='footer-contact'>
                    <a className='linkedin footer-links' href='https://www.linkedin.com/in/michael-h-jung/' target='_blank' rel='noreferrer'>
                        <img className='footer-icons' src={linkedin} alt='linkedin' />
                    </a>
                    <a className='github footer-links' href='https://github.com/michaelhjung' target='_blank' rel='noreferrer'>
                        <img className='footer-icons' src={github} alt='github' />
                    </a>
                </div>
                <div>

                </div>
            </div>
    </footer>
    )
}
