import '../blocks/ToggleSwitch.css';
import { useState } from 'react';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import React from 'react';

function ToggleSwitch() {
    const [isChecked, setIsChecked] = useState(false);

    const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(CurrentTemperatureUnitContext);

    const handleCheckedChange = () => {
        setIsChecked(!isChecked);
        handleToggleSwitchChange();
    };

    return (
        <div className="toggle">
            <label className="toggle__label" htmlFor="slider">
                <input className="toggle__input" type="checkbox" id="slider" onChange={handleCheckedChange} />
                <div className="toggle__slider circle">
                    <p className={`temp ${isChecked && 'temp_active'}`}>F</p>
                    <p className={`temp ${!isChecked && 'temp_active'}`}>C</p>
                </div>
            </label>
        </div>
    )
}

export default ToggleSwitch;


