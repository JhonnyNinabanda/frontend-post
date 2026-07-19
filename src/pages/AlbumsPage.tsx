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

import type { Album } from "../features/albums/albumTypes";

import {
    fetchAlbums
} from "../features/albums/albumsSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar from "../components/AppSnackbar";

function AlbumsPage() {

    const dispatch =
        useAppDispatch();

    const albums =
        useAppSelector(
            state => state.albums.albums
        );

    const loading =
        useAppSelector(
            state => state.albums.loading
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

    function validateAlbum() {

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

    useEffect(() => {

        dispatch(
            fetchAlbums()
        );

    }, [dispatch]);

    async function saveAlbum() {

        if (!validateAlbum()) {
            return;
        }

        try {

            await api.post(
                "/albums",
                {
                    id: Number(id),
                    userId: Number(userId),
                    title
                }
            );

            await dispatch(
                fetchAlbums()
            );

            showSnackbar(
                "Álbum creado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al crear álbum",
                "error"
            );

        }

    }

    async function updateAlbum() {

        try {

            if (!validateAlbum()) {
                return;
            }

            await api.put(
                `/albums/${id}`,
                {
                    id: Number(id),
                    userId: Number(userId),
                    title
                }
            );

            await dispatch(
                fetchAlbums()
            );

            showSnackbar(
                "Álbum actualizado correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al actualizar álbum",
                "error"
            );

        }

    }

    async function deleteAlbum(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar este álbum?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/albums/${id}`
            );

            await dispatch(
                fetchAlbums()
            );

            showSnackbar(
                "Álbum eliminado correctamente",
                "success"
            );

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al eliminar álbum",
                "error"
            );

        }

    }

    function editAlbum(
        album: Album
    ) {

        setEditing(true);

        setId(
            album.id.toString()
        );

        setUserId(
            album.userId.toString()
        );

        setTitle(
            album.title
        );

        setOpen(true);

    }

    function newAlbum() {

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setOpen(true);

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");

        setUserId("");

        setTitle("");

        setUserIdError(false);

        setTitleError(false);

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Álbumes
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={newAlbum}
            >
                Nuevo Álbum
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

                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {albums.map(album => (

                                <TableRow
                                    key={album.id}
                                >

                                    <TableCell>
                                        {album.id}
                                    </TableCell>

                                    <TableCell>
                                        {album.userId}
                                    </TableCell>

                                    <TableCell>
                                        {album.title}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editAlbum(album)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deleteAlbum(
                                                    album.id
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
                        ? "Editar Álbum"
                        : "Nuevo Álbum"}

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
                                ? updateAlbum
                                : saveAlbum
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

export default AlbumsPage;