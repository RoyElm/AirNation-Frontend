import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { FlightModel } from "../../Models/FlightModel";
import './FlightRaw.css';
import AirNationPng from '../../../assets/images/AirNationFlight.png';
import { Severity } from "../../Models/GlobalTypes";
import BookAFlight from "../BookAFlight/BookAFlight";

interface FlightRawInterface {
    flight: FlightModel;
    handleAlertOpen: (message: string, severity: Severity) => void
}

function FlightRaw({ flight, handleAlertOpen }: FlightRawInterface): JSX.Element {
    
    return (
        <>
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
                <BookAFlight flight={flight} handleAlertOpen={handleAlertOpen} />
            </TableRow>
        </>
    );
}

export default FlightRaw;
