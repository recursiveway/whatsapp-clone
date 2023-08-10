import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;
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

export const registerUser = createAsyncThunk(
    "auth/register",
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
                ...values,
            });
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.error.message);
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/login",
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
                ...values,
            });
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.error.message);
        }
    }
)


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
        },
        changeStatus: (state, action) => {
            state.staus = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.staus = "loading"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.staus = "succeeded";
                state.user = action.payload.user

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.staus = "failed"
                state.error = action.payload
            }).addCase(loginUser.pending, (state, action) => {
                state.staus = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.staus = "succeeded";
                state.user = action.payload.user

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.staus = "failed"
                state.error = action.payload
            })
    },


})

export const { logout, changeStatus } = userSlice.actions
export default userSlice.reducer