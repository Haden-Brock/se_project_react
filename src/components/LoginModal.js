import React, { useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm';


const LoginModal = ({ isOpen, handleLogin, onModalRedirect, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    handleLogin({ email, password });
    setEmail("");
    setPassword("");
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      name='login'
      title='Log In'
      buttonText='Log in'
      redirect='/signup'
      buttonAlt='or Register'
      onClose={onClose}
      handleSubmit={handleSubmit}
      handleModalChange={onModalRedirect}
    >
      <h4 className="form__label">Email</h4>
      <input
        className="form__input form__input_type_login-email"
        name="login-email"
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        required
      />
      <h4 className="form__label">Password</h4>
      <input
        className="form__input form__input_login-password"
        name="login-password"
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        required
      />
    </ModalWithForm>
  )
}

export default LoginModal;