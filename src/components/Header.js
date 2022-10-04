import React from 'react';
import '../blocks/Header.css';
import avatar from '../images/avatar.svg';
import logo from '../images/logo.png';

function Header({ weatherData, openModal }){

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            <div className="header__left">   
                <img className="header__logo" src={logo} alt="logo" />
                <p className="header__date">{currentDate}, {weatherData.name}</p>
            </div>
            <div className="header__right">
                <button className="header__button" onClick={openModal}>+ Add clothes</button>
                <p className="header__profile-name">Terrence Tegegne</p>
                <img className="header__profile-avatar" src={avatar} alt="avatar" />
            </div>
        </header>
    );
}

export default Header;