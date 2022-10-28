import './EventLogs.css';
import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as logActions from '../../store/logs';

export default function EventLogs({ user }) {
    const dispatch = useDispatch();
    const userLogs = useSelector(state => state.logs);

    useEffect(() => {
        dispatch(logActions.readLogs());

        return () => dispatch(logActions.clearData());
    }, [dispatch]);

    if (!userLogs) return null;

    return (
        <div>
            LOGS
        </div>
    )
}
