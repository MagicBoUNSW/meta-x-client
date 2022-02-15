import axios from "axios";
import { REQUEST, SUCCESS, FAILURE } from "../utils/action-type.util";

export const ACTION_TYPES = {
  GET_TABLE_DATA: "tables/GET_TABLE_DATA",
  SCORE_TEST: "score/SCORE_TEST",
  GET_TEST_BY_ID: "score/GET_TEST_BY_ID",
  GET_AUDIO_INFO: "info/GET_AUDIO_INFO",
};

const initialState = {
  scoreData: [],
  errorMessage: null,
  loading: false,
  test: null,
  score: null,
  audio: null,
};

export type ScoreState = Readonly<typeof initialState>;

// Reducer
export default (state: ScoreState = initialState, action): ScoreState => {
  switch (action.type) {
    //case REQUEST(ACTION_TYPES.SCORE_TEST):
    case REQUEST(ACTION_TYPES.GET_TABLE_DATA):
    case REQUEST(ACTION_TYPES.GET_TEST_BY_ID):
    case REQUEST(ACTION_TYPES.GET_AUDIO_INFO):
      return {
        ...state,
        loading: true,
      };
    //case FAILURE(ACTION_TYPES.SCORE_TEST):
    case FAILURE(ACTION_TYPES.GET_TABLE_DATA):
    case FAILURE(ACTION_TYPES.GET_TEST_BY_ID):
    case FAILURE(ACTION_TYPES.GET_AUDIO_INFO):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SCORE_TEST):
      return {
        ...state,
        score: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_TABLE_DATA):
      return {
        ...state,
        scoreData: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_TEST_BY_ID):
      return {
        ...state,
        test: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_AUDIO_INFO):
      return {
        ...state,
        audio: action.payload.data,
      };
    default:
      return state;
  }
};

//action
export const getScoreData = (request) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPES.GET_TABLE_DATA,
    payload: axios.post(`/api/admin/score/`, request),
  });
};

export const scoreTest = (id, scoreCriteria, score, comment) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.SCORE_TEST,
    payload: axios.put(`/api/mock-trial-user/scoring`, {id, scoreCriteria, score, comment}),
  });
};

export const getTestById = (id) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_TEST_BY_ID,
    payload: axios.get(`/api/mock-trial-user/${id}`),
  });
};

export const getAudioList = (id) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_AUDIO_INFO,
    payload: axios.get(`/api/question/audio-info/${id}`),
  });
};
