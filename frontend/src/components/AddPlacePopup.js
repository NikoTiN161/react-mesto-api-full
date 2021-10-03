import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.handleClickSubmit();
        props.onAddPlace({
            name: values.name,
            link: values.link,
        });
        
    }
    
    useEffect(() => {
        resetForm({ name: '', link: '' });
    }, [props.isOpen]);
    

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onClickOverlay={props.onClickOverlay}
            isValid={isValid}
            buttonText={props.isSubmitting ? "Сохранение..." : "Сохранить"}
            onSubmit={handleAddPlaceSubmit}
        >
            <input value={values.name || ''} onChange={handleChange} type="text" id="input-title" required minLength="2" maxLength="30" name="name"
                placeholder="Название" className="form__input form__input_type_title" />
            <span className={`input-name-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.name}</span>
            <input value={values.link || ''} onChange={handleChange} type="url" id="input-link" required name="link" placeholder="Ссылка на картинку"
                className="form__input form__input_type_link" />
            <span className={`input-name-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;