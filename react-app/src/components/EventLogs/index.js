import './EventLogs.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as logActions from '../../store/logs';

export default function EventLogs({ user, userLogs }) {
    // const dispatch = useDispatch();
    // const userLogs = useSelector(state => state.logs);

    // useEffect(() => {
    //     dispatch(logActions.readLogs());

    //     return () => dispatch(logActions.clearData());
    // }, [dispatch]);

    if (!userLogs) return null;

    return (
        <div className='all-logs-container-wrapper'>
            <span className='logs-header'>🎬 event logs</span>
            <div className='logs-container'>
                {userLogs && Object.values(userLogs).map(log => (
                    <div className='log-container' key={log.id}>
                        <div className='log-title'>{log.title}:</div>
                        <div className='log-body'>{log.body}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
