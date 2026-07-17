import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Box
} from "@mui/material";

import api from "../api/api";

import type { User }
    from "../features/users/usersTypes";

import {
    fetchUsers
} from "../features/users/usersSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar
    from "../components/AppSnackbar";

function UsersPage() {

    const dispatch =
        useAppDispatch();

    const users =
        useAppSelector(
            state => state.users.users
        );

    const loading =
        useAppSelector(
            state => state.users.loading
        );

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState(false);

    const [id, setId] =
        useState("");

    const [name, setName] =
        useState("");

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [nameError, setNameError] =
        useState(false);

    const [usernameError, setUsernameError] =
        useState(false);

    const [emailError, setEmailError] =
        useState(false);

    const [snackbarOpen, setSnackbarOpen] =
        useState(false);

    const [snackbarMessage, setSnackbarMessage] =
        useState("");

    const [snackbarSeverity, setSnackbarSeverity] =
        useState<
            "success"
            | "error"
            | "warning"
            | "info"
        >("success");

    useEffect(() => {

        dispatch(
            fetchUsers()
        );

    }, [dispatch]);

    function showSnackbar(
        message: string,
        severity:
            | "success"
            | "error"
            | "warning"
            | "info"
    ) {

        setSnackbarMessage(message);

        setSnackbarSeverity(severity);

        setSnackbarOpen(true);

    }

    function validateUser() {

        let valid = true;

        setNameError(false);
        setUsernameError(false);
        setEmailError(false);

        if (!name.trim()) {

            setNameError(true);

            showSnackbar(
                "El nombre es obligatorio",
                "warning"
            );

            valid = false;

        }

        if (!username.trim()) {

            setUsernameError(true);

            showSnackbar(
                "El usuario es obligatorio",
                "warning"
            );

            valid = false;

        }

        if (!email.trim()) {

            setEmailError(true);

            showSnackbar(
                "El email es obligatorio",
                "warning"
            );

            valid = false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            email.trim() &&
            !emailRegex.test(email)
        ) {

            setEmailError(true);

            showSnackbar(
                "Email inválido",
                "warning"
            );

            valid = false;

        }

        return valid;

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");
        setName("");
        setUsername("");
        setEmail("");

        setNameError(false);
        setUsernameError(false);
        setEmailError(false);

    }

    function newUser() {

        closeDialog();

        setOpen(true);

    }

    function editUser(
        user: User
    ) {

        setEditing(true);

        setId(
            user.id.toString()
        );

        setName(
            user.name
        );

        setUsername(
            user.username
        );

        setEmail(
            user.email
        );

        setOpen(true);

    }

    async function saveUser() {

        if (!validateUser()) {

            return;

        }

        try {

            await api.post(
                "/users",
                {
                    id: Number(id),
                    name,
                    username,
                    email
                }
            );

            await dispatch(
                fetchUsers()
            );

            showSnackbar(
                "Usuario creado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al crear usuario",
                "error"
            );

        }

    }

    async function updateUser() {

        if (!validateUser()) {

            return;

        }

        try {

            await api.put(
                `/users/${id}`,
                {
                    id: Number(id),
                    name,
                    username,
                    email
                }
            );

            await dispatch(
                fetchUsers()
            );

            showSnackbar(
                "Usuario actualizado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al actualizar usuario",
                "error"
            );

        }

    }

    async function deleteUser(
        userId: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar este usuario?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/users/${userId}`
            );

            await dispatch(
                fetchUsers()
            );

            showSnackbar(
                "Usuario eliminado correctamente",
                "success"
            );

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al eliminar usuario",
                "error"
            );

        }

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{
                    mt: 3,
                    mb: 3
                }}
            >
                Usuarios
            </Typography>

            <Button
                variant="contained"
                onClick={newUser}
                sx={{ mb: 2 }}
            >
                Nuevo Usuario
            </Button>

            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4
                    }}
                >

                    <CircularProgress />

                </Box>

            ) : (

                <Paper>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {users.map(user => (

                                <TableRow
                                    key={user.id}
                                >

                                    <TableCell>
                                        {user.id}
                                    </TableCell>

                                    <TableCell>
                                        {user.name}
                                    </TableCell>

                                    <TableCell>
                                        {user.username}
                                    </TableCell>

                                    <TableCell>
                                        {user.email}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editUser(user)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deleteUser(
                                                    user.id
                                                )
                                            }
                                        >
                                            Eliminar
                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </Paper>

            )}

            <Dialog
                open={open}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>

                    {editing
                        ? "Editar Usuario"
                        : "Nuevo Usuario"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="ID"
                        fullWidth
                        margin="dense"
                        value={id}
                        disabled={editing}
                        onChange={(e) =>
                            setId(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Nombre"
                        fullWidth
                        margin="dense"
                        value={name}
                        error={nameError}
                        helperText={
                            nameError
                                ? "Ingrese un nombre"
                                : ""
                        }
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Usuario"
                        fullWidth
                        margin="dense"
                        value={username}
                        error={usernameError}
                        helperText={
                            usernameError
                                ? "Ingrese un usuario"
                                : ""
                        }
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        margin="dense"
                        value={email}
                        error={emailError}
                        helperText={
                            emailError
                                ? "Ingrese un email válido"
                                : ""
                        }
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={closeDialog}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            editing
                                ? updateUser
                                : saveUser
                        }
                    >
                        Guardar
                    </Button>

                </DialogActions>

            </Dialog>

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() =>
                    setSnackbarOpen(false)
                }
            />

        </Container>

    );

}

export default UsersPage;