import React, { useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm';


const RegisterModal = ({ isOpen, handleRegister, onModalRedirect, onClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    setAvatar("");
  }, [isOpen]);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleUserNameChange = (evt) => {
    setUserName(evt.target.value);
  }

  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({ email, password, userName, avatar });
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      name='register'
      title='Sign up'
      buttonText='Next'
      redirect='/signin'
      buttonAlt='or Log in'
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleModalChange={onModalRedirect}
      >
        <h4 className="form__label">Email*</h4>
        <input
          className="form__input form__input_type_email"
          name="register-email"
          type="email"
          placeholder="Email"
          minLength="3"
          maxLength="40"
          onChange={handleEmailChange}
          required
        />
        <h4 className="form__label">Password*</h4>
        <input
          className="form__input form__input_type_password"
          name="register-password"
          type="password"
          placeholder="Password"
          minLength="1"
          maxLength="40"
          onChange={handlePasswordChange}
          required
        />
        <h4 className="form__label">Name*</h4>
        <input
          className="form__input form__input_type_userName"
          name="register-userName"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="40"
          onChange={handleUserNameChange}
          required
        />
        <h4 className="form__label">Avatar URL*</h4>
        <input
          className="form__input form__input_type_avatar"
          name="register-avatar"
          type="url"
          placeholder="Avatar URL"
          minLength="1"
          maxLength="40"
          onChange={handleAvatarChange}
        />
      </ModalWithForm>
  )
}

export default RegisterModal;