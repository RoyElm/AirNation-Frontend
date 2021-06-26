import axios from 'axios';
import { OrderFlightModel } from '../../Components/Models/OrderFlightModel';
import { Globals } from '../GlobalServices/Globals';



export async function orderAFlightAsync(orderFlight: OrderFlightModel): Promise<OrderFlightModel> {
    const response = await axios.post<OrderFlightModel>(Globals.orderFlightApiUrl, orderFlight);
    return response.data;
}

export async function getAllOrderedFlightsByUserId(_id: string): Promise<OrderFlightModel[]> {
    const response = await axios.get<OrderFlightModel[]>(Globals.orderFlightApiUrl);
    return response.data
}