import './Timer.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


export default function Timer({ user, url }) {
    // const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    const dispatch = useDispatch();
    const userNotes = useSelector(state => state.notes);

    let interval = useRef();

    let pausedMinutes;
    let pausedSeconds;

    const startTimer = () => {
        let endDate;

        // SET FINISHED TIME LEFT IF ALREADY COMPLETED GAME:
        if (localStorage.getItem(`${user.id}_savedEndDate`)) {
            console.log("USER", user);
            clearInterval(interval.current);

            const distance = localStorage.getItem(`${user.id}_savedEndDate`) - localStorage.getItem(`${user.id}_savedPausedNow`);
            pausedMinutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
            pausedSeconds = Math.floor(distance % (60 * 1000) / 1000);

            setTimerMinutes(pausedMinutes);
            setTimerSeconds(pausedSeconds);

            return null;
        }

        else if (sessionStorage.getItem(`${user.id}_savedEndDate`)) endDate = sessionStorage.getItem(`${user.id}_savedEndDate`);
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



    // STOP TIMER ON ENTERING LAST ROOM:
    useEffect(() => {
        if (url === '/play/OakSkzL3XaZM2VUR') {
            clearInterval(interval.current);
            dispatch(sessionActions.updateUser(user.id, { won: true }));

            let pausedNow;
            if (localStorage.getItem(`${user.id}_savedPausedNow`)) pausedNow = localStorage.getItem(`${user.id}_savedPausedNow`);
            else {
                pausedNow = new Date(Date.now()).getTime();
                localStorage.setItem(`${user.id}_savedPausedNow`, pausedNow);
            }

            let localStorageEnd;
            if (localStorage.getItem(`${user.id}_savedEndDate`)) localStorageEnd = localStorage.getItem(`${user.id}_savedEndDate`);
            else {
                localStorage.setItem(`${user.id}_savedEndDate`, (sessionStorage.getItem(`${user.id}_savedEndDate`)));
                localStorageEnd = localStorage.getItem(`${user.id}_savedEndDate`);
            }

            const distance = localStorage.getItem(`${user.id}_savedEndDate`) - pausedNow;
            pausedMinutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
            pausedSeconds = Math.floor(distance % (60 * 1000) / 1000);

            setTimerMinutes(pausedMinutes);
            setTimerSeconds(pausedSeconds);
        }
    }, [url]);

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
