import React, { useEffect, useRef, useState } from "react";
import "./NavLog.css";
import { AuthModel } from '../../Models/AuthModel';
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import LogoutTab from "../LogoutTab/LogoutTab";
import LoginTab from "../LoginTab/LoginTab";
import { Avatar, Button, Paper, Popper, MenuList } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";
import { Severity } from "../../Models/GlobalTypes";

function NavLog(): JSX.Element {

    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    //Handling user login/logout changes.
    const [auth, setAuth] = useState<AuthModel>(store.getState().authState.auth);

    const handleToggle = () => {
        setOpen(open => !open);
    };

    const handleAlertOpen = (message: string, severity: Severity) => {
        setMessageAlert({ message, severity })
        setAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    //Handling user login to render his first later of first name to show at Menu, also to know if he logged out or logged in;
    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const auth = store.getState().authState.auth;
            setAuth(auth);
        });
        return unSubscribe;
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="NavLog">
            <div className="button">
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}

                >
                    <MenuIcon />
                    <Avatar><AccountCircle /></Avatar>
                </Button>
            </div>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className="popperList">
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                            {auth?.token ? <LogoutTab auth={auth} logoutWarning={handleAlertOpen} /> : <LoginTab loginSuccess={handleAlertOpen} />}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
            <SnackBarAlert alertOpen={alertOpen} messageAlert={messageAlert} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default NavLog;
