import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function ProtectedRoute({ component: Component, ...props }) {

    const value = React.useContext(CurrentUserContext);
    return (
        <Route>
            {() =>
                value.loggedIn ? <Component {...props} /> : <Redirect to="/sing-in" />
            }
        </Route>
    );
};

export default ProtectedRoute;