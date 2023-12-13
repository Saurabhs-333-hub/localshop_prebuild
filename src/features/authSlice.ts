import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        user: null
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                value: {
                    isAuth: true,
                    user: action.payload
                }

            }
        },
        logout: (state) => {
            return {
                value: {
                    isAuth: false,
                    user: null
                }
            }
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer