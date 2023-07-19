import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";


const rootReduser = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: rootReduser,
    devTools: true,
})