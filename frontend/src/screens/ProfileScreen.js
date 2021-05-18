import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  // state of ProfileScreen component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // get data userDetails from redux state
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user,
  } = userDetails;

  // get data userLogin from redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // get data userUpdateProfile from redux state
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdateProfile,
    error: errorUpdateProfile,
    success,
  } = userUpdateProfile;

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

  //console.log('Above of useEffect has called !');

  useEffect(() => {
    //console.log('Inside useEffect has called !');

    // if user is not logged in
    if (!userInfo) {
      history.push('/login');
    } else {
      // if userDetails.user in redux state is emty
      if (!user.name) {
        // fetch user info from server to redux state (state.userDetails)
        dispatch(getUserDetails('profile'));
        //console.log('Dispatch Inside useEffect has called !');
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  //console.log('Below useEffect has called !');

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match !!!');
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {errorUserDetails && (
          <Message variant='danger'>{errorUserDetails}</Message>
        )}
        {errorUpdateProfile && (
          <Message variant='danger'>{errorUpdateProfile}</Message>
        )}
        {success && <Message variant='success'>Profile Updated</Message>}
        {(loadingUserDetails || loadingUpdateProfile) && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
