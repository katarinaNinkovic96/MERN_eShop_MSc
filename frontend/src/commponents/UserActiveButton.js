import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deactivateUser, reActivateUser } from '../actions/userActions';

const UserActiveButton = ({ user }) => {
    const dispatch = useDispatch();
    const style = { color: "black" };

    const clickHandler = () => {
        if (window.confirm("Are you sure?")) {
            if (user.isActive) {
                dispatch(deactivateUser(user._id));
            } else {
                dispatch(reActivateUser(user._id));
            }
        }
    }

    return <>
        { user.isAdmin ?
        <Button title="active" variant="success" disabled={true} className='btn-sm' >
            <i style={style} className="fas fa-sharp fa-solid fa-eye"></i>
        </Button> : user.isActive ?
        <Button title="deactivate account" variant="success" className='btn-sm' onClick={clickHandler}>
            <i style={style} className="fas fa-sharp fa-solid fa-eye"></i>
        </Button>  :
        <Button title="activate account" variant="danger" className='btn-sm' onClick={clickHandler}>
            <i style={style} className="fas fa-sharp fa-solid fa-eye-slash"></i>
        </Button> }
    </>;
}

export default UserActiveButton;
