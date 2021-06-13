import axios from 'axios';
import store from "../Redux/Store";
import { authLoggedOutAction, authRegisteredAction } from "../Redux/AuthState";
import { AuthModel } from "../Components/Models/AuthModel";
import { Globals } from './Globals';

//Global functions helper each component can reusable that functions.

export async function handleRegisterUserAsync(auth: AuthModel) {
    const response = await axios.post<AuthModel>(Globals.authUrl + "register", auth);
    const userRegistered = response.data;
    store.dispatch(authRegisteredAction(userRegistered));
    authorizationHeader(userRegistered);
    return store.getState().authState.auth;
}

export async function handleLoginUserAsync(auth: AuthModel) {
    const response = await axios.post<AuthModel>(Globals.authUrl + "login", auth);
    const userLoggedIn = response.data;
    store.dispatch(authRegisteredAction(userLoggedIn));
    authorizationHeader(userLoggedIn);
    return store.getState().authState.auth;
}


//Handling header authorization adding user token.
export function authorizationHeader(userLogged: AuthModel) {
    axios.defaults.headers["authorization"] = `Bearer ${userLogged.token}`;
    return;
}

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser() {
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
    return;
}
