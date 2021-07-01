import { TableCell } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import { deleteOrderFlightAsync, orderAFlightAsync } from "../../../Services/Axios_Services/Order_Flight.service";
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

    const [OrderFlights, setOrderFlights] = useState<OrderFlightModel[]>(store.getState().OrderFlightsState.OrderFlights);
    const [bookedFlight, setBookedFlight] = useState<OrderFlightModel>();

    const isFlightBeenOrdered = useCallback((OrderFlights: OrderFlightModel[]): void => {
        const includes = OrderFlights.filter(orderFlight => orderFlight.flight._id === flight._id);
        setBookedFlight(includes[0]);
    },[flight._id])

    useEffect(() => {
        isFlightBeenOrdered(OrderFlights)
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const _OrderFlights = store.getState().OrderFlightsState.OrderFlights;
            isFlightBeenOrdered(_OrderFlights)
            setOrderFlights(_OrderFlights);
        });
        return unSubscribe;
    }, [OrderFlights,isFlightBeenOrdered]);



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

    const cancelOrder = async () => {
        try {
            await deleteOrderFlightAsync(bookedFlight._id);
            handleAlertOpen(`${bookedFlight.flight.toLocation} has been canceled`, "warning");
        } catch (error) {
            handleAlertOpen(error.message, "error");
        }
    }

    return (
        <TableCell align="center" className="BookAFlight">
            {!bookedFlight?._id ?
                <>
                    <select defaultValue={ticketAmount} className="selectAmount" onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button className="orderAFlight" onClick={HandleSubmitBookFlight}>Book Flight</button>
                </>
                :
                <button className="cancelFlight" onClick={cancelOrder}>Cancel Order</button>
            }
        </TableCell>
    );
}

export default BookAFlight;
