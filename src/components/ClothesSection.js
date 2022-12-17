import '../blocks/ClothesSection.css';
import React from 'react';
import ItemCard from './ItemCard';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ClothesSection = ({ handleCardClick, handleAddItem, handleLikeClick, cardsList }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const filteredCards = cardsList.filter(card => card.owner === currentUser._id);
    return (
        <section className="clothes">
            <div className="clothes__content">
                <p className="clothes__text">Your items</p>
                <button className="clothes__add-button" onClick={handleAddItem}>+ Add new</button>
            </div>
            <div className="clothes__list">
                {filteredCards.map(
                    (item) => (
                        <ItemCard 
                            clothingItem={item}
                            key={item._id}
                            handleLikeClick={handleLikeClick}
                            onClick={() => {
                                handleCardClick(item)
                            }}
                    />
                ))}
            </div>
        </section>
    )
}

export default ClothesSection;