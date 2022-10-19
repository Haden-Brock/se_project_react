import '../blocks/WeatherCard.css';
import getWeatherIcon from '../utils/getWeatherIcon';
import getBackgroundColor from '../utils/getBackgroundColor';
import { weatherConditions, weatherIconSelector } from '../utils/constants';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import React from 'react';


function WeatherCard({weatherData}) {
    const backgroundSelector = getBackgroundColor(weatherData);
    const iconArray = getWeatherIcon(weatherData);
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

    return (
        <div className={`weathercard ${backgroundSelector}`}>
            <h3 className="weathercard__temperature">{weatherData.temp?.[currentTemperatureUnit]}</h3>
            <div className="weathercard__icons">
                {iconArray.map((condition, index) => {
                    return (
                        <img 
                            key={condition}
                            className={weatherIconSelector[index]}
                            src={weatherConditions[condition]}
                            alt={condition}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default WeatherCard;