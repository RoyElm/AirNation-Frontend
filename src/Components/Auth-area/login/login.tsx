import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Typography, Container, Dialog, Slide, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { authFormStyle } from '../../../Services/GlobalStylingMaker';
import { useForm } from 'react-hook-form';
import { AuthModel } from '../../Models/AuthModel';
import { errorsService } from '../../../Services/GlobalErrorsService';
import { handleLoginUserAsync } from '../../../Services/Auth.service';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface dialogProps {
    open: boolean;
    onClose: () => void;
    loginSuccess: (message: string, severity: string) => void;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login(props: dialogProps) {
    const classes = authFormStyle();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthModel>(undefined);
    const { onClose, open, loginSuccess } = props;

    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const handleAlertOpen = (message: string, severity: string) => {
        setAlertOpen(true)
        setMessageAlert({ message, severity })
    }

    //Handling login form submit;
    async function send(auth: AuthModel) {
        try {
            const registeredUser = await handleLoginUserAsync(auth);
            loginSuccess(`Welcome ${registeredUser.firstName} ${registeredUser.lastName}`, "success");
        } catch (err) {
            handleAlertOpen(errorsService.getError(err), "error");
        }
    }

    return (
        <Dialog
            open={open} className="login"
            TransitionComponent={Transition}
            onClose={handleClose}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form action="POST" onSubmit={handleSubmit(send)} className={classes.form} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    {...register('email', { required: true, pattern: /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/ })}
                                    variant="outlined"
                                    fullWidth
                                    error={errors.email && true}
                                    label="Email Address"
                                    helperText={errors.email && errors.email?.type === "required"
                                        ? "email is required" :
                                        errors.email?.type === "pattern" ?
                                            "Pattern for email isn't right" : ""}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    {...register("password", { required: true, minLength: 6, pattern: /^\S*$/ })}
                                    variant="outlined"
                                    fullWidth
                                    error={errors.password && true}
                                    label="Password"
                                    type="password"
                                    helperText={errors.password && errors.password?.type === "required"
                                        ? "Password is required" :
                                        errors.password?.type === "minLength" ?
                                            "Password min length is 6" :
                                            errors.password?.type === "pattern" ?
                                                "Password can't own spaces" : ""}
                                />

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                </div>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={2200} onClose={handleAlertClose}>
                    <Alert variant="filled" onClose={handleAlertClose} severity="error">
                        {messageAlert.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Dialog>
    );
}