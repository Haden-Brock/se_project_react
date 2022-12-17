import '../blocks/ItemCard.css';
import likeButton from '../images/like_button.png';
import dislikeButton from '../images/dislike_button.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

const ItemCard = ({ clothingItem, handleLikeClick, onClick }) => {
    const currentUser = React.useContext(CurrentUserContext);
    let isLiked = false;
    if(clothingItem.likes) {
        isLiked = clothingItem.likes.some(user => user === currentUser._id);
    }
    console.log(isLiked, clothingItem.likes, currentUser._id);
    let isLogged = false;
    if(localStorage.getItem('jwt')) {
        isLogged = true;
    }
    const likeButtonClassName = (
        isLogged ? 'card__like' : 'card__like_hidden'
    );

    const handleLikeToggle = (evt) => {
        evt.preventDefault();
        handleLikeClick(clothingItem._id, isLiked, currentUser);
    }

    return (
        <li className="card">
            <div className="card__top">
                <div className="card__title">
                    <h3 className="card__title-text">{clothingItem.name}</h3>
                </div>
                <img 
                    className={likeButtonClassName} 
                    onClick={handleLikeToggle}
                    src={isLiked ? likeButton : dislikeButton}
                    alt="Like button" 
                />
            </div>
            <img 
                src={clothingItem.imageUrl}
                className="card__image"
                alt={clothingItem.name}
                onClick={onClick}
            />
        </li>
    )
}

export default ItemCard;