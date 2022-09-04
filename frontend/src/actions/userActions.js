import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from '../reducers/userReducers';

export const login = ( email, password ) => async (dispatch) => {
    try {

        //dispatch - the request
        dispatch(userLoginRequest());

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //we will make our requests
        const { data } = await axios.post(
            '/api/users/login',
            {email, password },
            config
        );

        //we want to dispatch our user login success
        dispatch(userLoginSuccess(data));

        //set our user to local storage
        //we want json.stringify because we are saving the local storage, so has to be a string pass in data
            //it is going to be the user object
        localStorage.setItem(`userInfo`, JSON.stringify(data))

    } catch (error) {
        dispatch(userLoginFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}
