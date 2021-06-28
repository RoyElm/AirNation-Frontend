import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitArticleFormAsync } from "../../../Services/Axios_Services/Admin.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { ArticleModel } from "../../Models/ArticleModel";
import { Severity } from "../../Models/GlobalTypes";
import SnackBarAlert from "../../Shared-area/SnackBarAlert/SnackBarAlert";
import "./AddArticle.css";

function AddArticle(): JSX.Element {

    //setting form handlers using extend library named react-hook-form;
    const { register, handleSubmit, formState: { errors } } = useForm<ArticleModel>();

    const [alertOpen, setAlertOpen] = useState(false);

    const [messageAlert, setMessageAlert] = useState({
        message: "",
        severity: null
    });

    //sending the form to backend and updating the parent states about the changes.
    async function handleArticleSubmit(article: ArticleModel) {
        try {
            await submitArticleFormAsync(article);
            handleAlertOpen('Article Added Successfully', "success");
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

        if (errorType === 'minLength' && name === 'author') return `${name} min length is 3`;
        if (errorType === 'maxLength' && name === 'author') return `${name} max length is 50`;

        if (errorType === 'minLength' && name === 'description') return `${name} min length is 5`;
        if (errorType === 'maxLength' && name === 'description') return `${name} max length is 3000`;

    }

    return (
        <div className="AddArticle">
            <h2>Add Article Form</h2>
            <form onSubmit={handleSubmit(handleArticleSubmit)}>
                <TextField
                    label="Author"
                    name="author"
                    error={errors.author && true}
                    {...register('author', { required: true, minLength: 3, maxLength: 50 })}
                    helperText={errors?.author && handleErrorByName('author')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Description"
                    name="description"
                    error={errors.description && true}
                    {...register('description', { required: true, minLength: 5, maxLength: 3000 })}
                    helperText={errors?.description && handleErrorByName('description')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Publish Date"
                    name="publishDate"
                    type="date"
                    error={errors.publishDate && true}
                    {...register('publishDate', { required: true })}
                    helperText={errors?.publishDate && handleErrorByName('publishDate')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Title"
                    name="title"
                    error={errors.title && true}
                    {...register('title', { required: true })}
                    helperText={errors?.title && handleErrorByName('title')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Featured"
                    name="featured"
                    error={errors.featured && true}
                    {...register('featured', { required: true })}
                    helperText={errors?.featured && handleErrorByName('featured')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <input type="file" name="newImage" {...register('newImage', { required: true })} />
                <Button type="submit" variant="contained" color="primary">Add Article</Button>
            </form>
            <SnackBarAlert alertOpen={alertOpen} handleAlertClose={handleAlertClose} messageAlert={messageAlert} />
        </div>
    );
}

export default AddArticle;
