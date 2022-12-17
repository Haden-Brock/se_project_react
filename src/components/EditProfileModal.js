import React, { useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm';

const EditProfileModal = ({ isOpen, currentUser, handleEditProfileSubmit, onClose}) => {
  
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditProfileSubmit({ name, avatar });
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      name='edit-profile'
      title='Change profile data'
      buttonText='Save changes'
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <h4 className="form__label">Name*</h4>
      <input
        className="form__input form__input_type_edit-name"
        name="edit-name"
        type="text"
        placeholder={currentUser.name}
        minLength="1"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <h4 className="form__label">Avatar</h4>
      <input
        className="form__input form__input_type_edit-avatar"
        name="edit-avatar"
        type="url"
        placeholder={currentUser.avatar}
        minLength="1"
        maxLength="40"
        onChange={handleAvatarChange}
      />
    </ModalWithForm>
  )
}

export default EditProfileModal;