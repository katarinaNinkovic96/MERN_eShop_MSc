import { createSlice } from '@reduxjs/toolkit';


//create order
const orderCreateSlice = createSlice({
    name: 'order',
    initialState: {

    },
    reducers: {
        orderCreateRequest: (state, action) => {
            state.loading = true;
        },
        orderCreateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        orderCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});


export const orderCreateReducer = orderCreateSlice.reducer;
export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } = orderCreateSlice.actions;



//details order
const orderDetailsSlice = createSlice({
    name: 'order',
    initialState: {
        loading: true,
        orderItems: [],
        shippingAddress: {}
    },
    reducers: {
        orderDetailsRequest: (state, action) => {
            state.loading = true;
        },
        orderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } = orderDetailsSlice.actions;


//order pay
const orderPaySlice = createSlice({
    name: 'order',
    initialState: {
    },
    reducers: {
        orderPayRequest: (state, action) => {
            state.loading = true;
        },
        orderPaySuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        orderPayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderPayReset: (state, action) => {
            state.success = false;
            //return {}
        }
    }
});

export const orderPayReducer = orderPaySlice.reducer;
export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } = orderPaySlice.actions;

//list of my order
const orderListMySlice = createSlice({
    name: 'order',
    initialState: {
        orders: []
    },
    reducers: {
        orderListMyRequest: (state, action) => {
            state.loading = true;
        },
        orderListMySuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        orderListMyFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderListMyReset: (state, action) => {
            state.orders = [];
        }
    }
});

export const orderListMyReducer = orderListMySlice.reducer;
export const { orderListMyRequest, orderListMySuccess, orderListMyFail, orderListMyReset } = orderListMySlice.actions;
