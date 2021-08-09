import axios from 'axios';
import {
  AUTH_TOKEN_REQUEST,
  AUTH_TOKEN_SUCCESS,
  AUTH_TOKEN_FAIL,
} from '../constants/authTokenConstants';
import { USER_LOGIN_SUCCESS } from '../constants/userContants';
import { logout } from './userActions';

export const authTokenLogin = (token) => async (dispatch) => {
  console.log('authTokenLogin action', token);
  try {
    dispatch({ type: AUTH_TOKEN_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/authToken`,
      config
    );

    dispatch({ type: AUTH_TOKEN_SUCCESS, payload: data.token });
    localStorage.setItem('token', data.token);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log('authTokenAction', errorMessage);

    dispatch({
      type: AUTH_TOKEN_FAIL,
      payload: errorMessage,
    });

    // clear all localStorage
    dispatch(logout());
  }
};
