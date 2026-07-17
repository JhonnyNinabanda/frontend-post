import {
    Snackbar,
    Alert
} from "@mui/material";

interface AppSnackbarProps {

    open: boolean;

    message: string;

    severity:
        | "success"
        | "error"
        | "warning"
        | "info";

    onClose: () => void;

}

function AppSnackbar({
                         open,
                         message,
                         severity,
                         onClose
                     }: AppSnackbarProps) {

    return (

        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
        >

            <Alert
                severity={severity}
                variant="filled"
                onClose={onClose}
            >
                {message}
            </Alert>

        </Snackbar>

    );

}

export default AppSnackbar;