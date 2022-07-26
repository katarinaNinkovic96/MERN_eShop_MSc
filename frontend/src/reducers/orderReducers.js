import { createSlice } from '@reduxjs/toolkit';


//create order
const orderCreateSlice = createSlice({
    name: 'order',
    initialState: {

    },
    reducers: {
        orderCreateRequest: (state) => {
            state.loading = true;
            state.error = false;
        },
        orderCreateSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },
        orderCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderCreateReset: (state) => {
            state.loading = false;
            state.error = false;
        }
    }
});

export const orderCreateReducer = orderCreateSlice.reducer;
export const { orderCreateRequest, orderCreateSuccess, orderCreateFail, orderCreateReset } = orderCreateSlice.actions;



//delete order
const orderDeleteSlice = createSlice({
    name: 'order',
    initialState: {
    },
    reducers: {
        orderDeleteRequest: (state) => {
            state.loading = true;
        },
        orderDeleteSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        orderDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const orderDeleteReducer = orderDeleteSlice.reducer;
export const { orderDeleteRequest, orderDeleteSuccess, orderDeleteFail } = orderDeleteSlice.actions;



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
        },
        orderDetailsReset: (state) => {
            state.loading = false;
            state.error = false;
        }
    }
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, orderDetailsReset } = orderDetailsSlice.actions;


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


//order deliver
const orderDeliverSlice = createSlice({
    name: 'order',
    initialState: {
    },
    reducers: {
        orderDeliverRequest: (state, action) => {
            state.loading = true;
        },
        orderDeliverSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        orderDeliverFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderDeliverReset: (state, action) => {
            state.success = false;
            //return {}
        }
    }
});

export const orderDeliverReducer = orderDeliverSlice.reducer;
export const { orderDeliverRequest, orderDeliverSuccess, orderDeliverFail, orderDeliverReset } = orderDeliverSlice.actions;



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


//list of all order
const orderListSlice = createSlice({
    name: 'order',
    initialState: {
        orders: []
    },
    reducers: {
        orderListRequest: (state, action) => {
            state.loading = true;
        },
        orderListSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        orderListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const orderListReducer = orderListSlice.reducer;
export const { orderListRequest, orderListSuccess, orderListFail } = orderListSlice.actions;
