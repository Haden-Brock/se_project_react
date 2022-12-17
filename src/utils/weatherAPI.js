import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const getWeatherData = (apiKey, location) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=imperial`)
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
    if(weatherString.includes("sun") || weatherString.includes("clear")) {
        return 'sunny';
    } else if (weatherString.includes("cloud") || weatherString.includes("overcast")) {
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
    const temp_f = data.main.temp.toFixed(1);
    const temp_c = ((data.main.temp - 32) * (5 / 9)).toFixed(1);
    const parsedDataObj = {
        name: data.name, 
        temp: {F: `${temp_f}°F`, C: `${temp_c}°C`},
        weatherName: getWeatherName(data.weather[0].main),
        type: setTemperatureDefinition(data.main.temp),
        isDay: (data.dt > data.sys.sunrise && data.dt < data.sys.sunset)
    };

    return parsedDataObj;
}
export {getWeatherData, setTemperatureDefinition, getWeatherName, parseDataObj};