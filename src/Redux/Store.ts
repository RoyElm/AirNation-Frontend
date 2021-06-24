import { combineReducers, createStore } from "redux";
import { authReducer } from './AuthState';
import { FlightReducer } from "./FlightsState";

const reducers = combineReducers({ authState: authReducer, flightsState: FlightReducer });
const store = createStore(reducers);

export default store;