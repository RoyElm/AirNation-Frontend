import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import { getAllOrderedFlightsByUserId } from "../../../Services/Axios_Services/Order_Flight.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { OrderFlightModel } from "../../Models/OrderFlightModel";
import "./OrderFlightList.css";
import OrderFlightHeaders from "../OrderFlightHeaders/OrderFlightHeaders";
import OrderFlightRow from "../OrderFlightRow/OrderFlightRow";
import { useHistory } from "react-router-dom";


function OrderFlightList(): JSX.Element {
    const [orderedFlights, setOrderedFlights] = useState<OrderFlightModel[]>([]);
    const history = useHistory();

    useEffect(() => {
        ((async () => {
            try {
                const _id = store.getState().authState.auth?._id;
                const _orderedFlights = await getAllOrderedFlightsByUserId(_id);
                setOrderedFlights(_orderedFlights);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [history])

    return (
        <Paper >
            <TableContainer>
                {orderedFlights.length ?
                    <Table>
                        <OrderFlightHeaders />
                        <TableBody>
                            {orderedFlights.map(orderFlight => (
                                <OrderFlightRow key={orderFlight._id} {...orderFlight} />
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <>
                        <h2>No Orders yet...</h2>
                    </>}
            </TableContainer>
        </Paper >
    );
}

export default OrderFlightList;
