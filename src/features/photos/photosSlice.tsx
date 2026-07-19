import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { Photo }
    from "./photoTypes";

import api from "../../api/api";

export const fetchPhotos =
    createAsyncThunk<Photo[]>(
        "photos/fetchPhotos",

        async () => {

            const response =
                await api.get("/photos");

            return response.data;

        }
    );

interface PhotosState {

    photos: Photo[];

    loading: boolean;

}

const initialState: PhotosState = {

    photos: [],

    loading: false

};

const photosSlice =
    createSlice({

        name: "photos",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchPhotos.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchPhotos.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.photos =
                            action.payload;

                    }
                )

                .addCase(
                    fetchPhotos.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default photosSlice.reducer;
