import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "../containers/List/listSlice.ts";

export const store = configureStore({
    reducer: {
        list: listReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;