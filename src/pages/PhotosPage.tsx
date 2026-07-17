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
    TextField
} from "@mui/material";

import api from "../api/api";

import type { Photo } from "../features/photos/photoTypes";

function PhotosPage() {

    const [photos, setPhotos] =
        useState<Photo[]>([]);

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

    useEffect(() => {

        loadPhotos();

    }, []);

    async function loadPhotos() {

        try {

            const response =
                await api.get("/photos");

            setPhotos(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function savePhoto() {

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

            await loadPhotos();

            closeDialog();

        } catch (error) {

            console.error(error);

        }

    }

    async function updatePhoto() {

        try {

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

            await loadPhotos();

            closeDialog();

        } catch (error) {

            console.error(error);

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

            await loadPhotos();

        } catch (error) {

            console.error(error);

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

        </Container>

    );

}

export default PhotosPage;