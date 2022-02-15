import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";

export const ACTION_TYPES = {
  GET_TABLE_DATA: "tables/GET_TABLE_DATA",
  GET_ALL_DONE: "tables/GET_ALL_DONE",
  GET_ALL_SCORING: "tables/GET_ALL_SCORING",
};

const initialState = {
  tablesData: [],
  total: 0,
  size: 0,
  page: 0,
  errorMessage: null,
  loading: false,
};

export type TableState = Readonly<typeof initialState>;

// Reducer
export default (state: TableState = initialState, action): TableState => {
  const payload = action.payload;
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_TABLE_DATA):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_TABLE_DATA):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_TABLE_DATA):
      return {
        ...state,
        loading: false,
        tablesData: payload.data.data,
        total: payload.data.total,
        page: payload.data.page,
        size: payload.data.size,
      };
    case SUCCESS(ACTION_TYPES.GET_ALL_DONE):
      return {
        ...state,
        loading: false,
        tablesData: payload.data.data,
        total: payload.data.total,
        page: payload.data.page,
        size: payload.data.size,
      };
    case SUCCESS(ACTION_TYPES.GET_ALL_SCORING):
      return {
        ...state,
        loading: false,
        tablesData: payload.data.data,
        total: payload.data.total,
        page: payload.data.page,
        size: payload.data.size,
      };
    default:
      return state;
  }
};

//action
// export const getTablesData = (request = null) => async (dispatch) => {
//   const page = (request && request.page) || 1;
//   const size = (request && request.size) || 10;

//   let url = `/api/mock-trial-user?page=${page}&size=${size}`;

//   await dispatch({
//     type: ACTION_TYPES.GET_TABLE_DATA,
//     payload: axios.get(url),
//   });
// };
export const getTablesData = (page = 1, size = 10) => {
  const pageDefault = page;
  const sizeDefault = size;
  return {
    type: ACTION_TYPES.GET_TABLE_DATA,
    payload: axios.get(
      `/api/mock-trial-user?page=${pageDefault}&size=${sizeDefault}`
    ),
  };
};

export const getAllDone = (page = 1, size = 10) => {
  const pageDefault = page;
  const sizeDefault = size;
  return {
    type: ACTION_TYPES.GET_ALL_DONE,
    payload: axios.get(
      `/api/mock-trial-user/all-done?page=${pageDefault}&size=${sizeDefault}`
    ),
  };
};

export const getAllScoring = (page = 1, size = 10) => {
  const pageDefault = page;
  const sizeDefault = size;
  return {
    type: ACTION_TYPES.GET_ALL_SCORING,
    payload: axios.get(
      `/api/mock-trial-user/all-scoring?page=${pageDefault}&size=${sizeDefault}`
    ),
  };
};
