import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Typography, Container, Dialog } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { authFormStyle } from '../../../Services/GlobalServices/GlobalStylingMaker';
import { useForm } from 'react-hook-form';
import { AuthModel } from '../../Models/AuthModel';
import SnackBarAlert from '../../Shared-area/SnackBarAlert/SnackBarAlert';
import { Transition } from '../../Shared-area/Transition/Transition';
import { handleRegisterUserAsync } from '../../../Services/Axios_Services/Auth.service';
import { errorsService } from '../../../Services/GlobalServices/GlobalErrorsService';
import { Severity } from '../../Models/GlobalTypes';

export interface dialogProps {
    open: boolean;
    onClose: () => void;
    loginSuccess: (message: string, severity: Severity) => void;
}

export default function Register(props: dialogProps) {
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

    const handleAlertOpen = (message: string, severity: Severity) => {
        setMessageAlert({ message, severity })
        setAlertOpen(true)
    }

    //Handling register form submit;
    async function handleRegisterFormSubmit(auth: AuthModel) {
        try {
            const registeredUser = await handleRegisterUserAsync(auth);
            loginSuccess(`Welcome ${registeredUser.firstName} ${registeredUser.lastName}`, "success");
        } catch (err) {
            handleAlertOpen(errorsService.getError(err), "error");
        }
    }

    return (
        <Dialog
            open={open} className="register"
            TransitionComponent={Transition}
            onClose={handleClose}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form action="POST" onSubmit={handleSubmit(handleRegisterFormSubmit)} className={classes.form} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    {...register('firstName', { required: true, minLength: 2, maxLength: 30, pattern: /^([a-zA-Z\u0590-\u05fe]{2,}\s?)+$$/ })}
                                    variant="outlined"
                                    fullWidth
                                    label="First Name"
                                    error={errors.firstName && true}
                                    helperText={errors.firstName && errors.firstName?.type === "required"
                                        ? "First Name is required" :
                                        errors.firstName?.type === "minLength"
                                            ? "First Name min length is 2" :
                                            errors.firstName?.type === "maxLength"
                                                ? "First Name max length is 30" :
                                                errors.firstName?.type === "pattern" ?
                                                    "Pattern not right too many spaces" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    {...register('lastName', { required: true, minLength: 2, maxLength: 30, pattern: /^([a-zA-Z\u0590-\u05fe]{2,}\s?)+$$/ })}
                                    error={errors.lastName && true}
                                    label="Last Name"
                                    helperText={errors.lastName && errors.lastName?.type === "required"
                                        ? "Last Name is required" :
                                        errors.lastName?.type === "minLength"
                                            ? "Last Name min length is 2" :
                                            errors.lastName?.type === "maxLength"
                                                ? "Last Name max length is 30" :
                                                errors.lastName?.type === "pattern" ?
                                                    "Pattern not right too many spaces" : ""}
                                />

                            </Grid>
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
                            Sign Up
                        </Button>
                    </form>
                </div>
                <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert}/>
            </Container>
        </Dialog>
    );
}