import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { FlightModel } from "../../Models/FlightModel";
import './FlightRaw.css';
import AirNationPng from '../../../assets/images/AirNationFlight.png';
import { useState } from "react";
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";
import { Severity } from "../../Models/GlobalTypes";
import BookAFlight from "../BookAFlight/BookAFlight";


function FlightRaw(flight: FlightModel): JSX.Element {

    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const handleAlertOpen = (message: string, severity: Severity) => {
        setMessageAlert({ message, severity })
        setAlertOpen(true)
    }

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
            <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert} />
        </>
    );
}

export default FlightRaw;
