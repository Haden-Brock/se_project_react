import React from 'react';
import '../blocks/Header.css';
import avatar from '../images/avatar.svg';
import logo from '../images/logo.png';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';

function Header({ weatherData, openModal }){

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            <div className="header__left">   
                <Link to="/">   
                    <img className="header__logo" src={logo} alt="logo" />
                </Link> 
                <p className="header__date">{currentDate}, {weatherData.name}</p>
            </div>
            <div className="header__right">
                <ToggleSwitch />
                <button className="header__button" onClick={openModal}>+ Add clothes</button>
                <p className="header__profile-name">Terrence Tegegne</p>
                <Link to="/profile">    
                    <img className="header__profile-avatar" src={avatar} alt="avatar" />
                </Link>
            </div>
        </header>
    );
}

export default Header;