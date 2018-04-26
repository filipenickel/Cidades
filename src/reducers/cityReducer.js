import produce from "immer";
import { types } from "../actions/cityActions";

const initialState = {
  data: {},
  loading: false,
  error: false
};

const cityReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CITIES_REQUEST:
      state.data = {};
      state.loading = true;
      state.error = false;
      break;

    case types.FETCH_CITIES_SUCCESS:
      state.data = action.payload;
      state.loading = false;
      state.error = false;
      break;

    case types.FETCH_CITIES_FAILURE:
      state.data = {};
      state.error = action.payload;
      state.loading = false;
      break;

    case types.FETCH_POINT_REQUEST:
      state.data[action.payload.id].loading = true;
      break;

    case types.FETCH_POINT_SUCCESS:
      state.data[action.payload.id].loading = false;
      state.data[action.payload.id].ranking = action.payload.ranking;
      break;

    case types.FETCH_POINT_FAILURE:
      state.data[action.payload.id].loading = false;
      state.data[action.payload.id].error = action.payload.error;
      state.data[action.payload.id].ranking = undefined;
      break;

    default:
      break;
  }

  return state;
});

export default cityReducer;
