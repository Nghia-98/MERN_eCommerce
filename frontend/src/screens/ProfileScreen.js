import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getOrderListMy } from '../actions/orderActions';
import {
  GET_VERIFY_EMAIL_RESET,
  VERIFY_EMAIL_RESET,
} from '../constants/verifyEmailConstants';
import { getVerificationEmail } from '../actions/verifyEmailActions';
import { USER_DETAILS_RESET } from '../constants/userContants';

const ProfileScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  // state of ProfileScreen component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const emailVerification = useSelector((state) => state.emailVerification);
  const {
    loading: loadingVerify,
    success: successVerify,
    error: errorVerify,
    message: messageVerify,
    verifiedUser,
  } = emailVerification;

  // get data userDetails from redux state
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user: _userDetails,
  } = userDetails;
  const { isVerifiedEmail } = _userDetails;

  // prettier-ignore
  const getEmailVerification = useSelector((state) => state.getEmailVerification);
  const {
    loading: loadingGetEmail,
    success: successGetEmail,
    error: errorGetEmail,
  } = getEmailVerification;

  const { token: authToken } = useSelector((state) => state.authToken);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // get data userUpdateProfile from redux state
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdateProfile,
    error: errorUpdateProfile,
    success: successUpdate,
  } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: loadingOrderListMy,
    error: errorOrderListMy,
    orders,
  } = orderListMy;

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setMessage('Passwords do not match !!!');
    } else {
      setMessage(null);
    }
  };

  const confirmPasswordOnChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setMessage('Passwords do not match !!!');
    } else {
      setMessage(null);
    }
  };

  useEffect(() => {
    // user logged out
    if (!userInfo && !authToken) {
      history.push(`/login?redirect=${location.pathname}`);
      return;
    }

    if (successGetEmail) {
      toast.success(
        'The verification e-mail has been sent to your e-mail address!'
      );
      dispatch({ type: GET_VERIFY_EMAIL_RESET });
    }

    // initial value of successVerify is false
    if (successVerify) {
      toast.success(`${messageVerify}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: VERIFY_EMAIL_RESET });
      return;
    }

    if (errorVerify) {
      toast.error(`${errorVerify}`);
      dispatch({ type: VERIFY_EMAIL_RESET });
    }

    if (userInfo) {
      if (!_userDetails || !_userDetails.name) {
        if (loadingUserDetails || errorUserDetails) {
          return;
        } else {
          dispatch(getUserDetails('profile'));
        }
      } else {
        if (_userDetails.name !== userInfo.name) {
          dispatch(getUserDetails('profile'));
        } else {
          setName(_userDetails.name);
          setEmail(_userDetails.email);
        }
      }

      // orderListMy.orders in redux state is null/undefined
      if (!orders && !loadingOrderListMy) {
        dispatch(getOrderListMy());
        return;
      }
    }

    // eslint-disable-next-line
  }, [
    dispatch,
    history,
    location.pathname,
    authToken,
    userInfo,
    _userDetails,
    orders,
    successUpdate,
    successGetEmail,
    successVerify,
    errorVerify,
    verifiedUser,
    isVerifiedEmail,
    verifiedUser,
  ]);

  //console.log('Below useEffect has called !');

  const submitHandler = (e) => {
    console.log('submitHandler');
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match !!!');
    } else {
      dispatch(updateUserProfile({ name, password }));
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleSendVerifyEmail = (e) => {
    console.log('handleSendVerifyEmail');
    e.preventDefault();
    dispatch(getVerificationEmail());
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {(errorUserDetails || errorUpdateProfile || errorGetEmail) && (
          <Message variant='danger'>
            {errorUserDetails || errorUpdateProfile || errorGetEmail}
          </Message>
        )}

        {(loadingUserDetails ||
          loadingUpdateProfile ||
          loadingGetEmail ||
          loadingVerify) && <Loader />}

        {_userDetails && _userDetails.facebookId && (
          <Message>Login with Facebook account !</Message>
        )}
        {_userDetails && _userDetails.googleId && (
          <Message>Login with Google account !</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              disabled
              className='cursor-disabled'
            ></Form.Control>
            {_userDetails ? (
              <Message variant={!isVerifiedEmail ? 'warning' : 'success'}>
                {!isVerifiedEmail ? (
                  <>
                    <span style={{ fontSize: '12px' }}>Unverified: </span>
                    <button
                      type='button'
                      className='text-left btn-sm btn-verify-email'
                      onClick={handleSendVerifyEmail}
                    >
                      Send verification email
                    </button>
                  </>
                ) : (
                  <span>Verified</span>
                )}
              </Message>
            ) : (
              ''
            )}
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

          {_userDetails && !_userDetails.facebookId && !_userDetails.googleId && (
            <>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={passwordOnChangeHandler}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={confirmPasswordOnChangeHandler}
                ></Form.Control>
              </Form.Group>
            </>
          )}

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {loadingOrderListMy ? (
          <Loader />
        ) : errorOrderListMy ? (
          <Message variant='danger'>{errorOrderListMy}</Message>
        ) : !orders || orders.length === 0 ? (
          <Message variant='info'>You don't have any orders</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
