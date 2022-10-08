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
        userLoginRequest: (state) => {
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
        },
        userLoginReset: (state) => {
            state.loading = false;
            state.error = false;
        }
    }
});

export const userLoginReducer = userLoginSlice.reducer;
export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout, userLoginReset } = userLoginSlice.actions;


//register
const userRegisterSlice = createSlice({
    name: 'users',
    initialState: {
    },
    reducers: {
        userRegisterRequest: (state) => {
            state.loading = true;
        },
        userRegisterSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userRegisterReset: (state) => {
            state.loading = false;
            state.error = false;
        }
    }
});

export const userRegisterReducer = userRegisterSlice.reducer;
export const { userRegisterRequest, userRegisterSuccess, userRegisterFail, userRegisterReset } = userRegisterSlice.actions;


//details
const userDetailsSlice = createSlice({
    name: 'users',
    initialState: {
        user: {}
    },
    reducers: {
        userDetailsRequest: (state, action) => {
            //...state
            state.loading = true;
        },
        userDetailsSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userDetailsReset: (state, action) => {
            state.user = {};
        }
    }
});

export const userDetailsReducer = userDetailsSlice.reducer;
export const { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset } = userDetailsSlice.actions;



//UpdateProfile
const userUpdateProfileSlice = createSlice({
    name: 'users',
    initialState: {
       
    },
    reducers: {
        userUpdateProfileRequest: (state, action) => {
            state.loading = true
        },
        userUpdateProfileSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload;
        },
        userUpdateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateProfileReset: (state, action) => {
            state.success = false;
            //return {}
        }
    }
});

export const userUpdateProfileReducer = userUpdateProfileSlice.reducer;
export const { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail, userUpdateProfileReset } = userUpdateProfileSlice.actions;


//List users
const userListSlice = createSlice({
    name: 'users',
    initialState: {
       users: []
    },
    reducers: {
        userListRequest: (state, action) => {
            state.loading = true
        },
        userListSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        userListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userListReset: (state, action) => {
            state.success = false;
        }
    }
});

export const userListReducer = userListSlice.reducer;
export const { userListRequest, userListSuccess, userListFail, userListReset } = userListSlice.actions;


//Delete user
const userDeleteSlice = createSlice({
    name: 'users',
    initialState: {
      
    },
    reducers: {
        userDeleteRequest: (state, action) => {
            state.loading = true
        },
        userDeleteSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        userDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const userDeleteReducer = userDeleteSlice.reducer;
export const { userDeleteRequest, userDeleteSuccess, userDeleteFail } = userDeleteSlice.actions;



//Update user
const userUpdateSlice = createSlice({
    name: 'users',
    initialState: {
      user: {}
    },
    reducers: {
        userUpdateRequest: (state, action) => {
            state.loading = true
        },
        userUpdateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        userUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateReset: (state, action) => {
            state.success = false;
        }
    }
});

export const userUpdateReducer = userUpdateSlice.reducer;
export const { userUpdateRequest, userUpdateSuccess, userUpdateFail, userUpdateReset } = userUpdateSlice.actions;