import React from 'react';
import WeatherCard from './WeatherCard';
import '../blocks/Main.css';
import '../blocks/ItemCard.css';
import ItemCard from './ItemCard';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';

function clothesFilter(card, data) {
    if(card.weather === data.type) {
        return true;
    } else {
        return false;
    }
}


function Main({ weatherData, clothingCards, handleCardClick }) {
    const clothingChoices = clothingCards.filter(item => clothesFilter(item, weatherData));
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);
    
    return (
        <main className="main">
            <WeatherCard weatherData={weatherData}/>
            <h3 className="main__header">Today is {weatherData.temp?.[currentTemperatureUnit]} / You may want to wear:</h3>
            <ul className="main__list">
                {clothingChoices.map(
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
                    )
                )}
            </ul>
        </main>
    )
}

export default Main;