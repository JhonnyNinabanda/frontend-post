import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { Album }
    from "./albumTypes";

import api from "../../api/api";

export const fetchAlbums =
    createAsyncThunk<Album[]>(
        "albums/fetchAlbums",

        async () => {

            const response =
                await api.get("/albums");

            return response.data;

        }
    );

interface AlbumsState {

    albums: Album[];

    loading: boolean;

}

const initialState: AlbumsState = {

    albums: [],

    loading: false

};

const albumsSlice =
    createSlice({

        name: "albums",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchAlbums.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchAlbums.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.albums =
                            action.payload;

                    }
                )

                .addCase(
                    fetchAlbums.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default albumsSlice.reducer;
