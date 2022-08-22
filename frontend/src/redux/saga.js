import { all, fork } from 'redux-saga/effects';

import usedTimeSaga from './usedTime/saga';
import classSaga from './class/saga';
function* saga() {
  yield all([fork(usedTimeSaga), fork(classSaga)]);
}

export default saga;
