import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staus: "",
    error: "",
    user: {
        id: "",
        name: "Ashutosh",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
}

export const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.staus = "";
            state.error = ""
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            }
        }
    }


})

export const { logout } = userSlice.actions
export default userSlice.reducer