import axios from 'axios';
import { AuthModel } from '../../Components/Models/AuthModel';
import { authLoggedOutAction, authRegisteredAction } from '../../Redux/AuthState';
import store from '../../Redux/Store';
import { Globals } from '../GlobalServices/Globals';

//Global functions helper each component can reusable that functions.

export async function handleRegisterUserAsync(auth: AuthModel): Promise<AuthModel> {
    const response = await axios.post<AuthModel>(Globals.authApiUrl + "register", auth);
    const userRegistered = response.data;
    return savingUserInStoreAndHeader(userRegistered);
}

export async function handleLoginUserAsync(auth: AuthModel): Promise<AuthModel> {
    const response = await axios.post<AuthModel>(Globals.authApiUrl + "login", auth);
    const userLoggedIn = response.data;
    return savingUserInStoreAndHeader(userLoggedIn);
}

function savingUserInStoreAndHeader(user: AuthModel): AuthModel {
    store.dispatch(authRegisteredAction(user));
    authorizationHeader(user);
    return store.getState().authState.auth;
}

//Handling header authorization adding user token.
export function authorizationHeader(userLogged: AuthModel): void {
    axios.defaults.headers["authorization"] = `Bearer ${userLogged.token}`;
}

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser(): void {
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
}
