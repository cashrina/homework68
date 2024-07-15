import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";


export interface List {
    title: string;
    status: boolean;
}

export interface State {
    value: List;
    isLoading: boolean;
    error: boolean;
}

const initialState: State = {
    value: {
        title: '',
        status: true,
    },
    isLoading: false,
    error: false,
};

export const fetchTaskThunk: AsyncThunk<List | null, void, { state: RootState }> = createAsyncThunk(
    'task/fetch',
    async (_arg, thunkAPI) => {
        const taskList = thunkAPI.getState().list.value;
        const { data: task } = await axiosApi.put<List | null>('/task.json', taskList);
        return task || null;
    }
);

export const getListThunk: AsyncThunk<List | null, void, { state: RootState }> = createAsyncThunk(
    'task/lists',
    async () => {
        const { data: task } = await axiosApi.get<List | null>('/task.json');
        return task || null;
    }
);

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTaskThunk.pending, (state) => {
            state.error = false;
            state.isLoading = true;
        });
        builder.addCase(fetchTaskThunk.fulfilled, (state, action: PayloadAction<List | null>) => {
            state.isLoading = false;
            if (action.payload) {
                state.value = action.payload;
            }
        });
        builder.addCase(fetchTaskThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        });
        builder.addCase(getListThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getListThunk.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getListThunk.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const listReducer = listSlice.reducer;
