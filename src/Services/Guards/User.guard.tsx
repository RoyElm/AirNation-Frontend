import React from 'react';
import { Redirect, Route } from "react-router-dom";
import store from "../../Redux/Store";
import { GlobalPaths } from '../GlobalServices/GlobalPaths';

interface UserGuardInterface {
    component: JSX.Element,
    path: string
}

export function UserGuard({ component, path }: UserGuardInterface): JSX.Element {

    const isUserLoggedIn = () => {
        const auth = store.getState().authState.auth;
        return auth?.token.length;
    };

    return (
        <Route path={path} render={() => {
            if (isUserLoggedIn()) return component;
            return <Redirect to={GlobalPaths.homeUrl} />
        }} exact />
    )
};

