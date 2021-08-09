import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  GET_VERIFY_EMAIL_REQUEST,
  GET_VERIFY_EMAIL_SUCCESS,
  GET_VERIFY_EMAIL_FAIL,
} from '../constants/verifyEmailConstants';
import axios from 'axios';

export const verifyEmail = (token) => async (dispatch, getState) => {
  console.log('verifyEmail action - token', token);

  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/account/verifyEmail/${token}`,
      config
    );

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log('verifyEmail action - error', errorMessage);

    dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload: errorMessage,
    });
  }
};

export const getVerificationEmail = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_VERIFY_EMAIL_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/account/verifyEmail`,
      config
    );

    dispatch({ type: GET_VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log('verifyEmail action - error', errorMessage);

    dispatch({
      type: GET_VERIFY_EMAIL_FAIL,
      payload: errorMessage,
    });
  }
};
