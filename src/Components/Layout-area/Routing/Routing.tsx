import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Home-area/Home/Home";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route component={Home} exact />
            </Switch>
        </div>
    );
}

export default Routing;
