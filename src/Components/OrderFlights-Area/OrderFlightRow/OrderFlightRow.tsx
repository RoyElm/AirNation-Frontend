import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import "./OrderFlightRow.css";
import AirNationPng from '../../../assets/images/AirNationFlight.png';
import { OrderFlightModel } from "../../Models/OrderFlightModel";

function OrderFlightRow(orderFlight: OrderFlightModel): JSX.Element {
    return (
        <TableRow className="FlightRaw">
            <TableCell padding="none">
                <img src={AirNationPng} alt='AirNationPng' />
            </TableCell>
            <TableCell  >
                {orderFlight.flight.fromLocation}
            </TableCell>
            <TableCell >{orderFlight.flight.fromLocation}</TableCell>
            <TableCell >{orderFlight.flight.duration}</TableCell>
            <TableCell >{new Date(orderFlight.flight.date).toLocaleDateString('he', { dateStyle: 'short' })}</TableCell>
            <TableCell >{orderFlight.ticketsAmount} </TableCell>
            <TableCell >{orderFlight.totalPrice} ₪ </TableCell>
        </TableRow>
    );
}

export default OrderFlightRow;
