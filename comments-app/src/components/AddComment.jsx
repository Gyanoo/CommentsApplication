import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function AddComment() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const [snackbarMessage, setSnackbarMessage] = useState(
        "Comment added successfully. Thank you! In 5 seconds you will be redirected to main page..."
    );
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const history = useHistory();

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleConfirmationClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const addComment = async (formData) => {
        let response = await fetch("http://127.0.0.1:4000/addNewComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (response.status === 400) {
            setSnackbarMessage(
                "Comment wasn't added successfully. Please try again."
            );
            setSnackbarSeverity("error");
        }

        setSnackbarOpen(true);
        if (response.status === 200) {
            reset();
            setTimeout(() => {
                history.push("/");
            }, 5000);
        }
    };

    const cancelComment = () => {
        history.push("/");
    };

    return (
        <div className="container" style={{ width: "50vw", minWidth: "300px" }}>
            <h1 className="my-4">Add new comment</h1>
            <Form onSubmit={handleSubmit(addComment)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title: </Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                        <p style={{ color: "red" }}>Title is required.</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control
                        type="text"
                        name="comment"
                        {...register("comment", { required: true })}
                    />
                    {errors.comment && (
                        <p style={{ color: "red" }}>Comment is required.</p>
                    )}
                </Form.Group>
                <Button variant="success" type="submit" className="me-4">
                    Save comment
                </Button>
                <Button variant="danger" onClick={() => cancelComment()}>
                    Cancel
                </Button>
            </Form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleConfirmationClose}
            >
                <Alert
                    style={{
                        height: "10vh",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClose={handleConfirmationClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
