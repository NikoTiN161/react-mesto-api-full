import React from 'react';
import { useLocation, Link } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Header(props) {

    const value = React.useContext(CurrentUserContext);

    function renderSwitch(param) {
        switch (param) {
            case '/':
                return (
                    <div>
                        <Link to="/" className="header__email">{value.emailUser}</Link>
                        <Link to="/sign-in" onClick={props.onSignOut} className="header__link">Выйти</Link>
                    </div>
                );
            case '/sign-in':
                return (
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                );
            case '/sign-up':
                return (
                    <Link to="/sign-in" className="header__link">Войти</Link>
                );
            default:
                return (
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                );
        }
    }

    const location = useLocation();

    return (
        <header className="header page__header">
            <Link to={`${value.loggedIn ? '/' : '/sign-in'}`} className="header__logo" />
            {renderSwitch(location.pathname)}
        </header>
    )
}

export default Header;