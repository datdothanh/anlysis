import { all, fork } from 'redux-saga/effects';

import usedTimeSaga from './usedTime/saga';
function* saga() {
  yield all([fork(usedTimeSaga)]);
}

export default saga;
