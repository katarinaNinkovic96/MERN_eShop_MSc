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
        userLoginSuccess: (state, action) => {
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
        userRegisterSuccess: (state, action) => {
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


//details
const userDetailsSlice = createSlice({
    name: 'users',
    initialState: {
        user: {}
    },
    reducers: {
        userDetailsRequest: (state = { user: {}} , action) => {
            state.loading = true
        },
        userDetailsSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const userDetailsReducer = userDetailsSlice.reducer;
export const { userDetailsRequest, userDetailsSuccess, userDetailsFail } = userDetailsSlice.actions;
