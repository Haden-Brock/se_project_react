import '../blocks/App.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import AddItemModal from './AddItemModal';
import ItemModal from './ItemModal';
import Profile from './Profile';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import EditProfileModal from './EditProfileModal';
import ProtectedRoute from './ProtectedRoute';
import { getWeatherData, parseDataObj } from '../utils/weatherAPI';
import { apiKey, location, MODAL_TYPE} from '../utils/constants';
import { getClothingData, addClothingItem, deleteClothingItem, editProfile, likeCard, dislikeCard } from '../utils/api';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeCard, setActiveCard] = React.useState({});
  const [activeModal, setActiveModal] = React.useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState("F");
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(()=> {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then(({ data }) => {
          setLoggedIn(true);
          setCurrentUser(data);
          history.push('/profile');
        })
    } else {
      history.push('/');
    }
  }, []);
    
  React.useEffect(() => {
    getWeatherData(apiKey, location)
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

  const handleEditModal = () => {
    setActiveModal(MODAL_TYPE.EDIT);
  }

  const handleCardDelete = (card) => {
    deleteClothingItem(card._id)
      .then(() => {
        setClothingCards(state => state.filter(item => item._id !== card._id));
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleAddItemModal = () => {
    setActiveModal(MODAL_TYPE.ADD);
  }

  const handleLoginModal = () => {
    setActiveModal(MODAL_TYPE.LOGIN);
    history.push('/signin');
  }

  const handleRegisterModal = () => {
    setActiveModal(MODAL_TYPE.REGISTER);
    history.push('signup');
  }

  const handleLogin = (user) => {
    if (!user.email || !user.password) {
      return;
    }

    auth.authorize(user)
      .then((authUser) => {
        if (authUser.token) {
          auth.getContent(authUser.token)
            .then(({ data }) => {
              setLoggedIn(true);
              setCurrentUser(data);
              history.push('/profile');
            })
        }
      })
  }

  const handleLikeClick = (cardId, isLiked, user) => {
    const userId = user._id;
    if (isLiked) {
      dislikeCard(cardId, userId)
        .then((updatedCard) => {
          setClothingCards((cards) => cards.map((c) => (c._id === cardId ? updatedCard : c)));
        })
        .catch((err) => console.log(err));
    } else {
      likeCard(cardId, userId)
        .then((updatedCard) => {
          setClothingCards((cards) => cards.map((c) => (c._id === cardId ? updatedCard : c)));
        })
        .catch((err) => console.log(err));
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  const handleRegister = ({ email, password, userName, avatar} ) => {
    const newUser = {};
    newUser.email = email;
    newUser.password = password;
    newUser.name = userName;
    if (avatar) {
      newUser.avatar = avatar;
    }
    
    auth.register(newUser)
      .then((user) => {
        return handleLogin(user);
      })
  }

  const handleAddItemSubmit = ({ name, weather, imageUrl }) => {
    const item = { 
      name: name, 
      weather: weather, 
      imageUrl: imageUrl
    };
    
    addClothingItem(item)
      .then((item) => {
        setClothingCards([...clothingCards, item]);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const userUpdate = {...currentUser, name: name, avatar: avatar};
    
    editProfile(userUpdate)
      .then((res) => {
        setCurrentUser(res);
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <Header 
            weatherData={ weatherData } 
            handleAddItemModal={handleAddItemModal}
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            loggedIn={loggedIn}
          />
          <Switch>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Profile 
                handleCardClick={handleCardClick}
                handleAddItemModal={handleAddItemModal}
                cardsList={clothingCards}
                handleEditProfileModal={handleEditModal}
                handleLogout={handleLogout}
                handleLikeClick={handleLikeClick}
              />
            </ProtectedRoute>
            <Route path="/signin">
              {activeModal === MODAL_TYPE.LOGIN && (
                <LoginModal
                  isOpen={activeModal === MODAL_TYPE.LOGIN}
                  handleLogin={handleLogin}
                  onModalRedirect={handleRegisterModal}
                  onClose={closeModal}
                />
              )}
            </Route>
            <Route path="/signup">
              {activeModal === MODAL_TYPE.REGISTER && (
                <RegisterModal
                  isOpen={activeModal === MODAL_TYPE.REGISTER}
                  handleRegister={handleRegister}
                  onModalRedirect={handleLoginModal}
                  onClose={closeModal}
                />
              )}
            </Route>
            <Route exact path="/">
              <Main 
                weatherData={weatherData}
                clothingCards={clothingCards}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                loggedIn={loggedIn}
                currentUser={currentUser}
              />
            </Route>
          </Switch>
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

          {activeModal === MODAL_TYPE.EDIT && (
            <EditProfileModal
              isOpen={activeModal === MODAL_TYPE.EDIT}
              currentUser={currentUser}
              handleEditProfileSubmit={handleEditProfileSubmit}
              onClose={closeModal}
            />
          )}  
        </CurrentTemperatureUnitContext.Provider>  
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
