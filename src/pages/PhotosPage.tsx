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

import type { Photo } from "../features/photos/photoTypes";

import {
    fetchPhotos
} from "../features/photos/photosSlice";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import AppSnackbar from "../components/AppSnackbar";

function PhotosPage() {

    const dispatch =
        useAppDispatch();

    const photos =
        useAppSelector(
            state => state.photos.photos
        );

    const loading =
        useAppSelector(
            state => state.photos.loading
        );

    const [open, setOpen] =
        useState(false);

    const [editing, setEditing] =
        useState(false);

    const [id, setId] =
        useState("");

    const [albumId, setAlbumId] =
        useState("");

    const [title, setTitle] =
        useState("");

    const [url, setUrl] =
        useState("");

    const [thumbnailUrl, setThumbnailUrl] =
        useState("");

    const [albumIdError, setAlbumIdError] =
        useState(false);

    const [titleError, setTitleError] =
        useState(false);

    const [urlError, setUrlError] =
        useState(false);

    const [thumbnailUrlError, setThumbnailUrlError] =
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

    function validatePhoto() {

        let valid = true;

        setAlbumIdError(false);
        setTitleError(false);
        setUrlError(false);
        setThumbnailUrlError(false);

        if (!albumId.trim()) {

            setAlbumIdError(true);

            showSnackbar(
                "El albumId es obligatorio",
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

        if (!url.trim()) {

            setUrlError(true);

            showSnackbar(
                "La URL es obligatoria",
                "warning"
            );

            valid = false;

        }

        if (!thumbnailUrl.trim()) {

            setThumbnailUrlError(true);

            showSnackbar(
                "La thumbnail URL es obligatoria",
                "warning"
            );

            valid = false;

        }

        return valid;

    }

    useEffect(() => {

        dispatch(
            fetchPhotos()
        );

    }, [dispatch]);

    async function savePhoto() {

        if (!validatePhoto()) {
            return;
        }

        try {

            await api.post(
                "/photos",
                {
                    id: Number(id),
                    albumId: Number(albumId),
                    title,
                    url,
                    thumbnailUrl
                }
            );

            await dispatch(
                fetchPhotos()
            );

            showSnackbar(
                "Foto creada correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al crear foto",
                "error"
            );

        }

    }

    async function updatePhoto() {

        try {

            if (!validatePhoto()) {
                return;
            }

            await api.put(
                `/photos/${id}`,
                {
                    id: Number(id),
                    albumId: Number(albumId),
                    title,
                    url,
                    thumbnailUrl
                }
            );

            await dispatch(
                fetchPhotos()
            );

            showSnackbar(
                "Foto actualizada correctamente",
                "success"
            );

            closeDialog();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al actualizar foto",
                "error"
            );

        }

    }

    async function deletePhoto(
        id: number
    ) {

        const confirmed =
            window.confirm(
                "¿Desea eliminar esta foto?"
            );

        if (!confirmed) {

            return;

        }

        try {

            await api.delete(
                `/photos/${id}`
            );

            await dispatch(
                fetchPhotos()
            );

            showSnackbar(
                "Foto eliminado correctamente",
                "success"
            );

        } catch (error) {

            console.error(error);

            showSnackbar(
                "Error al eliminar foto",
                "error"
            );

        }

    }

    function editPhoto(
        photo: Photo
    ) {

        setEditing(true);

        setId(
            photo.id.toString()
        );

        setAlbumId(
            photo.albumId.toString()
        );

        setTitle(
            photo.title
        );

        setUrl(
            photo.url
        );

        setThumbnailUrl(
            photo.thumbnailUrl
        );

        setOpen(true);

    }

    function newPhoto() {

        setEditing(false);

        setId("");

        setAlbumId("");

        setTitle("");

        setUrl("");

        setThumbnailUrl("");

        setOpen(true);

    }

    function closeDialog() {

        setOpen(false);

        setEditing(false);

        setId("");

        setAlbumId("");

        setTitle("");

        setUrl("");

        setThumbnailUrl("");

        setAlbumIdError(false);

        setTitleError(false);

        setUrlError(false);

        setThumbnailUrlError(false);

    }

    return (

        <Container>

            <Typography
                variant="h4"
                sx={{ mt: 3, mb: 3 }}
            >
                Fotos
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={newPhoto}
            >
                Nueva Foto
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

                                <TableCell>Album ID</TableCell>

                                <TableCell>Título</TableCell>

                                <TableCell>URL</TableCell>

                                <TableCell>Thumbnail URL</TableCell>

                                <TableCell>Acciones</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {photos.map(photo => (

                                <TableRow
                                    key={photo.id}
                                >

                                    <TableCell>
                                        {photo.id}
                                    </TableCell>

                                    <TableCell>
                                        {photo.albumId}
                                    </TableCell>

                                    <TableCell>
                                        {photo.title}
                                    </TableCell>

                                    <TableCell>
                                        {photo.url}
                                    </TableCell>

                                    <TableCell>
                                        {photo.thumbnailUrl}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                editPhoto(photo)
                                            }
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                deletePhoto(
                                                    photo.id
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
                        ? "Editar Foto"
                        : "Nueva Foto"}

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
                        label="Album ID"
                        fullWidth
                        margin="dense"
                        value={albumId}
                        error={albumIdError}
                        helperText={
                            albumIdError
                                ? "Ingrese un albumId"
                                : ""
                        }
                        onChange={(e) =>
                            setAlbumId(
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
                        label="URL"
                        fullWidth
                        margin="dense"
                        value={url}
                        error={urlError}
                        helperText={
                            urlError
                                ? "Ingrese una URL"
                                : ""
                        }
                        onChange={(e) =>
                            setUrl(
                                e.target.value
                            )
                        }
                    />

                    <TextField
                        label="Thumbnail URL"
                        fullWidth
                        margin="dense"
                        value={thumbnailUrl}
                        error={thumbnailUrlError}
                        helperText={
                            thumbnailUrlError
                                ? "Ingrese una thumbnail URL"
                                : ""
                        }
                        onChange={(e) =>
                            setThumbnailUrl(
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
                                ? updatePhoto
                                : savePhoto
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

export default PhotosPage;