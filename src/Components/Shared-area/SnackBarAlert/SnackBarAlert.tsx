import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface SnackBarAlertInterface {
    alertOpen: boolean;
    messageAlert: {
        message: string,
        severity: string
    },
    handleAlertClose: () => void;
}

function SnackBarAlert({ alertOpen, messageAlert, handleAlertClose }: SnackBarAlertInterface): JSX.Element {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={2200} onClose={handleAlertClose}>
            {messageAlert.severity === "success" ?
                <Alert variant="filled" onClose={handleAlertClose} severity="success">
                    {messageAlert.message}
                </Alert>
                :
                <Alert variant="filled" onClose={handleAlertClose} severity="warning">
                    {messageAlert.message}
                </Alert>
            }
        </Snackbar>
    );
}

export default SnackBarAlert;
