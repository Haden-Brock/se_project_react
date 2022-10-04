import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const getWeatherData = (apiKey, parsedLocation) => {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${parsedLocation}&days=1`)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error ${res.status}`);
        })
}

function setTemperatureDefinition(temp) {
    if(temp > 85) {
        return 'hot';
    } else if (temp >= 65 && temp <= 85) {
        return 'warm';
    } else {
        return 'cold';
    }
}

function getWeatherName(condition) {
    const weatherString = condition.toLowerCase();
    if(weatherString.includes("sunny") || weatherString.includes("clear")) {
        return 'sunny';
    } else if (weatherString.includes("cloudy") || weatherString.includes("overcast")) {
        return 'cloudy';
    } else if (weatherString.includes("fog") || weatherString.includes("mist")) {
        return 'fog';
    } else if (weatherString.includes("rain") || weatherString.includes("drizzle")) {
        return 'rain';
    } else if (weatherString.includes("snow") || weatherString.includes("sleet") || weatherString.includes("ice")) {
        return 'snow';
    } else {
        return 'storm';
    }
}

function parseDataObj(data) {
    const parsedDataObj = {
        name: data.location.name, 
        temp: data.current.temp_f,
        weatherName: getWeatherName(data.current.condition.text),
        type: setTemperatureDefinition(data.current.temp_f),
        isDay: !!data.current.is_day   
    };

    return parsedDataObj;
}
export {getWeatherData, setTemperatureDefinition, getWeatherName, parseDataObj};