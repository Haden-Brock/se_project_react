import '../blocks/modal.css';
import '../blocks/form.css';
import { Link } from 'react-router-dom';

function ModalWithForm({isOpen, name, title, buttonText, redirect, buttonAlt, onClose, handleSubmit, handleModalChange, children}) {
    return (
        <div className={isOpen ? `modal modal_type_${name}` : `modal modal_type_${name} modal_hidden`}>
            <div className="modal__form-container">
                <button className="modal__form-exit" onClick={onClose} type="button"></button>
                <h3 className="modal__form-title">{title}</h3>
                <form className="form" name={name} onSubmit={handleSubmit}>
                    {children}
                    <div className="form__buttons">
                        <button className="form__submit" type="submit">{buttonText}</button>
                        {redirect && (
                            <Link to={redirect} className="form__redirect" onClick={handleModalChange}>{buttonAlt}</Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;