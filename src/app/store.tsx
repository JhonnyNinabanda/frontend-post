import {
    configureStore
} from "@reduxjs/toolkit";

import usersReducer
    from "../features/users/usersSlice";
import albumsReducer
    from "../features/albums/albumsSlice";
import commentsReducer
    from "../features/comments/commentsSlice";
import photosReducer
    from "../features/photos/photosSlice";
import postsReducer
    from "../features/posts/postsSlice";
import todosReducer
    from "../features/todos/todosSlice";

export const store =
    configureStore({

        reducer: {

            users: usersReducer,

            albums: albumsReducer,

            comments: commentsReducer,

            photos: photosReducer,

            posts: postsReducer,

            todos: todosReducer

        }

    });

export type RootState =
    ReturnType<
        typeof store.getState
    >;

export type AppDispatch =
    typeof store.dispatch;