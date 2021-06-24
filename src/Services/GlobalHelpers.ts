import axios from 'axios';
import store from "../Redux/Store";
import { authLoggedOutAction } from "../Redux/AuthState";

//Global functions helper each component can reusable that functions.

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser() {
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
    return;
}
