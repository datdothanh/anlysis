import usedTimeReducer from './usedTime/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  usedTime: usedTimeReducer
});

export default reducer;
