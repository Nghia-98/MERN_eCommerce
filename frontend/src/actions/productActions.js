import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants.js';
import { toast } from 'react-toastify';

export const listProducts =
  ({ keyword = '', pageNumber = 1 }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // there are 2 kind of error
      // 1. error from client, network err -> (use error.message)
      // 2. error response from backend server (http err response) -> (use error.response.data)

      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/products/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // call api delete product by id to backend server
    // eslint-disable-next-line
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/products/${productId}`,
      config
    );

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    toast.success('Delete product successfully');
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // call api create product to backend server
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/products/`,
      {},
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });

    dispatch({ type: PRODUCT_CREATE_RESET });
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // call api update product to backend server
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/products/${productData._id}`,
      productData,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.product });
    toast.success('Update product successfully');
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // eslint-disable-next-line
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/products/${productId}/reviews`,
        review,
        config
      );

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data.product });
      toast.success('Review submitted successfully');
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: errorMessage,
      });

      toast.error(errorMessage);
    }
  };

export const getTopRatingProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/products/top`
    );

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
