import axios from 'axios';
import { OrderFlightModel } from '../../Components/Models/OrderFlightModel';
import { OrderFlightAddedAction, OrderFlightsDownloadedAction } from '../../Redux/OrderFlightsState';
import store from '../../Redux/Store';
import { Globals } from '../GlobalServices/Globals';



export async function orderAFlightAsync(orderFlight: OrderFlightModel): Promise<OrderFlightModel> {
    const response = await axios.post<OrderFlightModel>(Globals.orderFlightApiUrl, orderFlight);
    const orderedFlight = response.data;
    store.dispatch(OrderFlightAddedAction(orderedFlight))
    return orderedFlight;
}

export async function getAllOrderedFlightsByUserId(_id: string): Promise<OrderFlightModel[]> {
    if (!store.getState().OrderFlightsState.OrderFlights.length) {
        const response = await axios.get<OrderFlightModel[]>(Globals.orderFlightApiUrl + _id);
        const orderedFlights = response.data;
        store.dispatch(OrderFlightsDownloadedAction(orderedFlights))
    }
    return store.getState().OrderFlightsState.OrderFlights
}