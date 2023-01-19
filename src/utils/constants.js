import sunny_day from "../images/sunny_day.png";
import cloudy_day from "../images/cloudy_day.png";
import rain_day from "../images/rain_day.png";
import storm_day from "../images/storm_day.png";
import snow_day from "../images/snow_day.png";
import fog_day from "../images/fog_day.png";
import sunny_night from "../images/sunny_night.png";
import cloudy_night from "../images/cloudy_night.png";
import rain_night from "../images/rain_night.png";
import storm_night from "../images/storm_night.png";
import snow_night from "../images/snow_night.png";
import fog_night from "../images/fog_night.png";
const apiKey = '259c506dbc8fdea3b9d42c71c83e0007';
const location = {
    latitude: 30.4877266, 
    longitude: -98.0007118
}
const parsedLocation = `${location.latitude},${location.longitude}`;
 
const weatherConditions = {
    sunny_day, 
    cloudy_day, 
    rain_day, 
    storm_day, 
    snow_day, 
    fog_day, 
    sunny_night,
    cloudy_night,
    rain_night, 
    storm_night,
    snow_night,
    fog_night,
}

const weatherIconSelector = ['weather__icon-one', 'weather__icon-two'];

const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://api.hadenzbrock.students.nomoredomainssbs.ru'
    : 'http://localhost:3001';

const MODAL_TYPE = {
  ADD: "add", 
  ITEM: "item",
  LOGIN: "login", 
  REGISTER: "register",
  EDIT: "edit"
};

export {
    apiKey, 
    location, 
    parsedLocation, 
    weatherConditions, 
    weatherIconSelector, 
    baseUrl, MODAL_TYPE };