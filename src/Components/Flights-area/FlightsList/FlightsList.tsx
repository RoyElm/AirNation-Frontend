import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { FlightModel } from "../../Models/FlightModel";
import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { flightTableStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";
import FlightHeaderList from "../FlightHeaderList/FlightHeaderList";
import FlightRaw from "../FlightRaw/FlightRaw";
import { getAllFlightsAsync, getComparator, stableSort } from "../../../Services/Axios_Services/Flights.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";
import { Order, Severity } from "../../Models/GlobalTypes";
import store from "../../../Redux/Store";
import { getAllOrderedFlightsByUserId } from "../../../Services/Axios_Services/Order_Flight.service";
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";


function FlightsList(): JSX.Element {

    const [flights, setFlights] = useState<FlightModel[]>([]);

    useEffect(() => {
        ((async () => {
            try {
                await setOrderedFlightsAtRedux();
                await setFlightsAsync()
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [])

    async function setOrderedFlightsAtRedux(){
        const auth = store.getState().authState.auth;
        if (auth) {
            await getAllOrderedFlightsByUserId(auth._id);
        }
    }

    async function setFlightsAsync(){
        const flights = await getAllFlightsAsync();
        setFlights(flights);
    }

    const classes = flightTableStyle();
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof FlightModel>("fromLocation");

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof FlightModel
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

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
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    {flights.length ?
                        <Table className={classes.table}>
                            <FlightHeaderList
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(flights, getComparator(order, orderBy)).map(flight => <FlightRaw handleAlertOpen={handleAlertOpen} key={flight._id} flight={flight} />)}
                            </TableBody>
                        </Table>
                        :
                        <CircularProgress style={CIRCULAR_PROGRESS_STYLE}/>}
                </TableContainer>
            </Paper>
            <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert} />
        </div>
    );
}

export default FlightsList;

