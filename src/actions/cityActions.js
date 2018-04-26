import api from "../utils/api";

export const types = {
  FETCH_CITIES_REQUEST: "FETCH_CITIES_REQUEST",
  FETCH_CITIES_SUCCESS: "FETCH_CITIES_SUCCESS",
  FETCH_CITIES_FAILURE: "FETCH_CITIES_FAILURE",

  FETCH_POINT_REQUEST: "FETCH_POINT_REQUEST",
  FETCH_POINT_SUCCESS: "FETCH_POINT_SUCCESS",
  FETCH_POINT_FAILURE: "FETCH_POINT_FAILURE"
};

export default {
  getCities() {
    return dispatch => {
      dispatch({ type: types.FETCH_CITIES_REQUEST });

      api.city
        .all()
        .then(cities => {
          dispatch({ type: types.FETCH_CITIES_SUCCESS, payload: cities });
        })
        .catch(error => {
          dispatch({
            type: types.FETCH_CITIES_FAILURE,
            payload: error.message
          });
        });
    };
  },

  getRanking(item) {
    return dispatch => {
      dispatch({ type: types.FETCH_POINT_REQUEST, payload: item });

      api.city
        .getRanking(item)
        .then(ranking => {
          dispatch({
            type: types.FETCH_POINT_SUCCESS,
            payload: { ...item, ranking }
          });
        })
        .catch(error => {
          dispatch({
            type: types.FETCH_POINT_FAILURE,
            payload: { ...item, error: error.message }
          });
        });
    };
  }
};
