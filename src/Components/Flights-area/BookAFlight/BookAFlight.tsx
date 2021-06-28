import { TableCell } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import { orderAFlightAsync } from "../../../Services/Axios_Services/Order_Flight.service";
import { AuthModel } from "../../Models/AuthModel";
import { FlightModel } from "../../Models/FlightModel";
import { Severity } from "../../Models/GlobalTypes";
import { OrderFlightModel } from "../../Models/OrderFlightModel";
import "./BookAFlight.css";

interface BookAFlightInterface {
    flight: FlightModel,
    handleAlertOpen: (message: string, severity: Severity) => void
}

function BookAFlight({ flight, handleAlertOpen }: BookAFlightInterface): JSX.Element {

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTicketAmount(event.target.value as number);
    }

    const [ticketAmount, setTicketAmount] = useState<number>(1);

    const [OrderFlights, setOrderFlights] = useState<OrderFlightModel[]>();

    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const _OrderFlights = store.getState().OrderFlightsState.OrderFlights;
            setOrderFlights(_OrderFlights);
        });
        return unSubscribe;
    }, [])

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
        <TableCell align="center">
            {OrderFlights?.length ?
                <>
                    <select defaultValue={ticketAmount} className="selectAmount" onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button onClick={HandleSubmitBookFlight}>Book Flight</button>
                </>
                :
                <span>Already Booked</span>
            }
        </TableCell>
    );
}

export default BookAFlight;
