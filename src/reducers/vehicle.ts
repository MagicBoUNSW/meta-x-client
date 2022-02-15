import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { toast } from 'react-toastify';
import { asyncForEach, getAddressByCoordinates } from "utils/common-utils";

export const ACTION_TYPES = {
  REGISTER: 'vehicle/REGISTER',
  LOAD: 'vehicle/LOAD',
};

const initialState = {
  vehicles: [],
  vehicle: null,
  loading: false,
  message: null as string,
  errorMessage: null as string,
};

export type VehicleState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleState = initialState, action): VehicleState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.REGISTER):
    case REQUEST(ACTION_TYPES.LOAD):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.REGISTER):
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.data
      };
    case FAILURE(ACTION_TYPES.LOAD):
      return {
        ...state,
        loading: false,
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: false,
        message: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.LOAD):
      return {
        ...state,
        vehicles: action.payload.data
      };
    case ACTION_TYPES.LOAD:
      return {
        ...state,
        vehicles: action.payload
      };
    default:
      return state;
  }
};

export const registerVehicle = async (serialNumber) => {
  try {
    let result = await axios.post(`/vehicles/${serialNumber}/register`);
    console.log(`Register device success`, result);
    return {success : true, message: `Register device success`}
  } catch (error) {
    let errorMessage;
    let status = error.response.status;
    console.log(error.response.status);
    if (status === 404) {
      errorMessage = "Vehicle not found";
    } else if (status === 409) {
      errorMessage = "Vehicle already registered";
    } else {
      errorMessage = error && error.message ? error.message : JSON.stringify(error);
    }
    console.log(`Register device fail`, error);
    return {success : false, message: errorMessage};
  }
};
// ({
//   type: ACTION_TYPES.REGISTER,
//   payload: axios.post(`/vehicles/${serialNumber}/register`, { }),
// });

// export const getBanner = () => async (dispatch) => {
//   await dispatch({
//     type: ACTION_TYPES.GET_BANNER,
//     payload: axios.get(`/api/banner/`)
//   });
// };

export const loadVehicles = () => async (dispatch) => {
  let response = await axios.get(`/vehicles`);
  let data = response.data;
  await asyncForEach(data, async item => {
    item.formatted_address = await getAddressByCoordinates(item.latitude, item.longitude);
  });

  await dispatch({
    type: ACTION_TYPES.LOAD,
    payload: data
  });
};
