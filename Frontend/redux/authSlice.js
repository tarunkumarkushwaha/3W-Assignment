import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('token') || null,
        userName: localStorage.getItem('userName') || null,
        backendURL: "http://localhost:3000",
        loading: false,
        dark: localStorage.getItem('theme') === 'dark',
    },
    reducers: {
        setAuth: (state, action) => {
            state.accessToken = action.payload.token;
            state.userName = action.payload.username;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userName', action.payload.username);
        },
        logout: (state) => {
            state.accessToken = null;
            state.userName = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        themeChange: (state) => {
            state.dark = !state.dark;
            localStorage.setItem('theme', state.dark ? 'dark' : 'light');
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setAuth, logout, themeChange, setLoading, setUserName } = authSlice.actions;
export default authSlice.reducer;