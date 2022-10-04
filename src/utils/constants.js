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
const apiKey = '3f21dc6299ff4e80b0c202810220210';
const location = {
    latitude: 30.4877266, 
    longitude: -98.0007118
}
const parsedLocation = `${location.latitude},${location.longitude}`;

const defaultClothingItems = [
    {
      _id: 0,
      name: "Cap",
      weather: "hot",
      link: "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      _id: 1,
      name: "Hoodie",
      weather: "warm",
      link: "https://images.unsplash.com/photo-1579572331145-5e53b299c64e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80",
    },
    {
      _id: 2,
      name: "Jacket",
      weather: "cold",
      link: "https://www.rei.com/media/product/192845",
    },
    {
      _id: 3,
      name: "Sneakers",
      weather: "cold",
      link: "https://assets.hermes.com/is/image/hermesproduct/expert-sneaker--221896ZH92-worn-1-0-0-1000-1000_b.jpg",
    },
    {
      _id: 4,
      name: "T-Shirt",
      weather: "hot",
      link: "https://www.pennlive.com/resizer/e7o66Pu6YAzxTOA7AARGt_L4hic=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/XBUH6UFAPVDTLCPAG6HBZUFQE4.jpg",
    },
    {
      _id: 5,
      name: "Winter coat",
      weather: "cold",
      link: "https://m.media-amazon.com/images/I/71XqHAMkmiL._AC_UX342_.jpg",
    }
  ];


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

export {
    apiKey, 
    location, 
    parsedLocation, 
    defaultClothingItems,
    weatherConditions, 
    weatherIconSelector };