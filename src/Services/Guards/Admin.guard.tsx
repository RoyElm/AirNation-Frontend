import React from 'react';
import { Redirect, Route } from "react-router-dom";
import store from "../../Redux/Store";
import { GlobalPaths } from '../GlobalServices/GlobalPaths';

interface AdminGuardInterface {
    component: JSX.Element,
    path: string
}

export function AdminGuard({ component, path }: AdminGuardInterface): JSX.Element {

    const isUserAdmin = () => {
        const auth = store.getState().authState.auth;
        return auth?.role === 'Admin_Role'
    };

    return (
        <Route path={path} render={() => {
            if (isUserAdmin()) return component;
            return <Redirect to={GlobalPaths.homeUrl} />
        }} exact />
    )
};

