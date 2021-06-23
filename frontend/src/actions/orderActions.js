import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_CREATE_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const userLogin = getState().userLogin;
    const { userInfo } = userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, orderData, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    // there are 2 kind of error
    // 1. error from client ( -> use error.message)
    // 2. error response from defaultErrorHandler middleware on backend server (-> use error.response.data)
    // console.log({ ...error });
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

    // Reset orderCreate in redux -> get ready for create a new order
    dispatch({ type: ORDER_CREATE_RESET });
  } catch (err) {
    // there are 2 kind of error
    // 1. error from client ( -> use error.message)
    // 2. error response from defaultErrorHandler middleware on backend server (-> use error.response.data)
    // console.log({ ...error });
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // there are 2 kind of error
      // 1. error from client ( -> use error.message)
      // 2. error response from defaultErrorHandler middleware on backend server (-> use error.response.data)
      // console.log({ ...error });
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getOrderListMy = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    // there are 2 kind of error
    // 1. error from client, network err ( -> use error.message)
    // 2. error response from defaultErrorHandler middleware on backend server (-> use error.response.data)
    // console.log({ ...error });
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
