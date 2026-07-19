import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import type { Todo }
    from "./todoTypes";

import api from "../../api/api";

export const fetchTodos =
    createAsyncThunk<Todo[]>(
        "todos/fetchTodos",

        async () => {

            const response =
                await api.get("/todos");

            return response.data;

        }
    );

interface TodosState {

    todos: Todo[];

    loading: boolean;

}

const initialState: TodosState = {

    todos: [],

    loading: false

};

const todosSlice =
    createSlice({

        name: "todos",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchTodos.pending,
                    (state) => {

                        state.loading =
                            true;

                    }
                )

                .addCase(
                    fetchTodos.fulfilled,
                    (state, action) => {

                        state.loading =
                            false;

                        state.todos =
                            action.payload;

                    }
                )

                .addCase(
                    fetchTodos.rejected,
                    (state) => {

                        state.loading =
                            false;

                    }
                );

        }

    });

export default todosSlice.reducer;
