import './Timer.css';
import { useState, useEffect, useRef } from 'react';

export default function Timer({ user }) {
    // const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        let endDate;
        if (sessionStorage.getItem(`${user.id}_savedEndDate`)) endDate = sessionStorage.getItem(`${user.id}_savedEndDate`);
        else {
            endDate = new Date(Date.now() + (35 * 60 * 1000)).getTime();
            sessionStorage.setItem(`${user.id}_savedEndDate`, endDate);
        }

        interval.current = setInterval(() => {
            const now = new Date(Date.now()).getTime();

            const distance = endDate - now;

            // const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
            const minutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
            const seconds = Math.floor(distance % (60 * 1000) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
                const hourglassIcon = document.querySelector('.hourglass-icon');
                hourglassIcon.innerHTML = "⌛";
                alert("Time is up! To reset the timer, exit out of this tab or browser and log back in.");
            } else {
                // setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (timerMinutes === 0 && timerSeconds === 0) {
            const hourglassIcon = document.querySelector('.hourglass-icon');
            hourglassIcon.innerHTML = "⌛";
        }

    }, [timerMinutes, timerSeconds]);

    return (
        <div className='timer-container'>
            {/* <span className='hours'>{timerHours}</span>
            <span>:</span> */}
            <span className='hourglass-icon'>⏳</span>
            <div className='minutes-section'>
                <span className='minutes'>{timerMinutes}</span>
                <span className='timer-text'>min</span>
            </div>
            <span className='timer-colon'>:</span>
            <div className='seconds-section'>
                <span className='seconds'>{timerSeconds}</span>
                <span className='timer-text'>sec</span>
            </div>
            <span className='timer-left-text'>left</span>
        </div>
    )
}
