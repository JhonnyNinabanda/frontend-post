import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { Post }
    from "./postTypes";

import api from "../../api/api";

export const fetchPosts =
    createAsyncThunk<Post[]>(
        "posts/fetchPosts",

        async () => {

            const response =
                await api.get("/posts");

            return response.data;

        }
    );

interface PostsState {

    posts: Post[];

    loading: boolean;

}

const initialState: PostsState = {

    posts: [],

    loading: false

};

const postsSlice =
    createSlice({

        name: "posts",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchPosts.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchPosts.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.posts =
                            action.payload;

                    }
                )

                .addCase(
                    fetchPosts.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default postsSlice.reducer;
