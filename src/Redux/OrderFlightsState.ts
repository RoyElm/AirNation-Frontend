import { OrderFlightModel } from "../Components/Models/OrderFlightModel";

// Order Flights State: 
export class OrderFlightsState {
    public OrderFlights: OrderFlightModel[] = [];
}

// Order Flights Action Types: 
export enum OrderFlightsActionType {
    OrderFlightsDownloaded = "OrderFlightsDownloaded",
    OrderFlightAdded = "OrderFlightAdded",
    OrderFlightEdited = "OrderFlightEdited",
    OrderFlightDeleted = "OrderFlightDeleted",
}

// Order Flights Action: 
export interface OrderFlightsAction {
    type: OrderFlightsActionType;
    payload?: any;
}

//Order Flights Action Creators 
export function OrderFlightsDownloadedAction(orderFlights: OrderFlightModel[]): OrderFlightsAction {
    return { type: OrderFlightsActionType.OrderFlightsDownloaded, payload: orderFlights };
}

export function OrderFlightAddedAction(orderFlight: OrderFlightModel): OrderFlightsAction {
    return { type: OrderFlightsActionType.OrderFlightAdded, payload: orderFlight };
}

export function OrderFlightEditedAction(orderFlight: OrderFlightModel): OrderFlightsAction {
    return { type: OrderFlightsActionType.OrderFlightEdited, payload: orderFlight };
}

export function deletedOrderFlightAction(_id: string): OrderFlightsAction {
    return { type: OrderFlightsActionType.OrderFlightDeleted, payload: _id };
}

// Order Flights Reducer: 
export function OrderFlightsReducer(
    currentState: OrderFlightsState = new OrderFlightsState(),
    action: OrderFlightsAction): OrderFlightsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case OrderFlightsActionType.OrderFlightsDownloaded: {
            newState.OrderFlights = action.payload;
            break;
        }
        case OrderFlightsActionType.OrderFlightAdded: {
            newState.OrderFlights.push(action.payload);
            break;
        }
        case OrderFlightsActionType.OrderFlightEdited: {
            const orderIndex = newState.OrderFlights.findIndex(orderFlight => orderFlight._id ===action.payload._id)
            newState.OrderFlights[orderIndex] = action.payload;
            break;
        }
        case OrderFlightsActionType.OrderFlightDeleted:{
            const orderIndex = newState.OrderFlights.findIndex(orderFlight => orderFlight._id === action.payload);
            newState.OrderFlights.splice(orderIndex, 1);
            break;
        }

    }

    return newState; // Return the newState.
}
