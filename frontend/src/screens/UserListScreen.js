import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import { listUsers } from '../actions/userActions';
// import { deleteUser } from '../actions/userActions';
import { userManipulateReset } from '../reducers/userReducers';
// component
import UserActiveButton from '../commponents/UserActiveButton'

const UserListScreen = ({ history } ) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    //because we want the user who does't admin block to see this page, if else down
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userManipulate = useSelector(state => state.userManipulate);
    const { success: successManipulate, error: errorManipulate, loading: loadingManipulate  } = userManipulate;

    useEffect(() => {
        dispatch(userManipulateReset());

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            //if don't login and if don't admin
        } else {
            //redirect to login
            history.push('/login')
        }
       
    }, [dispatch, history, userInfo])

    // const deleteHandler = (id) => {
    //     if (window.confirm('Are you sure?')){
    //         dispatch(deleteUser(id))
    //     }
    // }

    return <>
        <h1>Users</h1>
        { (!loading && loadingManipulate) ?
        <Loader /> : errorManipulate ?
        <Message variant='danger'>{errorManipulate}</Message> : successManipulate ?
        <Message variant='success'>{successManipulate}</Message> : <></> }
        { loading ?
        <Loader /> : error ?
        <Message variant='danger'>{error}</Message> :
        <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>
                            { user.isAdmin ?
                            <i className='fas fa-check' style={{ color: 'green' }}></i> :
                            <i className='fas fa-times' style={{ color: 'red' }}></i> }
                        </td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <UserActiveButton user={user}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table> }
    </>;
}

export default UserListScreen;
