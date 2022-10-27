import './Profile.css';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

export default function ProfileButton({ user }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const clickHandler = (e) => {
        e.preventDefault();
        setShowProfileMenu(true);
    }

    return (
        <>
            <div className='profile-button' onClick={clickHandler}>
                <img className='profile-pic' src={user.profile_pic} alt="avatar" />
            </div>
            {showProfileMenu && (
                <ProfileMenu user={ user } showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} />
            )}
        </>
    )
}
