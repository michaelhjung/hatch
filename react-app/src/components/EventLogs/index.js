import './EventLogs.css';

export default function EventLogs({ userLogs }) {

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
