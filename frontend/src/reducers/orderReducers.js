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
