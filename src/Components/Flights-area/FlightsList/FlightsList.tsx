import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { FlightModel, Order } from "../../Models/FlightModel";
import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { flightTableStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";
import FlightHeaderList from "../FlightHeaderList/FlightHeaderList";
import FlightRaw from "../FlightRaw/FlightRaw";
import { getAllFlightsAsync, getComparator, stableSort } from "../../../Services/Axios_Services/Flights.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";


function FlightsList(): JSX.Element {

    const [flights, setFlights] = useState<FlightModel[]>([]);

    useEffect(() => {
        ((async () => {
            try {
                const flights = await getAllFlightsAsync();
                setFlights(flights);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        }))();
    }, [])

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
                                {stableSort(flights, getComparator(order, orderBy)).map(flight => <FlightRaw key={flight._id} {...flight} />)}
                            </TableBody>
                        </Table>
                        :
                        <CircularProgress style={CIRCULAR_PROGRESS_STYLE}/>}
                </TableContainer>
            </Paper>
        </div>
    );
}

export default FlightsList;

