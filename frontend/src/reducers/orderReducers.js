import { createSlice } from '@reduxjs/toolkit';

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
