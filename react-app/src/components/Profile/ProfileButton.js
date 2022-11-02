import './Profile.css';
import { useEffect, useState } from 'react';
import ProfileMenu from './ProfileMenu';

export default function ProfileButton({ user }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const openMenu = () => {
        if (!showProfileMenu) setShowProfileMenu(true);
    }

    useEffect(() => {
        if (!showProfileMenu) return;
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    });

    const closeMenu = () => {
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
