import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";

export const ACTION_TYPES = {
  GET_ALL_CRITERIA: "criteria/GET_ALL_CRITERIA",
};

const initialState = {
  data: [],
  page: 0,
  size: 0,
  total: 0,
  errorMessage: null,
  loading: false,
  test: null,
};

export type CriteriaState = Readonly<typeof initialState>;

// Reducer
export default (state: CriteriaState = initialState, action): CriteriaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_ALL_CRITERIA):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_ALL_CRITERIA):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GET_ALL_CRITERIA):
      return {
        ...state,
        data: action.payload.data.data,
        page: action.payload.data.page,
        total: action.payload.data.total,
        size: action.payload.data.size,
      };
    default:
      return state;
  }
};

//action
export const getAllCriteria = (request = null) => async (dispatch) => {
  const page = (request && request.page) || 1;
  const size = (request && request.size) || 20;

  let url = `/api/criteria?page=${page}&size=${size}`;

  await dispatch({
    type: ACTION_TYPES.GET_ALL_CRITERIA,
    payload: axios.get(url),
  });
};
