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

import type { Comment } from "../features/comments/commentTypes";

import {
    fetchComments
} from "../features/comments/commentsSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar from "../components/AppSnackbar";


function CommentsPage() {

    const dispatch =
        useAppDispatch();

    const comments =
        useAppSelector(
            state => state.comments.comments
        );

    const loading =
        useAppSelector(
            state => state.comments.loading
        );

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState(false);

    const [id, setId] =
        useState("");

    const [postId, setPostId] =
        useState("");

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [body, setBody] =
        useState("");

    const [postIdError, setPostIdError] =
        useState(false);

    const [nameError, setNameError] =
        useState(false);

    const [emailError, setEmailError] =
        useState(false);

    const [bodyError, setBodyError] =
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

    function validateComment() {

        let valid = true;

        setPostIdError(false);
        setNameError(false);
        setEmailError(false);
        setBodyError(false);

        if (!postId.trim()) {

            setPostIdError(true);

            showSnackbar(
                "El postId es obligatorio",
                "warning"
            );

            valid = false;

        }

        if (!name.trim()) {

            setNameError(true);

            showSnackbar(
                "El nombre es obligatorio",
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

        if (!body.trim()) {

            setBodyError(true);

            showSnackbar(
                "El comentario es obligatorio",
                "warning"
            );

            valid = false;

        }

        return valid;

    }

    useEffect(() => {

        dispatch(
            fetchComments()
        );

    }, [dispatch]);

    async function saveComment() {

        if (!validateComment()){
            return;
        }

        try {

            await api.post(
                "/comments",
                {
                    id: Number(id),
                    postId: Number(postId),
                    name,
                    email,
                    body
                }
            );

            await dispatch(
                fetchComments()
            );

            showSnackbar(
                "Comentario creado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al crear comentario",
                "error"
            );

        }

    }

    async function updateComment() {

        if (!validateComment()){
            return;
        }

        try {

            await api.put(
                `/comments/${id}`,
                {
                    id: Number(id),
                    postId: Number(postId),
                    name,
                    email,
                    body
                }
            );

            await dispatch(
                fetchComments()
            );

            showSnackbar(
                "Comentario actualizado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al actualizar comentario",
                "error"
            );

        }

    }

    async function deleteComment(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar este comentario?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/comments/${id}`
            );

            await dispatch(
                fetchComments()
            );

            showSnackbar(
                "Comentario eliminado correctamente",
                "success"
            );

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al eliminar comentario",
                "error"
            );

        }

    }

    function editComment(
        comment: Comment
    ) {

        setEditing(true);

        setId(
            comment.id.toString()
        );

        setPostId(
            comment.postId.toString()
        );

        setName(
            comment.name
        );

        setEmail(
            comment.email
        );

        setBody(
            comment.body
        );

        setOpen(true);

    }

    function newComment() {

        setEditing(false);

        setId("");

        setPostId("");

        setName("");

        setEmail("");

        setBody("");

        setOpen(true);

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");

        setPostId("");

        setName("");

        setEmail("");

        setBody("");

        setPostIdError(false);

        setNameError(false);

        setEmailError(false);

        setBodyError(false);

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Comentarios
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={newComment}
            >
                Nuevo Comentario
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

                                <TableCell>Post ID</TableCell>

                                <TableCell>Nombre</TableCell>

                                <TableCell>Email</TableCell>

                                <TableCell>Comentario</TableCell>

                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {comments.map(comment => (

                                <TableRow
                                    key={comment.id}
                                >

                                    <TableCell>
                                        {comment.id}
                                    </TableCell>

                                    <TableCell>
                                        {comment.postId}
                                    </TableCell>

                                    <TableCell>
                                        {comment.name}
                                    </TableCell>

                                    <TableCell>
                                        {comment.email}
                                    </TableCell>

                                    <TableCell>
                                        {comment.body}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editComment(comment)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deleteComment(
                                                    comment.id
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
                maxWidth="md"
                fullWidth
            >

                <DialogTitle>

                    {editing
                        ? "Editar Comentario"
                        : "Nuevo Comentario"}

                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="ID"
                        fullWidth
                        margin="dense"
                        value={id}
                        disabled={editing}
                        onChange={(e) =>
                            setId(e.target.value)
                        }
                    />

                    <TextField
                        label="Post ID"
                        fullWidth
                        margin="dense"
                        value={postId}
                        error={postIdError}
                        helperText={
                            postIdError
                                ? "Ingrese un postId"
                                : ""
                        }
                        onChange={(e) =>
                            setPostId(
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

                    <TextField
                        label="Comentario"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={body}
                        error={bodyError}
                        helperText={
                            bodyError
                                ? "Ingrese un comentario"
                                : ""
                        }
                        onChange={(e) =>
                            setBody(
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
                                ? updateComment
                                : saveComment
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

export default CommentsPage;