import '../blocks/Sidebar.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Sidebar ({ userName, avatar, handleEditProfileModal, handleLogout }) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
    <div className="sidebar">
        <div className="sidebar__user">
            {currentUser.avatar
                ? <img src={avatar} alt="Avatar" className="sidebar__avatar" />
                : <div className="sidebar__initial">{currentUser.name.charAt(0)}</div>
            }
            <p className="sidebar__username">{userName}</p>
        </div>
        <button className="sidebar__edit" onClick={handleEditProfileModal}>
            Change profile data
        </button>
        <button className="sidebar__logout" onClick={handleLogout}>
            Log out
        </button>
    </div>
    )
}

export default Sidebar;