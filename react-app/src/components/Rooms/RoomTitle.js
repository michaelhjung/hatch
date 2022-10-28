import './Rooms.css';

export default function RoomTitle({ url, userRooms }) {
    return (
        <>
            {url === '/play' && userRooms['1'] && (
                <span className='room-header'>{userRooms['1'].name}</span>
            )}
            {url === '/play/sewer' && userRooms['2'] && (
                <span className='room-header'>{userRooms['2'].name}</span>
            )}
            {url === '/play/AKDzZV7xMuQ' && userRooms['3'] && (
                <span className='room-header'>{userRooms['3'].name}</span>
            )}
            {url === '/play/nwgjJHTaYys' && userRooms['4'] && (
                <span className='room-header'>{userRooms['4'].name}</span>
            )}
            {url === '/play/cSI7QDhHLW8' && userRooms['5'] && (
                <span className='room-header'>{userRooms['5'].name}</span>
            )}
            {url === '/play/3RA7Y6eJ2bE' && userRooms['6'] && (
                <span className='room-header'>{userRooms['6'].name}</span>
            )}
            {url === '/play/jhNmKd74tEA' && userRooms['7'] && (
                <span className='room-header'>{userRooms['7'].name}</span>
            )}
            {url === '/play/gUpht2fDiqo' && userRooms['8'] && (
                <span className='room-header'>{userRooms['8'].name}</span>
            )}
            {url !== '/play' &&
             url !== '/play/sewer' &&
             url !== '/play/AKDzZV7xMuQ' &&
             url !== '/play/nwgjJHTaYys' &&
             url !== '/play/cSI7QDhHLW8' &&
             url !== '/play/3RA7Y6eJ2bE' &&
             url !== '/play/jhNmKd74tEA' &&
             url !== '/play/gUpht2fDiqo' && (
                <span className='room-header'>Wrong Room</span>
             )}
        </>
    )
}
