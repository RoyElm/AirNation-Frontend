import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { AdminGuard } from "../../../Services/Guards/Admin.guard";
import { UserGuard } from "../../../Services/Guards/User.guard";
import AddArticle from "../../Admin-area/AddArticle/AddArticle";
import AddFlight from "../../Admin-area/AddFlight/AddFlight";
import ArticleList from "../../Articles-area/ArticleList/ArticleList";
import FullArticle from "../../Articles-area/FullArticle/FullArticle";
import FlightsList from "../../Flights-area/FlightsList/FlightsList";
import Home from "../../Home-area/Home/Home";
import OrderFlightList from "../../OrderFlights-Area/OrderFlightList/OrderFlightList";

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path={GlobalPaths.homeUrl} component={Home} exact />
            <Route path={GlobalPaths.flightsUrl} component={FlightsList} exact />
            <Route path={GlobalPaths.articlesUrl} component={ArticleList} exact />
            <UserGuard path={GlobalPaths.orderedFlightsUrl} component={<OrderFlightList />} />
            <AdminGuard path={GlobalPaths.adminAreaUrl + "add-flight"} component={<AddFlight />} />
            <AdminGuard path={GlobalPaths.adminAreaUrl + "add-article"} component={<AddArticle />} />
            <Route path={`${GlobalPaths.readArticleUrl}:_id`} component={FullArticle} exact />
            <Redirect from="**" to="/" exact />
        </Switch>
    );
}

export default Routing;
