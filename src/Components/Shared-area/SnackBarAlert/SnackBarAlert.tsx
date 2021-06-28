import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Severity } from "../../Models/GlobalTypes";

interface SnackBarAlertInterface {
    alertOpen: boolean;
    messageAlert: {
        message: string,
        severity: Severity
    },
    handleAlertClose: () => void;
}

function SnackBarAlert({ alertOpen, messageAlert, handleAlertClose }: SnackBarAlertInterface): JSX.Element {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={2200} onClose={handleAlertClose}>
            <Alert variant="filled" onClose={handleAlertClose} severity={messageAlert.severity}>
                {messageAlert.message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBarAlert;
