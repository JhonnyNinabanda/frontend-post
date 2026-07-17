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

import type { Album } from "../features/albums/albumTypes";

function AlbumsPage() {

    const [albums, setAlbums] =
        useState<Album[]>([]);

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

    useEffect(() => {

        loadAlbums();

    }, []);

    async function loadAlbums() {

        try {

            const response =
                await api.get("/albums");

            setAlbums(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function saveAlbum() {

        try {

            await api.post(
                "/albums",
                {
                    id: Number(id),
                    userId: Number(userId),
                    title
                }
            );

            await loadAlbums();

            closeDialog();

        } catch (error) {

            console.error(error);

        }

    }

    async function updateAlbum() {

        try {

            await api.put(
                `/albums/${id}`,
                {
                    id: Number(id),
                    userId: Number(userId),
                    title
                }
            );

            await loadAlbums();

            closeDialog();

        } catch (error) {

            console.error(error);

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

            await loadAlbums();

        } catch (error) {

            console.error(error);

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

        </Container>

    );

}

export default AlbumsPage;