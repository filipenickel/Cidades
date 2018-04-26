import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import cityReducer from "../reducers/cityReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  cities: cityReducer
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
