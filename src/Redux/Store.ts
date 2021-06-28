import { combineReducers, createStore } from "redux";
import { ArticleReducer } from "./ArticleState";
import { authReducer } from './AuthState';
import { FlightReducer } from "./FlightsState";
import { OrderFlightsReducer } from "./OrderFlightsState";

const reducers = combineReducers({ authState: authReducer, flightsState: FlightReducer, articleState: ArticleReducer, OrderFlightsState: OrderFlightsReducer });
const store = createStore(reducers);

export default store;