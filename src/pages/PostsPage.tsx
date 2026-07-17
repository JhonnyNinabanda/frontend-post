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

import type { Post } from "../features/posts/postTypes";

function PostsPage() {

    const [posts, setPosts] =
        useState<Post[]>([]);

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

    useEffect(() => {

        loadPosts();

    }, []);

    async function loadPosts() {

        try {

            const response =
                await api.get("/posts");

            setPosts(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function savePost() {

        try {

            await api.post(
                "/posts",
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    body
                }
            );

            await loadPosts();

            closeDialog();

        } catch (error) {

            console.error(error);

        }

    }

    async function updatePost() {

        try {

            await api.put(
                `/posts/${id}`,
                {
                    id: Number(id),
                    userId: Number(userId),
                    title,
                    body
                }
            );

            await loadPosts();

            closeDialog();

        } catch (error) {

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

            await loadPosts();

        } catch (error) {

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

                    <TextField
                        label="Contenido"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={body}
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

        </Container>

    );

}

export default PostsPage;