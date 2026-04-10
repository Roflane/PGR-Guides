import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    imagePath: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action, rememberMe) => {
            state.isAuth = true;
            state.user = action.payload;
            state.imagePath = action.payload.imagePath;

            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        updateAvatar: (state, action) => {
            state.imagePath = action.payload.imagePath;
        },
    },
});

export const { loginSuccess, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
