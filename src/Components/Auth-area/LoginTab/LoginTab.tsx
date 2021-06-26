import { MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { LockOpen, Lock } from '@material-ui/icons';
import Register from "../register/register";
import Login from "../login/login";
import { Severity } from "../../Models/GlobalTypes";

export interface loginProps {
    loginSuccess: (message: string, severity: Severity) => void;
}

function LoginTab(props: loginProps): JSX.Element {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleRegisterOpen = () => {
        setRegisterOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterOpen(false);
    };

    const handleAlertOpen = (message: string, severity: Severity) => {
        props.loginSuccess(message, severity)
    }

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    return (
        <div>
            <MenuItem onClick={handleLoginOpen}>
                <LockOpen />
                Login
            </MenuItem>
            <hr />
            <MenuItem onClick={handleRegisterOpen}>
                <Lock />
                Register
            </MenuItem>
            <Register open={registerOpen} onClose={handleRegisterClose} loginSuccess={(message: string, severity: Severity) => handleAlertOpen(message, severity)} />
            <Login open={loginOpen} onClose={handleLoginClose} loginSuccess={(message: string, severity: Severity) => handleAlertOpen(message, severity)} />
        </div>
    );
}

export default LoginTab;
