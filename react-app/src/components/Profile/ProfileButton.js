import './Profile.css';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

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
                <img className='profile-pic' src={user.profile_pic} alt="avatar" />
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
