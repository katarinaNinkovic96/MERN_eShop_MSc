import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//login
const userLoginSlice = createSlice({
    name: 'users',
    initialState: {
        userInfo: userInfoFromStorage
    },
    reducers: {
        userLoginRequest: (state, action) => {
            state.loading = true;
        },
        userLoginSuccess: (state = { products: [] }, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userLoginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        }
    }
});

export const userLoginReducer = userLoginSlice.reducer;
export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userLoginSlice.actions;


//register
const userRegisterSlice = createSlice({
    name: 'users',
    initialState: {

    },
    reducers: {
        userRegisterRequest: (state, action) => {
            state.loading = true;
        },
        userRegisterSuccess: (state = { products: [] }, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const userRegisterReducer = userRegisterSlice.reducer;
export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } = userRegisterSlice.actions;

