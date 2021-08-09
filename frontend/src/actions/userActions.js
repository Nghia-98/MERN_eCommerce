import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userContants';
import axios from 'axios';
import {
  ORDER_DETAILS_RESET,
  ORDER_LIST_MY_RESET,
} from '../constants/orderConstants';
import { toast } from 'react-toastify';
import { CART_INFO_RESET } from '../constants/cartConstants';
import { AUTH_TOKEN_SUCCESS } from '../constants/authTokenConstants';
import { VERIFY_EMAIL_RESET } from '../constants/verifyEmailConstants';

export const login = (dataObj) => async (dispatch) => {
  const { email, password, token } = dataObj;
  let userInfoResponse;

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    if (token) {
      // user login by social account
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // send token contains social_account_info in req.header to server
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/loginSocial`,
        config
      );
      console.log('userInfo login:', data);

      userInfoResponse = data;
    } else {
      // user login by email, password
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/login`,
        { email, password },
        config
      );

      userInfoResponse = data;
    }

    // dispatch action for save userInfo in redux state (state.userLogin)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfoResponse });
    //localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));

    dispatch({ type: AUTH_TOKEN_SUCCESS, payload: userInfoResponse.token });
    localStorage.setItem('token', userInfoResponse.token);
  } catch (error) {
    // there are 2 kind of error
    // 1. error from client, network error ( -> use error.message)
    // 2. error response from backend server (http error response) (-> use error.response.data)

    // if err dispatch action to save err in redux state
    console.log('login reducer', error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// logout action
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: CART_INFO_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: ORDER_DETAILS_RESET });
  dispatch({ type: VERIFY_EMAIL_RESET });
  dispatch({ type: USER_LOGOUT });
};

// register action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // send email, password to login route in server
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users`,
      { name, email, password },
      config
    );

    // dispatch action for save userInfo in redux state (state.userLogin)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    //localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch({ type: AUTH_TOKEN_SUCCESS, payload: data.token });
    localStorage.setItem('token', data.token);
  } catch (error) {
    // if err dispatch action to save err in redux state
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user details action
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (id === 'profile') {
      // call route /api/users/profile -> get user details of user login (ProfileScreen)
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/profile`,
        config
      );

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } else {
      // call route /api/users/:id -> admin get user details of any user (UserEditScreen)
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/${id}`,
        config
      );
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    }
  } catch (error) {
    // if err dispatch action to save err in redux state
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update user profile action
export const updateUserProfile =
  ({ name, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const { userInfo } = getState().userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/users/profile`,
        { name, password },
        config
      );

      // Dispatch action for save user info in redux state (reduxState.userUpdateProfile)
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      toast.success('Profile updated successfully!');

      // After update user info success, we must update userInfo in others field of reduxState & localStorage
      // update reduxState.userLogin -> This help update user_name in Navbar
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      //localStorage.setItem('userInfo', JSON.stringify(data));

      dispatch({ type: AUTH_TOKEN_SUCCESS, payload: data.token });
      localStorage.setItem('token', data.token);

      // update reduxState.userDetails -> This help update info of form in ProfileScreen;
      const userDetails = { ...data };
      delete userDetails.token;
      dispatch({ type: USER_DETAILS_SUCCESS, payload: userDetails });

      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } catch (error) {
      // if err dispatch action to save err in redux state
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getListUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/`,
      config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // eslint-disable-next-line
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/${userId}`,
      config
    );

    dispatch({ type: USER_DELETE_SUCCESS });
    toast.success('User deleted successfully!');
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/users/${userData._id}`,
      userData,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    toast.success('User updated successfully!');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
