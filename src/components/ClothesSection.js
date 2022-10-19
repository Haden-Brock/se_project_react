import '../blocks/ClothesSection.css';
import React from 'react';
import ItemCard from './ItemCard';

function ClothesSection({ handleCardClick, handleAddItem, cardsList }) {
    return (
        <section className="clothes">
            <div className="clothes__content">
                <p className="clothes__text">Your items</p>
                <button className="clothes__add-button" onClick={handleAddItem}>+ Add new</button>
            </div>
            <div className="clothes__list">
                {cardsList.map(
                    (item) => (
                        <ItemCard 
                            clothingItem={item}
                            key={item.id}
                            name={item.name}
                            image={item.imageUrl}
                            weather={item.weather}
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