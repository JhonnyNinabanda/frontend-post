import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    CircularProgress
} from "@mui/material";

import api from "../api/api";

import {
    useAppDispatch,
    useAppSelector
} from "../app/hooks";

import {
    fetchUsers
} from "../features/users/usersSlice";

import type { Post }
    from "../features/posts/postTypes";

import type { Comment }
    from "../features/comments/commentTypes";

import type { Album }
    from "../features/albums/albumTypes";

import type { Photo }
    from "../features/photos/photoTypes";

import type { Todo }
    from "../features/todos/todoTypes";

function StatCard(
    props: {
        title: string;
        value: number;
    }
) {

    return (

        <Card
            sx={{
                width: 250,
                minHeight: 140
            }}
        >

            <CardContent>

                <Typography
                    variant="h5"
                >
                    {props.title}
                </Typography>

                <Typography
                    variant="h3"
                    sx={{ mt: 2 }}
                >
                    {props.value}
                </Typography>

            </CardContent>

        </Card>

    );

}

function HomePage() {

    const dispatch =
        useAppDispatch();

    const users =
        useAppSelector(
            state => state.users.users
        );

    const [posts, setPosts] =
        useState<Post[]>([]);

    const [comments, setComments] =
        useState<Comment[]>([]);

    const [albums, setAlbums] =
        useState<Album[]>([]);

    const [photos, setPhotos] =
        useState<Photo[]>([]);

    const [todos, setTodos] =
        useState<Todo[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        dispatch(
            fetchUsers()
        );

        const fetchStats = async () => {

            try {

                setLoading(true);

                const postsResponse =
                    await api.get("/posts");

                const commentsResponse =
                    await api.get("/comments");

                const albumsResponse =
                    await api.get("/albums");

                const photosResponse =
                    await api.get("/photos");

                const todosResponse =
                    await api.get("/todos");

                setPosts(
                    postsResponse.data
                );

                setComments(
                    commentsResponse.data
                );

                setAlbums(
                    albumsResponse.data
                );

                setPhotos(
                    photosResponse.data
                );

                setTodos(
                    todosResponse.data
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        void fetchStats();

    }, [dispatch]);

    if (loading) {

        return (

            <Container
                sx={{
                    mt: 8,
                    display: "flex",
                    justifyContent: "center"
                }}
            >

                <CircularProgress />

            </Container>

        );

    }

    return (

        <Container>

            <Typography
                variant="h3"
                sx={{
                    mt: 3,
                    mb: 4
                }}
            >
                Dashboard de Publicaciones
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3
                }}
            >

                <StatCard
                    title="Usuarios"
                    value={users.length}
                />

                <StatCard
                    title="Posts"
                    value={posts.length}
                />

                <StatCard
                    title="Comentarios"
                    value={comments.length}
                />

                <StatCard
                    title="Álbumes"
                    value={albums.length}
                />

                <StatCard
                    title="Fotos"
                    value={photos.length}
                />

                <StatCard
                    title="Tareas"
                    value={todos.length}
                />

            </Box>

        </Container>

    );

}

export default HomePage;