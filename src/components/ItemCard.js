import '../blocks/ItemCard.css';

function ItemCard(props) {
    return (
        <li className="card">
            <div className="card__title">
                <h3 className="card__title-text">{props.name}</h3>
            </div>
            <img 
                src={props.image}
                className="card__image"
                alt={props.name}
                onClick={props.onClick}
            />
        </li>
    )
}

export default ItemCard;