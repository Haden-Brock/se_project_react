import React, { useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm';

const AddItemModal = ({ isOpen, onAddItem, onClose}) => {

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [weather, setWeather] = useState("");

    useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
    }, [isOpen]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleImageUrlChange = (evt) => {
        setImageUrl(evt.target.value);
    }

    const handleWeatherChange = (evt) => {
        setWeather(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddItem({ name, weather, imageUrl });
    }

    return (
        <ModalWithForm 
            isOpen={isOpen}
            name='add'
            title='New Garment'
            buttonText='Add Garment'
            onClose={onClose}
            handleSubmit={handleSubmit}
          >
            <h4 className="form__label">Name</h4>
            <input 
              className="form__input form__input_type_name"
              name="name"
              type="text"
              placeholder="Name"
              minLength="1"
              maxLength="40"
              onChange={handleNameChange}
              value={name}
              required
            />
            <h4 className="form__label">Image</h4>
            <input
              className="form__input form__input_type_image"
              name="image"
              type="url"
              placeholder="Image URL"
              onChange={handleImageUrlChange}
              value={imageUrl}
              required
            />
            <h4 className="form__label">Select the weather type:</h4>
            <div className="form__radio-container">
              <div className="form__radio">
                <input 
                  className="form__input-radio" 
                  name="temp"
                  value="hot"
                  type="radio"
                  id="hot"
                  onChange={handleWeatherChange}
                />
                <label className="form__label-radio" htmlFor="hot">
                Hot
                </label>
              </div>
              <div className="form__radio">
                <input
                  className="form__input-radio"
                  name="temp"
                  value="warm"
                  type="radio"
                  id="warm"
                  onChange={handleWeatherChange}
                />
                <label className="form__label-radio" htmlFor="warm">
                Warm
                </label>
              </div>
              <div className="form__radio">
                <input
                  className="form__input-radio"
                  name="temp"
                  value="cold"
                  type="radio"
                  id="cold"
                  onChange={handleWeatherChange}
                />
                <label className="form__label-radio" htmlFor="cold">
                Cold
                </label>
              </div>
            </div>
          </ModalWithForm> 
    )
}

export default AddItemModal;