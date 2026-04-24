"use client"
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "@/types/User"; // Adjust the path as necessary

interface AuthState {
    email: string,
    password: string,
    token?: string | null,
    loading?: boolean,
    error?: string | null
    userData?: IUser | null


}

const initialState: AuthState = {
    email: "",
    password: "",
    token: null,
    loading: false,
    error: null,
    userData: null,
}


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            return data; // expects { token: "...", user: {...} }
        }
        catch (error: unknown) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }

    }

);




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        resetForm(state) {
            state.email = "";
            state.password = "";
        },
        logout(state) {
            state.token = null;
            state.email = "";
            state.password = "";
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.password = ""; // clear password after login
                state.userData = action.payload.user; // store user data
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },

})


export const { setEmail, setPassword, resetForm, logout } = authSlice.actions;
export default authSlice.reducer;