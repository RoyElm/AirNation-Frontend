import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import ArticleList from "../../Articles-area/ArticleList/ArticleList";
import FullArticle from "../../Articles-area/FullArticle/FullArticle";
import FlightsList from "../../Flights-area/FlightsList/FlightsList";
import Home from "../../Home-area/Home/Home";
import OrderFlightList from "../../OrderFlights-Area/OrderFlightList/OrderFlightList";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path={GlobalPaths.homeUrl} component={Home} exact />
                <Route path={GlobalPaths.flightsUrl} component={FlightsList} exact />
                <Route path={GlobalPaths.articlesUrl} component={ArticleList} exact />
                <Route path={GlobalPaths.orderedFlightsUrl} component={OrderFlightList} exact />
                <Route path={`${GlobalPaths.readArticleUrl}:_id`} component={FullArticle} exact />
                <Route component={Home} exact />
            </Switch>
        </div>
    );
}

export default Routing;
