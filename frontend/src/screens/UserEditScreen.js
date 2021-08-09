import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from '../constants/userContants';
import FormContainer from '../components/FormContainer';

const UserEditScreen = (props) => {
  const { location, history, match } = props;

  const userId = match.params.id;

  const dispatch = useDispatch();

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: _userDetails } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: userUpdateLoading,
    error: userUpdateError,
    success: userUpdateSuccess,
  } = userUpdate;

  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // user logged out
    if (!userInfo && !authToken) {
      history.push(`/login?redirect=${location.pathname}`);
    }

    if (userInfo) {
      if (!userInfo.isAdmin) {
        history.push('/');
      }

      // userDetails.user === null/underfined || userDetails.user does not match the user we ưant edit
      // the user we ưant edit has the id that match the id param in the url
      if (!_userDetails || !_userDetails.name || userId !== _userDetails._id) {
        dispatch(getUserDetails(userId));
      } else {
        // userDetails is alright
        setName(_userDetails.name);
        setIsAdmin(_userDetails.isAdmin);
      }
    }

    if (userUpdateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      history.push('/admin/userlist');
    }
  }, [
    dispatch,
    location.pathname,
    history,
    authToken,
    userInfo,
    _userDetails,
    userId,
    userUpdateSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        <i className='fas fa-arrow-left'> Go Back</i>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {userUpdateLoading && <Loader />}
        {userUpdateError && (
          <Message variant='danger'>{userUpdateError}</Message>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {_userDetails.facebookId && (
              <Form.Group>
                <Message>Sign up with Facebook account !</Message>
              </Form.Group>
            )}
            {_userDetails.googleId && (
              <Form.Group>
                <Message>Sign up with Google account !</Message>
              </Form.Group>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  value={_userDetails.email}
                  disabled
                  className='cursor-disabled'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
