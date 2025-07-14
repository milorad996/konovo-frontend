import { createSlice } from "@reduxjs/toolkit";


const middlewareActions = {
    login() { },
};

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure(state, action) {
            state.token = null;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        ...middlewareActions,
    },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
