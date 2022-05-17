import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import allReducers from '../reducers';

export default createStore(
  allReducers,
  applyMiddleware(logger),
);
