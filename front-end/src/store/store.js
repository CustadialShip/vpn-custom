import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const initialState = {
    auth: {
        token: localStorage.getItem('token') || null,
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: initialState,
});

export default store;