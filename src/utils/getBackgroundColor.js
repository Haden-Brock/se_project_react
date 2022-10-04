function getBackgroundColor(weatherData) {
    if(!weatherData.isDay) {
        return 'weathercard-night';
    } else if (weatherData.weatherName === 'sunny' || weatherData.weatherName === 'cloudy') {
        return 'weathercard-blueday';
    } else {
        return 'weathercard-greyday';
    }


}

export default getBackgroundColor;