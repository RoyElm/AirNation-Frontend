import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { getAllFlightsAsync, getComparator, stableSort } from "../../../Services/Flights.service";
import { FlightModel, Order } from "../../Models/FlightModel";
import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { flightTableStyle } from "../../../Services/GlobalStylingMaker";
import FlightHeaderList from "../FlightHeaderList/FlightHeaderList";
import FlightRaw from "../FlightRaw/FlightRaw";
import { errorsService } from "../../../Services/GlobalErrorsService";


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
                    <Table className={classes.table}>
                        <FlightHeaderList
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {flights.length ?
                                stableSort(flights, getComparator(order, orderBy)).map(flight => <FlightRaw {...flight} />)
                                :
                                <CircularProgress />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default FlightsList;

