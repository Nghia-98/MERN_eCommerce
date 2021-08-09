import {
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_RESET,
  GET_VERIFY_EMAIL_REQUEST,
  GET_VERIFY_EMAIL_SUCCESS,
  GET_VERIFY_EMAIL_FAIL,
  GET_VERIFY_EMAIL_RESET,
} from '../constants/verifyEmailConstants';

export const emailVerificationReducers = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
        verifiedUser: action.payload.verifiedUser,
      };

    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case VERIFY_EMAIL_RESET:
      return { loading: false, success: false };

    default:
      return { ...state };
  }
};

export const getEmailVerificationReducers = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case GET_VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };

    case GET_VERIFY_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case GET_VERIFY_EMAIL_RESET:
      return {
        loading: false,
        success: false,
      };

    default:
      return { ...state };
  }
};
