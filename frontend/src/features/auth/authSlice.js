import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userRole: 'guest',
        accessToken: '',
        userData: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.user;
            state.userRole = action.payload.userRole;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userRole = 'guest';
            state.userData = null;
            state.accessToken = ''
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;