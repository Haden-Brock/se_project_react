import '../blocks/modal.css';
import '../blocks/ItemModal.css';

const ItemModal = ({isOpen, card= {}, onClose}) => {
    return (
        <div className={isOpen ? "modal modal_type_item" : "modal modal_type_item modal_hidden"}>
            <div className="modal__container">
                <button className="modal__exit" onClick={onClose} type="button"></button>
                <img 
                    className="modal__image"
                    src={card.link}
                    alt={card.name}
                />
                <h3 className="modal__name">{card.name}</h3>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
        </div>
    );
}

export default ItemModal;