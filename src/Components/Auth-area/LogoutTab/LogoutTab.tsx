import { MenuItem } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../Services/GlobalHelpers";
import { GlobalPaths } from "../../../Services/GlobalPaths";
import { AuthModel } from "../../Models/AuthModel";
import "./LogoutTab.css";

interface userProps {
    auth: AuthModel;
    logoutWarning: (message: string, severity: string) => void;
}

function LogoutTab(props: userProps): JSX.Element {

    function handlingLogout() {
        logoutUser();
        props.logoutWarning(`Goodbye ${props.auth.firstName}`, "warning");
    }

    //LogoutUser function importing from Global function services to handel logout
    return (
        <MenuItem className="LogoutTab">
            <span> Welcome {props.auth && props.auth.firstName}</span>
            <NavLink to={GlobalPaths.homeUrl} onClick={handlingLogout} >Logout</NavLink>
        </MenuItem>
    );
}

export default LogoutTab;
