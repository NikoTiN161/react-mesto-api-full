import React, { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        props.handleClickSubmit();
        props.onUpdateAvatar({
            link: values.link,
        });
    }

    useEffect(() => {
        resetForm({ link: '' });
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="update-avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            isValid={isValid}
            onClickOverlay={props.onClickOverlay}
            buttonText={props.isSubmitting ? "Сохранение..." : "Сохранить"}
            onSubmit={handleSubmit}
        >
            <input value={values.link || ''} onChange={handleChange} type="url" id="input-url" required name="link" placeholder="Ссылка на картинку"
                className="form__input form__input_type_link" />
            <span className={`input-url-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.link}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;