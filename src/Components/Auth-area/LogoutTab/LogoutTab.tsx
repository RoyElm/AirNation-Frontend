import React from "react";
import { MenuItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AuthModel } from "../../Models/AuthModel";
import "./LogoutTab.css";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { logoutUser } from "../../../Services/Axios_Services/Auth.service";

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
