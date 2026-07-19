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
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Box
} from "@mui/material";

import api from "../api/api";

import type { Todo } from "../features/todos/todoTypes";

import {
    fetchTodos
} from "../features/todos/todosSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar from "../components/AppSnackbar";

function TodosPage() {

    const dispatch =
        useAppDispatch();

    const todos =
        useAppSelector(
            state => state.todos.todos
        );

    const loading =
        useAppSelector(
            state => state.todos.loading
        );

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState(false);

    const [id, setId] =
        useState("");

    const [userId, setUserId] =
        useState("");

    const [title, setTitle] =
        useState("");

    const [completed, setCompleted] =
        useState(false);

    const [userIdError, setUserIdError] =
        useState(false);

    const [titleError, setTitleError] =
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
            fetchTodos()
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

    function validateTodo() {

        let valid = true;

        setUserIdError(false);

        setTitleError(false);

        if (!userId.trim()) {

            setUserIdError(true);

            showSnackbar(
                "El userId es obligatorio",
                "warning"
            );

            valid = false;

        }

        if (!title.trim()) {

            setTitleError(true);

            showSnackbar(
                "El título es obligatorio",
                "warning"
            );

            valid = false;

        }

        return valid;

    }

    async function saveTodo() {

        try {

            if (!validateTodo()){
                return;
            }

            await api.post(
                "/todos",
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    completed
                }
            );

            await dispatch(
                fetchTodos()
            );

            showSnackbar(
                "Tarea creada correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            showSnackbar(
                "Error al crear tarea",
                "error"
            );

            console.error(error);

        }

    }

    async function updateTodo() {

        try {

            if (!validateTodo()){
                return;
            }

            await api.put(
                `/todos/${id}`,
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    completed
                }
            );

            await dispatch(
                fetchTodos()
            );

            showSnackbar(
                "Tarea actualizada correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            showSnackbar(
                "Error al actualizar tarea",
                "error"
            );


            console.error(error);

        }

    }

    async function deleteTodo(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar esta tarea?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/todos/${id}`
            );

            await dispatch(
                fetchTodos()
            );

            showSnackbar(
                "Tarea eliminada correctamente",
                "success"
            );

        } catch (error) {

            showSnackbar(
                "Error al eliminar tarea",
                "error"
            );

            console.error(error);

        }

    }

    function editTodo(
        todo: Todo
    ) {

        setEditing(true);

        setId(
            todo.id.toString()
        );

        setUserId(
            todo.userId.toString()
        );

        setTitle(
            todo.title
        );

        setCompleted(
            todo.completed
        );

        setOpen(true);

    }

    function newTodo() {

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setCompleted(false);

        setOpen(true);

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setCompleted(false);

        setUserIdError(false);

        setTitleError(false);

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Tareas
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={newTodo}
            >
                Nueva Tarea
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

                                <TableCell>User ID</TableCell>

                                <TableCell>Título</TableCell>

                                <TableCell>Completada</TableCell>

                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {todos.map(todo => (

                                <TableRow
                                    key={todo.id}
                                >

                                    <TableCell>
                                        {todo.id}
                                    </TableCell>

                                    <TableCell>
                                        {todo.userId}
                                    </TableCell>

                                    <TableCell>
                                        {todo.title}
                                    </TableCell>

                                    <TableCell>
                                        {todo.completed
                                            ? "Sí"
                                            : "No"}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editTodo(todo)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deleteTodo(
                                                    todo.id
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
                        ? "Editar Tarea"
                        : "Nueva Tarea"}

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
                        label="User ID"
                        fullWidth
                        margin="dense"
                        value={userId}
                        error={userIdError}
                        helperText={
                            userIdError
                                ? "Ingrese un userId"
                                : ""
                        }
                        onChange={(e) =>
                            setUserId(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Título"
                        fullWidth
                        margin="dense"
                        value={title}
                        error={titleError}
                        helperText={
                            titleError
                                ? "Ingrese un título"
                                : ""
                        }
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={completed}
                                onChange={(e) =>
                                    setCompleted(
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Completada"
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
                                ? updateTodo
                                : saveTodo
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

export default TodosPage;