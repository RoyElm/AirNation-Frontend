import React, { useEffect, useState } from "react";
import "./BestSellers.css";
import { GridList,GridListTile,GridListTileBar,IconButton } from '@material-ui/core';
import { FlightModel } from "../../Models/FlightModel";
import { getAllFlightsAsync } from "../../../Services/Axios_Services/Flights.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { Globals } from "../../../Services/GlobalServices/Globals";
import AirNationFlight from '../../../assets/images/AirNationFlight.png';
import { bestSellerStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";


function BestSellers(): JSX.Element {
    const classes = bestSellerStyle();
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

    return (
        <div className={classes.root}>
            <h3>Best Sellers</h3>
            <GridList className={classes.gridList} cols={2.5}>
                {flights.map((flight) => (
                    <GridListTile key={flight.imageName}>
                        <img src={Globals.flightsApiUrl + "flightImages/" + flight.imageName} alt={flight.imageName} />
                        <GridListTileBar
                            title={flight.toLocation}
                            actionIcon={
                                <IconButton>
                                    <img className={classes.imageFlight} src={AirNationFlight} alt="AirNationFlight" />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default BestSellers;
