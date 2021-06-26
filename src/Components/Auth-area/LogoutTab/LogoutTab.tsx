import React from "react";
import { MenuItem } from "@material-ui/core";
import { AuthModel } from "../../Models/AuthModel";
import "./LogoutTab.css";
import { logoutUser } from "../../../Services/Axios_Services/Auth.service";
import { Severity } from "../../Models/GlobalTypes";

interface userProps {
    auth: AuthModel;
    logoutWarning: (message: string, severity: Severity) => void;
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
            <span className="logoutLink" onClick={handlingLogout}>Logout</span>
        </MenuItem>
    );
}

export default LogoutTab;
