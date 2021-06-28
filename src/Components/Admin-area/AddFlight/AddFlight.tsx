import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitFlightFormAsync } from "../../../Services/Axios_Services/Admin.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { AddFlightModel } from "../../Models/FlightModel";
import { Severity } from "../../Models/GlobalTypes";
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";
import "./AddFlight.css";

function AddFlight(): JSX.Element {

    //setting form handlers using extend library named react-hook-form;
    const { register, handleSubmit, formState: { errors } } = useForm<AddFlightModel>();

    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    //sending the form to backend and updating the parent states about the changes.
    async function handleFlightFormSubmit(Flight: AddFlightModel) {
        try {
            await submitFlightFormAsync(Flight);
            handleAlertOpen('Flight Added Successfully', "success");
        } catch (err) {
            handleAlertOpen(errorsService.getError(err), "error");
        }
    }

    const handleAlertOpen = (message: string, severity: Severity) => {
        setMessageAlert({ message, severity })
        setAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const handleErrorByName = name => {
        const errorType = errors[name].type;
        if (errorType === 'required') return `${name} is required!`;

        if (errorType === 'minLength') return `${name} min length is 2`;
        if (errorType === 'maxLength') return `${name} max length is 50`;

        if (errorType === 'min') return ` min ${name} is 1`;
        if (errorType === 'max') return ` max ${name} is 100000`;

    }

    return (
        <div className="AddFlight">
            <h2>Add Flight Form</h2>
            <form onSubmit={handleSubmit(handleFlightFormSubmit)}>
                <TextField
                    label="From Location"
                    name="fromLocation"
                    error={errors.fromLocation && true}
                    {...register('fromLocation', { required: true, minLength: 2, maxLength: 50 })}
                    helperText={errors?.fromLocation && handleErrorByName('fromLocation')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="To Location"
                    name="toLocation"
                    error={errors.toLocation && true}
                    {...register('toLocation', { required: true, minLength: 2, maxLength: 50 })}
                    helperText={errors?.toLocation && handleErrorByName('toLocation')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Duration"
                    name="duration"
                    type="date"
                    error={errors.duration && true}
                    {...register('duration', { required: true })}
                    helperText={errors?.duration && handleErrorByName('duration')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    error={errors.date && true}
                    {...register('date', { required: true })}
                    helperText={errors?.date && handleErrorByName('date')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Price"
                    name="price"
                    error={errors.price && true}
                    {...register('price', { required: true, min: 1, max: 100000 })}
                    helperText={errors?.price && handleErrorByName('price')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <input type="file" name="newImage" {...register('newImage', { required: true })} />
                <Button type="submit" variant="contained" color="primary">Add Flight</Button>
            </form>
            <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert} />
        </div>
    );
}

export default AddFlight;