import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = (() => {
    try {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
})();

const initialState = {
    isAuthenticated: !!userFromStorage,
    user: userFromStorage,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, accessToken } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.accessToken = accessToken;
            localStorage.setItem('user', JSON.stringify(user));
        },

        tokenRefreshed: (state, action) => {
            const { accessToken, user } = action.payload;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            if (user) {
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user));
            }
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, tokenRefreshed, logout } = authSlice.actions;
export default authSlice.reducer;
