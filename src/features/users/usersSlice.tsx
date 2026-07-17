import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { User }
    from "./usersTypes";

import api from "../../api/api";

export const fetchUsers =
    createAsyncThunk<User[]>(
        "users/fetchUsers",

        async () => {

            const response =
                await api.get("/users");

            return response.data;

        }
    );

interface UsersState {

    users: User[];

    loading: boolean;

}

const initialState: UsersState = {

    users: [],

    loading: false

};

const usersSlice =
    createSlice({

        name: "users",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchUsers.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchUsers.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.users =
                            action.payload;

                    }
                )

                .addCase(
                    fetchUsers.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default usersSlice.reducer;