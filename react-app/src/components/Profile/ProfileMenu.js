import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import x from '../../assets/icons/x.svg';

export default function ProfileMenu({ user, showProfileMenu, setShowProfileMenu, closeMenu, showIntro, setShowIntro }) {
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        e.preventDefault();
        setShowProfileMenu(false);
        await dispatch(logout());
    };


    return (
        <div className="profile-menu-container">
            <div>
                <div className='x' onClick={closeMenu}><img src={x} alt="x" width={25} height={25} /></div>
                {user.won ? (
                    <div className="profile-username">🏆{user.username}</div>
                ) : (
                    <div className="profile-username">{user.username}</div>
                )}
                <div className="instructions-button" onClick={() => setShowIntro(true)}>instructions</div>
                <div className="game-logout-button" onClick={onLogout}>log out</div>
            </div>
        </div>
    )
}
