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

import type { Post } from "../features/posts/postTypes";

import {
    fetchPosts
} from "../features/posts/postsSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar
    from "../components/AppSnackbar";

function PostsPage() {

    const dispatch =
        useAppDispatch();

    const posts =
        useAppSelector(
            state => state.posts.posts
        );

    const loading =
        useAppSelector(
            state => state.posts.loading
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

    const [body, setBody] =
        useState("");

    const [userIdError, setUserIdError] =
        useState(false);

    const [titleError, setTitleError] =
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

    useEffect(() => {

        dispatch(
            fetchPosts()
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

    function validatePost() {

        let valid = true;

        setUserIdError(false);
        setTitleError(false);
        setBodyError(false);

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

        if (!body.trim()) {

            setBodyError(true);

            showSnackbar(
                "El contenido es obligatorio",
                "warning"
            );

            valid = false;

        }

        return valid;

    }

    async function savePost() {

        try {

            if (!validatePost()) {

                return;

            }

            await api.post(
                "/posts",
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    body
                }
            );

            await dispatch(
                fetchPosts()
            );

            showSnackbar(
                "Post creado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            showSnackbar(
                "Error al crear post",
                "error"
            );

            console.error(error);

        }

    }

    async function updatePost() {

        try {

            if (!validatePost()) {

                return;

            }

            await api.put(
                `/posts/${id}`,
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    body
                }
            );

            await dispatch(
                fetchPosts()
            );

            showSnackbar(
                "Post actualizado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            showSnackbar(
                "Error al actualizar post",
                "error"
            );

            console.error(error);

        }

    }

    async function deletePost(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar este post?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/posts/${id}`
            );

            await dispatch(
                fetchPosts()
            );

            showSnackbar(
                "Post eliminado correctamente",
                "success"
            );

        } catch (error) {

            showSnackbar(
                "Error al eliminar post",
                "error"
            );

            console.error(error);

        }

    }

    function editPost(
        post: Post
    ) {

        setEditing(true);

        setId(
            post.id.toString()
        );

        setUserId(
            post.userId.toString()
        );

        setTitle(
            post.title
        );

        setBody(
            post.body
        );

        setOpen(true);

    }

    function newPost() {

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setBody("");

        setOpen(true);

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setBody("");

        setUserIdError(false);

        setTitleError(false);

        setBodyError(false);

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Posts
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={newPost}
            >
                Nuevo Post
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

                                <TableCell>Contenido</TableCell>

                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {posts.map(post => (

                                <TableRow
                                    key={post.id}
                                >

                                    <TableCell>
                                        {post.id}
                                    </TableCell>

                                    <TableCell>
                                        {post.userId}
                                    </TableCell>

                                    <TableCell>
                                        {post.title}
                                    </TableCell>

                                    <TableCell>
                                        {post.body}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editPost(post)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deletePost(
                                                    post.id
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
                        ? "Editar Post"
                        : "Nuevo Post"}

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

                    <TextField
                        label="Contenido"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={body}
                        error={bodyError}
                        helperText={
                            bodyError
                                ? "Ingrese contenido"
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
                                ? updatePost
                                : savePost
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

export default PostsPage;