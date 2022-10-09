import axios from 'axios';
import { paypalIdRequest, paypalIdSuccess, paypalIdFail } from '../reducers/paypalIdReducer';

export const getPaypalId = () => async (dispatch) => {
    try {
        dispatch(paypalIdRequest());

        const { data } = await axios.get('/api/config/paypal');

        dispatch(paypalIdSuccess(data));
    } catch (error) {
        dispatch(paypalIdFail(error));
    }
}
