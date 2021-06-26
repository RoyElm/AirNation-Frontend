import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import AirNation from '../../../assets/images/AirNation.png';
import "./Header.css";
import NavLog from "../../Auth-area/NavLog/NavLog";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";

function Header(): JSX.Element {
    const { pathname } = useLocation();
    const [value, setValue] = useState<string>(pathname);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(newValue);
    };

    return (
        <div className="Header">
            <div className="nav-tabs">
                <img src={AirNation} alt="AirNation" />
                <Tabs className="tabs" value={value} onChange={handleChange}>
                    <Tab label="Home" value={GlobalPaths.homeUrl} />
                    <Tab label="Flights" value={GlobalPaths.flightsUrl} />
                    <Tab label="Articles" value={GlobalPaths.articlesUrl} />
                    {pathname.includes(GlobalPaths.readArticleUrl) && <Tab label="Read Article" value={pathname} />}
                </Tabs>
                <div className="userDiv">
                    <NavLog />
                </div>
            </div>
            <div className="parallax"></div>
        </div>
    )
}

export default Header;
