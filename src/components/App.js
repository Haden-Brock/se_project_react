import '../blocks/App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import AddItemModal from './AddItemModal';
import ItemModal from './ItemModal';
import Profile from './Profile';
import { getWeatherData, parseDataObj } from '../utils/weatherAPI';
import { apiKey, parsedLocation} from '../utils/constants';
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
    setActiveModal("item");
    console.log(card);
  }

  const handleCardDelete = (card) => {
    console.log(card);
    deleteClothingItem(card);
    const newClothingCards = clothingCards.filter(item => item.id !== card);
    setClothingCards(newClothingCards);
    
    
    closeModal();
  }

  const handleAddItemModal = () => {
    setActiveModal("add");
  }

  const handleAddItemSubmit = ({name, weather, imageUrl}) => {
    const id = Math.random().toFixed(4)*10000;
    const item = {
      id: id, 
      name: name, 
      weather: weather, 
      imageUrl: imageUrl
    };

    setClothingCards([item, ...clothingCards]);

    addClothingItem({ id, name, weather, imageUrl })
    
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
    
    window.addEventListener('keydown', handleEsc);
    return () => {window.removeEventListener('keydown', handleEsc)};
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F" ? setCurrentTemperatureUnit("C") : setCurrentTemperatureUnit("F");
  }


  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header 
          weatherData={ weatherData } 
          openModal={() => {
            setActiveModal('add');
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

        {activeModal === "add" && (
          <AddItemModal 
            isOpen={activeModal === "add"}
            onAddItem={handleAddItemSubmit}
            onClose={closeModal}
          />
        )}

        {activeModal === "item" && (
          <ItemModal
            isOpen={activeModal === "item"}
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
