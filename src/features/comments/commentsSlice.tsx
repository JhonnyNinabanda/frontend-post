import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { Comment }
    from "./commentTypes";

import api from "../../api/api";

export const fetchComments =
    createAsyncThunk<Comment[]>(
        "comments/fetchComments",

        async () => {

            const response =
                await api.get("/comments");

            return response.data;

        }
    );

interface CommentsState {

    comments: Comment[];

    loading: boolean;

}

const initialState: CommentsState = {

    comments: [],

    loading: false

};

const commentsSlice =
    createSlice({

        name: "comments",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchComments.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchComments.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.comments =
                            action.payload;

                    }
                )

                .addCase(
                    fetchComments.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default commentsSlice.reducer;
