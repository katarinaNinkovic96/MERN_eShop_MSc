import { createSlice } from '@reduxjs/toolkit';

// get paypal ID
const paypalIdSlice = createSlice({
    name: 'paypal',
    initialState: {
    },
    reducers: {
        paypalIdSuccess: (state, action) => {
            state.ppId = action.payload;
        },
        paypalIdFail: (state, action) => {
            state.error = action.payload;
        },
        paypalIdReset: (state) => {
            state.error = false;
        }
    }
});

export const paypalIdReducer = paypalIdSlice.reducer;
export const { paypalIdSuccess, paypalIdFail, paypalIdReset } = paypalIdSlice.actions;
