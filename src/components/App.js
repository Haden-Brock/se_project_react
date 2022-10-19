import '../blocks/App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import AddItemModal from './AddItemModal';
import ItemModal from './ItemModal';
import Profile from './Profile';
import { getWeatherData, parseDataObj } from '../utils/weatherAPI';
import { apiKey, parsedLocation, MODAL_TYPE} from '../utils/constants';
import { getClothingData, addClothingItem, deleteClothingItem } from '../utils/api';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import { Route } from 'react-router-dom';

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeCard, setActiveCard] = React.useState({});
  const [activeModal, setActiveModal] = React.useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState("F");
    
  React.useEffect(() => {
    getWeatherData(apiKey, parsedLocation)
      .then((data) => {
        setWeatherData(parseDataObj(data));
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    getClothingData()
      .then((data) => {
        setClothingCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  const handleCardClick = (card) => {
    setActiveCard(card);
    setActiveModal(MODAL_TYPE.ITEM);
  }

  const handleCardDelete = (card) => {
    deleteClothingItem(card.id)
      .then(() => {
        setClothingCards(state => state.filter(item => item.id !== card.id));
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleAddItemModal = () => {
    setActiveModal(MODAL_TYPE.ADD);
  }

  const handleAddItemSubmit = ({name, weather, imageUrl}) => {
    const id = Math.random().toFixed(4)*10000;
    const item = {
      id: id, 
      name: name, 
      weather: weather, 
      imageUrl: imageUrl
    };
    
    addClothingItem(item)
      .then((item) => {
        setClothingCards([item, ...clothingCards]);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  const closeModal = () => {
    setActiveModal("");
  }

  React.useEffect(() => {
    const handleEsc = (evt) => {
      if(evt.key === 'Escape'){
        closeModal();
      }
    }
    
    if(activeModal){
      window.addEventListener('keydown', handleEsc);
    }

    return () => {window.removeEventListener('keydown', handleEsc)};
  }, [activeModal]);                                       

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F" ? setCurrentTemperatureUnit("C") : setCurrentTemperatureUnit("F");
  }


  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header 
          weatherData={ weatherData } 
          openModal={() => {
            setActiveModal(MODAL_TYPE.ADD);
          }}
        />
        
        <Route exact path="/">
          <Main 
            weatherData={weatherData}
            clothingCards={clothingCards}
            handleCardClick={handleCardClick}
          />
        </Route>

        <Route path="/profile">
          <Profile 
            handleCardClick={handleCardClick}
            handleAddItemModal={handleAddItemModal}
            cardsList={clothingCards}
          />
        </Route>

        <Footer />

        {activeModal === MODAL_TYPE.ADD && (
          <AddItemModal 
            isOpen={activeModal === MODAL_TYPE.ADD}
            onAddItem={handleAddItemSubmit}
            onClose={closeModal}
          />
        )}

        {activeModal === MODAL_TYPE.ITEM && (
          <ItemModal
            isOpen={activeModal === MODAL_TYPE.ITEM}
            card={activeCard}
            onClose={closeModal}
            handleCardDelete={handleCardDelete}
          />
        )}  
      </CurrentTemperatureUnitContext.Provider>  
    </div>
  );
}

export default App;
