import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userContants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    // send email, password to login route in server
    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config
    );

    // dispatch action for save userInfo in redux state (state.userLogin)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // save userInfo after login success
    localStorage.setItem('userInfor', JSON.stringify(data));
  } catch (error) {
    // if err dispatch action to save err in redux state
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });

  localStorage.removeItem('userInfor');
};
