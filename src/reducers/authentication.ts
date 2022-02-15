import axios from "axios";

import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";
import { AUTH_TOKEN_KEY } from "../config/constants";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "config/aws-export";
Amplify.configure(awsconfig());
export const ACTION_TYPES = {
  GET_SESSION: "authentication/GET_SESSION",
  LOGOUT: "authentication/LOGOUT",
  CLEAR_AUTH: "authentication/CLEAR_AUTH",
  ERROR_MESSAGE: "authentication/ERROR_MESSAGE",
  GET_ACTIVATION_TOKEN: "authentication/GET_ACTIVATION_TOKEN"
};

const initialState = {
  loading: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  isAuthenticated: false,
  isAdmin: false,
  user: {} as any,
  errorMessage: null as string, // Errors returned from server side
  successMessage: null as string,
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  result: false,
  activationToken: null as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (
  state: AuthenticationState = initialState,
  action
): AuthenticationState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true,
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        errorMessage: action.payload,
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated =
        action.payload &&
        action.payload.data &&
        (action.payload.data.username || action.payload.data.Username || action.payload.data.email)
          ? true
          : false;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        user: action.payload.data,
      };
    }
    case ACTION_TYPES.GET_SESSION: {
      const isAuthenticated = action.payload.username ? true : false;
      
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        user: action.payload,
      };
    }
    // No axios
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        loading: false,
        sessionHasBeenFetched: true,
      };
    default:
      return state;
  }
};

export const getUserInfo = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,  
    payload: axios.get('/api/account/me')
  });
};

export const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
    return { success: true, message: "Active success" };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const resendConfirmationCode = async (username) => {
  try {
    await Auth.resendSignUp(username);
    return { success: true, message: "Code resent successfully" };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const login = async (userData) => {
  try {
    const json = await axios.post(`/api/auth/login`, userData);
    let authToken = json.data.token;
    if(json && json.data){
      storeAuthToken(authToken);
    }
    return { success: true, authToken };
  } catch (error) {
    clearAuthToken();
    let messageError =
      error && error.message ? error.message : "Username or password was wrong";
    return { success: false, message: messageError };
  }
};

export const registerByCognito = async (userData) => {
  try {
    const json = await axios.post(`/api/auth/register`, userData);
    let message = json.data
    return { success: true, message };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const forgotPasswordByCognito = async (email) => {
  try {
    const data = await axios.post(`api/auth/forgot-password`, {email});
    return { success: true, data };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const resetPassword = async (token, email, password) => {
  try {
    const data = await axios.put(`api/auth/reset-password/${token}`, {email, password});
    return { success: true, data };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const changePassword = async (email, recentPassword, newPassword, token) => {
  try {
    const data = await axios.put(`api/account/reset-password`, {email, recentPassword, newPassword, token});
    return { success: true, data };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const generateChangePasswordToken = async (email) => {
  try {
    const data = await axios.post(`api/account/generate-change-password-token`, {email});
    return { success: true, data };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const changeName = async (email, fullName) => {
  try {
    const data = await axios.post(`api/account/update-name`, {email, fullName});
    return { success: true, data };
  } catch (error) {
    let messageError =
      error && error.message ? error.message : "NotAuthorizedException";
    return { success: false, message: messageError };
  }
};

export const storeAuthToken = (token) => {
  if (token) {
    const jwt = token;
    localStorage.setItem(AUTH_TOKEN_KEY, jwt);
  }
};

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const logout = () => async (dispatch) => {
  await Auth.signOut({ global: true });
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};
 