import {
  AUTH_TOKEN_REQUEST,
  AUTH_TOKEN_SUCCESS,
  AUTH_TOKEN_FAIL,
} from '../constants/authTokenConstants';

export const authTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_TOKEN_REQUEST:
      return { ...state, loading: true };

    case AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        token: action.payload,
      };

    case AUTH_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
