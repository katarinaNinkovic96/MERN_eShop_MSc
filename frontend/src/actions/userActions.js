import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from '../reducers/userReducers';
import { userRegisterRequest, userRegisterSuccess, userRegisterFail } from '../reducers/userReducers';


//login
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



//logout
export const logout = () => async (dispatch) => {
    //remove from localStorage
    localStorage.removeItem('userInfo')
    //we want to dispatch our user logout
    dispatch(userLogout());
}



//register
export const register = ( name, email, password ) => async (dispatch) => {
    try {

        //dispatch - the request
        dispatch(userRegisterRequest());

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //we will make our requests
        //post request
        //we want to pass in, want name, email, pass
        const { data } = await axios.post(
            //'/api/users' - where we made/created the row
            '/api/users',
            { name, email, password },
            config
        );

        //we want to dispatch our user login success
        //we're going to pass the data, get in as the payload
        dispatch(userRegisterSuccess(data));

        //is log the user in right away when they register 
        //when we login pr when we regoster, we're getting the same thing back, the user data with the token
        dispatch(userLoginSuccess(data));

        //set our user to local storage
        //we want json.stringify because we are saving the local storage, so has to be a string pass in data
            //it is going to be the user object
        localStorage.setItem(`userInfo`, JSON.stringify(data))

    } catch (error) {
        dispatch(userRegisterFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

