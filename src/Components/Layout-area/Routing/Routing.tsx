import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleList from "../../Articles-area/ArticleList/ArticleList";
import FullArticle from "../../Articles-area/FullArticle/FullArticle";
import FlightsList from "../../Flights-area/FlightsList/FlightsList";
import Home from "../../Home-area/Home/Home";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/flights" component={FlightsList} exact />
                <Route path="/articles" component={ArticleList} exact />
                <Route path="/article/:_id" component={FullArticle} exact />
                <Route component={Home} exact />
            </Switch>
        </div>
    );
}

export default Routing;
