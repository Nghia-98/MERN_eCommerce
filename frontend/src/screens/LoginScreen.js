import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { verifyEmail } from '../actions/verifyEmailActions';

const LoginScreen = (props) => {
  const { history, location } = props;
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //#region
  // const emailVerification = useSelector((state) => state.emailVerification);
  // const {
  //   loading: loadingVerify,
  //   success: successVerify,
  //   error: errorVerify,
  //   message: messageVerify,
  //   verifiedUser,
  // } = emailVerification;
  //#endregion

  // const redirect = location.search ? location.search.split('=')[1] : '/';
  // or
  const searchString = location.search; // the string part of URL, after character '?'
  const searchParams = new URLSearchParams(searchString);

  const redirect = searchParams.has('redirect')
    ? searchParams.get('redirect')
    : '/';

  const verifyEmailToken = searchParams.has('verifyEmailToken')
    ? searchParams.get('verifyEmailToken')
    : '';

  useEffect(() => {
    //#region
    /* initial value of successVerify is false
    if (successVerify) {
      toast.success(`${messageVerify}`);
      history.push('/profile');
      return;
    }

    if (errorVerify) {
      toast.error(`${errorVerify}`);
      history.push('/profile');
      return;
    } */
    //#endregion

    //login successfully
    if (userInfo) {
      if (verifyEmailToken) {
        history.push('/profile');
        dispatch(verifyEmail(verifyEmailToken));
        return;
      } else {
        history.push(redirect);
        return;
      }
    }
    return () => {
      //
    };
  }, [dispatch, history, userInfo, redirect, verifyEmailToken]);

  const responseFacebook = (dataResponse) => {
    console.log('Facebook-callback-data', dataResponse);

    const data = {
      email: dataResponse.email,
      username: dataResponse.name,
      facebookId: dataResponse.userID,
    };

    if (data.email) {
      console.log('handleLoginSocial has called!');
      handleLoginSocial(data);
    } else {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: 'Cannot access to your Facebook email !',
      });
    }
  };

  const responseGoogle = (dataResponse) => {
    console.log('Google-callback-data', dataResponse);
    const data = {
      email: dataResponse.profileObj.email,
      username: dataResponse.profileObj.name,
      googleId: dataResponse.profileObj.googleId,
    };

    if (data.email) {
      console.log('handleLoginSocial has called!');
      handleLoginSocial(data);
    } else {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: 'Cannot access to your Google email !',
      });
    }
  };

  const handleLoginSocial = async (_data) => {
    console.log('Body token login', _data);
    try {
      const token = await jwt.sign(
        _data,
        process.env.REACT_APP_JWT_SECRET || process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
      console.log('Social Login token', token);

      dispatch(login({ token }));
    } catch (error) {
      // dispatch action USER_LOGIN_FAIL with error
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      {verifyEmailToken ? (
        <h1>Sing In To Active Your Account</h1>
      ) : (
        <h1>Sign In</h1>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' block>
          Continue
        </Button>
      </Form>

      <Row>
        <Col>
          <p className='text-center my-3'>or Connect With Social Media</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <FacebookLogin
            appId='231911432117995'
            cssClass='btn__social btn__facebook'
            textButton='Login With Facebook'
            fields='name,email,picture'
            disableMobileRedirect={true}
            callback={responseFacebook}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <GoogleLogin
            clientId='345201133892-pmeecrimpngn094rtio9jjisl8hon28r.apps.googleusercontent.com'
            render={(renderProps) => (
              <button
                className='btn__social btn__google'
                onClick={renderProps.onClick}
              >
                Login With Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Col>
      </Row>

      <Row className='mt-3 py-2'>
        <Col>
          New Customer ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
