import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { FlightModel } from "../../Models/FlightModel";
import './FlightRaw.css';
import AirNationPng from '../../../assets/images/AirNationFlight.png';
import { useState } from "react";
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";
import { Severity } from "../../Models/GlobalTypes";
import store from "../../../Redux/Store";
import { AuthModel } from "../../Models/AuthModel";
import { OrderFlightModel } from "../../Models/OrderFlightModel";
import { orderAFlightAsync } from "../../../Services/Axios_Services/Order_Flight.service";


function FlightRaw(flight: FlightModel): JSX.Element {

    const [ticketAmount, setTicketAmount] = useState<number>(1)
    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const handleAlertOpen = (message: string, severity: Severity) => {
        setAlertOpen(true)
        setMessageAlert({ message, severity })
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTicketAmount(event.target.value as number);
    }

    const HandleSubmitBookFlight = async () => {
        try {
            const { auth } = store.getState().authState;
            if (!auth?.token) return handleAlertOpen(`You have to be logged in!`, "warning");
            const newOrderFlight = createNewOrder(auth);
            await orderAFlightAsync(newOrderFlight);
            handleAlertOpen(`Flight to ${flight.toLocation} has been booked`, "success");
        } catch (error) {
            handleAlertOpen(error.message, "error");
        }
    }

    const createNewOrder = (auth: AuthModel) => {
        const newOrderFlight = new OrderFlightModel();
        newOrderFlight.flightId = flight._id;
        newOrderFlight.ticketsAmount = ticketAmount;
        newOrderFlight.userId = auth._id;
        newOrderFlight.totalPrice = ticketAmount * flight.price;
        return newOrderFlight;
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
                <TableCell align="center">
                    <select defaultValue={ticketAmount} className="selectAmount" onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button onClick={HandleSubmitBookFlight}>Book Flight</button>
                </TableCell>
            </TableRow>
            <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert} />
        </>
    );
}

export default FlightRaw;
