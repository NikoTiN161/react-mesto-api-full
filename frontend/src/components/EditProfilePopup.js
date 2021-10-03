import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {

    const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation();

    const value = useContext(CurrentUserContext);

    useEffect(() => {
        if (value.currentUser.name !== '' && value.currentUser.about !== '') {
            setValues({ ...values, name: value.currentUser.name, about: value.currentUser.about });
            setIsValid(true);
        }
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.handleClickSubmit();
        props.onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            isValid={isValid}
            onClickOverlay={props.onClickOverlay}
            buttonText={props.isSubmitting ? "Сохранение..." : "Сохранить"}
            onSubmit={handleSubmit}
        >
            <input type="text" id="input-name" required minLength="2" maxLength="40" name="name"
                placeholder="Имя профиля" className="form__input form__input_type_name"
                value={values.name || ''} onChange={handleChange} />
            <span className={`input-name-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.name}</span>
            <input type="text" id="input-description" required minLength="2" maxLength="200" name="about"
                placeholder="Описание профиля" className="form__input form__input_type_description"
                value={values.about || ''} onChange={handleChange} />
            <span className={`input-description-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;