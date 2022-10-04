import React from 'react';
import WeatherCard from './WeatherCard';
import '../blocks/Main.css';
import '../blocks/ItemCard.css';
import ItemCard from './ItemCard';

function clothesFilter(card, data) {
    if(card.weather === data.type) {
        return true;
    } else {
        return false;
    }
}


function Main({ weatherData, clothingCards, handleCardClick }) {
    const clothingChoices = clothingCards.filter(item => clothesFilter(item, weatherData));
    
    return (
        <main className="main">
            <WeatherCard weatherData={weatherData}/>
            <h3 className="main__header">Today is {weatherData.temp}°F / You may want to wear:</h3>
            <ul className="main__list">
                {clothingChoices.map(
                    (item) => (
                        <ItemCard 
                            clothingItem={item} 
                            key={item._id} 
                            name={item.name} 
                            image={item.link} 
                            weather={item.weather} 
                            onClick={() => {
                                handleCardClick(item)
                            }}
                        />
                    )
                )}
            </ul>
        </main>
    )
}

export default Main;