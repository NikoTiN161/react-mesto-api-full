import useFormAndValidation from '../hooks/useFormAndValidation';

function Login(props) {

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(values.email, values.password);
    }

    return (
            <form onSubmit={handleSubmit} action="/signin" noValidate name="form-auth" className="form">
                <h2 className="form__header form__header_theme_white">{props.title}</h2>

                <input type="email" id="input-email" required minLength="5" maxLength="40" name="email"
                    placeholder="Email" className="form__input form__input_type_email form__input_theme_white"
                    value={values.email} onChange={handleChange} />
                <span className={`input-name-error form__input-error ${!isValid && 'form__input-error_active'}`}>{errors.email}</span>

                <input type="password" id="input-password" required minLength="6" maxLength="40" name="password"
                    placeholder="Пароль" className="form__input form__input_type_password form__input_theme_white"
                    value={values.password} onChange={handleChange} />
                <span className={`input-password-error form__input-error ${!isValid.password && 'form__input-error_active'}`}>{errors.password}</span>

                <button type="submit" className={`form__save-button form__save-button_theme_white ${!isValid && 'form__button_disabled'}`} disabled={!isValid}>{props.buttonText}</button>
            </form>
    )
}

export default Login;