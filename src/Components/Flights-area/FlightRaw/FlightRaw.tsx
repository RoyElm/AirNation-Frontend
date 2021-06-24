import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { FlightModel } from "../../Models/FlightModel";
import './FlightRaw.css';
import AirNationPng from '../../../assets/images/AirNationFlight.png';

function FlightRaw(flight: FlightModel): JSX.Element {
    return (
        <TableRow className="FlightRaw">
            <TableCell padding="none">
                <img src={AirNationPng} alt='AirNationPng' />
            </TableCell>
            <TableCell  >
                {flight.fromLocation}
            </TableCell>
            <TableCell >{flight.toLocation}</TableCell>
            <TableCell >{flight.duration}</TableCell>
            <TableCell >{flight.price} ₪ </TableCell>
            <TableCell >{new Date(flight.date).toLocaleDateString('he', { dateStyle: 'short' })}</TableCell>
            {/* <TableCell align="center">
                <select name="" id="">
                    <option value="1">1</option>
                </select>
                <Button>Order Flight</Button>
            </TableCell> */}

        </TableRow>
    );
}

export default FlightRaw;
