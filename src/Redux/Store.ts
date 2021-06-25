import { combineReducers, createStore } from "redux";
import { ArticleReducer } from "./ArticleState";
import { authReducer } from './AuthState';
import { FlightReducer } from "./FlightsState";

const reducers = combineReducers({ authState: authReducer, flightsState: FlightReducer, articleState: ArticleReducer });
const store = createStore(reducers);

export default store;