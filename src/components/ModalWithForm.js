import '../blocks/modal.css';
import '../blocks/form.css';

function ModalWithForm({isOpen, name, title, buttonText, onClose, handleSubmit, children}) {
    return (
        <div className={isOpen ? `modal modal_type_${name}` : `modal modal_type_${name} modal_hidden`}>
            <div className="modal__form-container">
                <button className="modal__form-exit" onClick={onClose} type="button"></button>
                <h3 className="modal__form-title">{title}</h3>
                <form className="form" name={name}>
                    {children}
                    <button className="form__submit" type="submit" onClick={handleSubmit}>{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;