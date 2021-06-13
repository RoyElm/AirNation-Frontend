import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import AirNation from '../../../assets/images/AirNation.png';
import "./Header.css";

import NavLog from "../../Auth-area/NavLog/NavLog";

function Header(): JSX.Element {
    const [value, setValue] = useState('1');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="Header">
            <div className="nav-tabs">
                <img src={AirNation} alt="AirNation" />
                <Tabs className="tabs" onChange={handleChange}>
                    <Tab label="Home" value="1" />
                    <Tab label="Best Sellers" value="2" />
                    <Tab label="Articles" value="3" />
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
