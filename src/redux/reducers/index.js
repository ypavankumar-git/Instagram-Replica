import { combineReducers } from 'redux';
import TokenReducer from './tokenReducer';
import FeedReducer from './feedReducer';

const reducers = combineReducers({
  TokenReducer,
  FeedReducer,
});

export default reducers;
