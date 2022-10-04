function getWeatherIcon(weatherData) {
    let iconArray = [];
    if(weatherData.weatherName === 'cloudy') {
        iconArray.push("sunny");
        iconArray.push("cloudy");
    } else {
        iconArray.push(weatherData.weatherName);
    }

    let daytimeArray = iconArray.map((string) => {
        if(weatherData.isDay) {
            return string + "_day";
        } else {
            return string + "_night";
        }
    })

    return daytimeArray;
}

export default getWeatherIcon;