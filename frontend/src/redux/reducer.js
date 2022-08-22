import usedTimeReducer from './usedTime/reducer';
import classReducer from './class/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  usedTime: usedTimeReducer,
  class: classReducer
});

export default reducer;
