import '../blocks/App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';
import {getWeatherData, parseDataObj} from '../utils/weatherAPI';
import {defaultClothingItems, apiKey, parsedLocation} from '../utils/constants';

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeCard, setActiveCard] = React.useState({});
  const [activeModal, setActiveModal] = React.useState(""); 
  
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
    setClothingCards(defaultClothingItems)
  }, []);


  const handleCardClick = (card) => {
    setActiveCard(card);
    setActiveModal("item");
    console.log(card + " " + activeModal);
  }

  const closeModal = () => {
    setActiveModal();
  }

  const handleEsc = (evt) => {
    if(evt.key === 'Escape'){
      closeModal();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {window.removeEventListener('keydown', handleEsc)};
  }, []);


  return (
    <div className="App">
      <Header 
        weatherData={ weatherData } 
        openModal={() => {
          setActiveModal('add');
        }}
      />
      <Main 
        weatherData={weatherData}
        clothingCards={clothingCards}
        handleCardClick={handleCardClick}
      />
      <Footer />
      {activeModal === 'add' && (
        <ModalWithForm 
          isOpen={activeModal === 'add'}
          name='add'
          title='New Garment'
          buttonText='Add Garment'
          onClose={closeModal}
        >
          <h4 className="form__label">Name</h4>
          <input 
            className="form__input form__input_type_name"
            name="name"
            type="text"
            placeholder="Name"
            minLength="1"
            maxLength="40"
            required
          />
          <h4 className="form__label">Image</h4>
          <input
            className="form__input form__input_type_image"
            name="image"
            type="url"
            placeholder="Image URL"
            required
          />
          <h4 className="form__label">Select the weather type:</h4>
          <div className="form__radio-container">
            <div className="form__radio">
              <input 
                className="form__input-radio" 
                name="temp"
                value="Hot"
                type="radio"
                id="hot"
              />
              <label className="form__label-radio" for="hot">
              Hot
              </label>
            </div>
            <div className="form__radio">
              <input
                className="form__input-radio"
                name="temp"
                value="Warm"
                type="radio"
                id="warm"
              />
              <label className="form__label-radio" for="warm">
              Warm
              </label>
            </div>
            <div className="form__radio">
              <input
                className="form__input-radio"
                name="temp"
                value="Cold"
                type="radio"
                id="cold"
              />
              <label className="form__label-radio" for="cold">
              Cold
              </label>
            </div>
          </div>
        </ModalWithForm> 
      )}
      {activeModal === "item" && (
        <ItemModal
          isOpen={activeModal === "item"}
          card={activeCard}
          onClose={closeModal}
        />
      )}  
        
    </div>
  );
}

export default App;
