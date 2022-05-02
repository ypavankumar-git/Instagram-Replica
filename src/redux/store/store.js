import { applyMiddleware, createStore } from "redux";
import allReducers from "../reducers";
import logger from 'redux-logger'
export default createStore(allReducers,
  applyMiddleware(logger),
);