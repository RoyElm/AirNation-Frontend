import { CircularProgress, Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import { getAllOrderedFlightsByUserId } from "../../../Services/Axios_Services/Order_Flight.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { OrderFlightModel } from "../../Models/OrderFlightModel";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";
import "./OrderFlightList.css";

function OrderFlightList(): JSX.Element {
    const [orderedFlights, setOrderedFlights] = useState<OrderFlightModel[]>([]);

    useEffect(() => {
        ((async () => {
            try {
                const _id = store.getState().authState.auth?._id;
                console.log(_id);

                // const _orderedFlights = await getAllOrderedFlightsByUserId(_id);
                // setOrderedFlights(_orderedFlights);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [])

    return (
        <div>
            <Paper >
                <TableContainer>
                    {orderedFlights.length ?
                        <Table>
                            <TableBody>
                            </TableBody>
                        </Table>
                        :
                        <CircularProgress style={CIRCULAR_PROGRESS_STYLE} />}
                </TableContainer>
            </Paper>
        </div>
    );
}

export default OrderFlightList;
