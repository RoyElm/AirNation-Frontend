import axios from 'axios';
import store from "../Redux/Store";
import { authLoggedOutAction } from "../Redux/AuthState";
import { AuthModel } from "../Components/Models/AuthModel";

//Global functions helper each component can reusable that functions.

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
