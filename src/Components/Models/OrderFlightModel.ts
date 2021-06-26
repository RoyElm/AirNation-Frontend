import { FlightModel } from "./FlightModel";

export class OrderFlightModel {
    public _id: string
    public userId: string;
    public flightId: string;
    public ticketsAmount: number;
    public totalPrice: number;
    public flight: FlightModel;
}