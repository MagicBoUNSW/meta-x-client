import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";

export const ACTION_TYPES = {
  GET_TABLE_DATA_RESULT: "tables/GET_TABLE_DATA_RESULT",
};

const initialState = {
  tablesDataResult: null,
  errorMessage: null,
  loading: false,
};

export type ResultState = Readonly<typeof initialState>;

// Reducer
export default (state: ResultState = initialState, action): ResultState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_TABLE_DATA_RESULT):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_TABLE_DATA_RESULT):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GET_TABLE_DATA_RESULT):
      // console.log(action.payload.data)
      return {
        ...state,
        tablesDataResult: action.payload.data,
      };
    default:
      return state;
  }
};

export const getUserTrialMockTestById = (id) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_TABLE_DATA_RESULT,
    payload: axios.get(`/api/mock-trial-user/${id}`),
  });
};
