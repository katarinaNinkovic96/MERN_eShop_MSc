import { createSlice } from '@reduxjs/toolkit';

// get paypal ID
const paypalIdSlice = createSlice({
    name: 'paypal',
    initialState: {
    },
    reducers: {
        paypalIdRequest: (state) => {
            state.loading = true;
        },
        paypalIdSuccess: (state, action) => {
            state.ppId = action.payload;
            state.loading = false;
        },
        paypalIdFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        paypalIdReset: (state) => {
            state.error = false;
            state.loading = false;
        }
    }
});

export const paypalIdReducer = paypalIdSlice.reducer;
export const { paypalIdRequest, paypalIdSuccess, paypalIdFail, paypalIdReset } = paypalIdSlice.actions;
