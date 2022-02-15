import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  CHANGE_PASSWORD: 'account/CHANGE_PASSWORD',
  RESET_PASSWORD_INIT: 'account/RESET_PASSWORD_INIT',
  RESET_PASSWORD_FINISH: 'account/RESET_PASSWORD_FINISH',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null as string,
  result: false,
  examHistory: [],
  examActivity: [],
  paymentHistory: []
};

export type AccountState = Readonly<typeof initialState>;

// Reducer
export default (state: AccountState = initialState, action): AccountState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.CHANGE_PASSWORD):
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_INIT):
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.CHANGE_PASSWORD):
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_INIT):
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.CHANGE_PASSWORD):
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_INIT):
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...state,
        loading: false,
        result: true
      };
    default:
      return state;
  }
};

// Actions
export const handlePasswordResetInit = mail => ({
  type: ACTION_TYPES.RESET_PASSWORD_INIT,
  // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
  payload: axios.post(`api/auth/forgot-password`, {mail}),
  meta: {
    successMessage: 'Check your emails for details on how to reset your password.',
    errorMessage: `Email address isn't registered! Please check and try again`
  }
});

// export const handlePasswordResetFinish = (key, newPassword) => ({
//   type: ACTION_TYPES.RESET_PASSWORD_FINISH,
//   payload: axios.post(`api/account/reset-password/finish`, { key, newPassword }),
//   meta: {
//     successMessage: 'Your password has been reset.'
//   }
// });

export const changePassword = (password) => ({
  type: ACTION_TYPES.CHANGE_PASSWORD,
  payload: axios.post(`api/account/change-password`, {newPassword: password}),
  meta: {
    successMessage: 'Your password has been changed.'
  }
});
