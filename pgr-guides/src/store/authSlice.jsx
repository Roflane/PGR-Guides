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
        loginSuccess: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
            state.imagePath = action.payload.imagePath;

            console.log(`payload: ${JSON.stringify(action.payload)}`);
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        updateAvatar: (state, action) => {
            state.imagePath = action.payload;
            if (state.user) {
                state.user.avatar = action.payload;
                localStorage.setItem('user', JSON.stringify(state.user));
            }
            localStorage.setItem('imagePath', action.payload);
        },
    },
});

export const { loginSuccess, logout, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
