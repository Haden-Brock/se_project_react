import '../blocks/Profile.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ClothesSection from './ClothesSection';
import Sidebar from './Sidebar';
import React from 'react';



function Profile({ handleCardClick, handleAddItemModal, weatherData, cardsList, handleEditProfileModal, handleLogout, handleLikeClick }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="profile">
            <Sidebar 
                userName={currentUser.name} 
                avatar={currentUser.avatar}
                handleEditProfileModal={handleEditProfileModal}
                handleLogout={handleLogout} 
            />
            <ClothesSection 
                handleCardClick={handleCardClick}
                handleAddItem={handleAddItemModal}
                cardsList={cardsList}
                handleLikeClick={handleLikeClick}
            />
        </main>
    );
}

export default Profile;