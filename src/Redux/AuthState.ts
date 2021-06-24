import { AuthModel } from "../Components/Models/AuthModel";
import { authorizationHeader } from "../Services/Auth.service";

// Auth State: 
export class AuthState {
    public auth: AuthModel = null
    constructor() {
        const auth: AuthModel = JSON.parse(sessionStorage.getItem("auth"));
        if (auth) {
            //after refreshing authorizing user Token.
            authorizationHeader(auth);
            this.auth = auth;
        }
    }
}

// Auth Action Types: 
export enum AuthActionType {
    AuthLoggedIn = "AuthLoggedIn",
    AuthRegistered = "AuthRegistered",
    AuthLoggedOut = "AuthLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

//Auth Action Creators 
export function authLoggedInAction(auth: AuthModel): AuthAction {
    return { type: AuthActionType.AuthLoggedIn, payload: auth };
}

export function authRegisteredAction(auth: AuthModel): AuthAction {
    return { type: AuthActionType.AuthRegistered, payload: auth };
}

export function authLoggedOutAction(): AuthAction {
    return { type: AuthActionType.AuthLoggedOut };
}


// User Reducer: 
export function authReducer(
    currentState: AuthState = new AuthState(),
    action: AuthAction): AuthState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case AuthActionType.AuthRegistered:
        case AuthActionType.AuthLoggedIn:
            newState.auth = action.payload;
            break;

        case AuthActionType.AuthLoggedOut:
            newState.auth = null;
            break;
    }

    sessionStorage.setItem("auth", JSON.stringify(newState.auth));

    return newState; // Return the newState.
}
