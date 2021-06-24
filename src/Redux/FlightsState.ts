import { FlightModel } from "../Components/Models/FlightModel";

// Flight State: 
export class FlightState {
    public flights: FlightModel[] = [];
}

// Flight Action Types: 
export enum FlightActionType {
    FlightsDownloaded = "FlightsDownloaded",
    FlightAdded = "FlightAdded",
    FlightEdited = "FlightEdited",
    FlightDeleted = "FlightDeleted",
}

// Flight Action: 
export interface FlightAction {
    type: FlightActionType;
    payload?: any;
}

//Flight Action Creators 
export function FlightDownloadedAction(flights: FlightModel[]): FlightAction {
    return { type: FlightActionType.FlightsDownloaded, payload: flights };
}

export function FlightAddedAction(flight: FlightModel): FlightAction {
    return { type: FlightActionType.FlightAdded, payload: flight };
}

export function FlightEditedAction(flight: FlightModel): FlightAction {
    return { type: FlightActionType.FlightEdited, payload: flight };
}

export function FlightDeletedAction(_id: string): FlightAction {
    return { type: FlightActionType.FlightDeleted, payload: _id };
}

// Flight Reducer: 
export function FlightReducer(
    currentState: FlightState = new FlightState(),
    action: FlightAction): FlightState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case FlightActionType.FlightsDownloaded: {
            newState.flights = action.payload;
            break;
        }
        case FlightActionType.FlightAdded: {
            newState.flights.push(action.payload);
            break;
        }
        case FlightActionType.FlightEdited: {
            const flightIndex = newState.flights.findIndex(action.payload._id)
            newState.flights[flightIndex] = action.payload;
            break;
        }
        case FlightActionType.FlightDeleted: {
            const flightIndex = newState.flights.findIndex(flight => flight._id === action.payload);
            newState.flights.splice(flightIndex, 0);
            break;
        }
    }

    return newState; // Return the newState.
}
