import './Profile.css';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu';
import wanted from '../../assets/icons/wanted.svg';

export default function ProfileButton({ user }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const openMenu = (e) => {
        e.preventDefault();
        if (!showProfileMenu) setShowProfileMenu(true);
    }

    const closeMenu = (e) => {
        e.preventDefault();
        if (showProfileMenu) setShowProfileMenu(false);
    }


    return (
        <>
            <div className='profile-button' onClick={openMenu}>
                <img className='profile-pic' src={user.profile_pic} alt="avatar" onError={e => e.target.src="https://bit.ly/3Ddiwxy"} />
            </div>
            {showProfileMenu && (
                <ProfileMenu
                    user={ user }
                    showProfileMenu={showProfileMenu}
                    setShowProfileMenu={setShowProfileMenu}
                    closeMenu={closeMenu}
                />
            )}
        </>
    )
}
