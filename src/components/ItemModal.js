import '../blocks/modal.css';
import '../blocks/ItemModal.css';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ItemModal = ({isOpen, card= {}, onClose, handleCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwner = (card.owner === currentUser._id);
    console.log(card);
    const deleteButtonClassName = (
        `modal__delete ${isOwner ? 'modal__delete_visible' : 'modal__delete_hidden'}`
    );

    const handleDeleteClick = (evt) => {
        evt.preventDefault();
        handleCardDelete(card);
    }

    return (
        <div className={isOpen ? "modal modal_type_item" : "modal modal_type_item modal_hidden"}>
            <div className="modal__container">
                <button className="modal__exit" onClick={onClose} type="button"></button>
                <img 
                    className="modal__image"
                    src={card.imageUrl}
                    alt={card.name}
                />
                <h3 className="modal__name">{card.name}</h3>
                <p className="modal__weather">Weather: {card.weather}</p>
                <button className={deleteButtonClassName}
                    onClick={handleDeleteClick}>Delete item</button>
            </div>
        </div>
    );
}

export default ItemModal;