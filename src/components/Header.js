import React from 'react';
import '../blocks/Header.css';
import logo from '../images/logo.png';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Header({ weatherData, handleAddItemModal, handleLoginModal, handleRegisterModal, loggedIn }){

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <header className="header">
            <div className="header__left">   
                <Link to="/">   
                    <img className="header__logo" src={logo} alt="logo" />
                </Link> 
                <p className="header__date">{currentDate}, {weatherData.name}</p>
            </div>
            {loggedIn 
                ? (
                    <div className="header__right">
                        <ToggleSwitch />
                        <button className="header__button" onClick={handleAddItemModal}>+ Add clothes</button>
                        <p className="header__profile-name">{currentUser.name}</p>
                        <Link to="/profile">    
                            {currentUser.avatar 
                                ? <img className="header__profile-avatar" src={currentUser.avatar} alt="avatar" />
                                : <div className="header__profile-initial">{currentUser.name.charAt(0)}</div>
                            }
                        </Link>
                    </div>
                )
                : (
                    <div className="header__right">
                        <ToggleSwitch />
                        <button className="header__profile-signup" onClick={handleRegisterModal}>Sign Up</button>
                        <button className="header__profile-signin" onClick={handleLoginModal}>Log In</button>
                    </div>
                )
            }
        </header>
    );
}

export default Header;