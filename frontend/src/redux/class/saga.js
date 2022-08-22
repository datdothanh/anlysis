import { put, call, takeEvery } from 'redux-saga/effects';
import { deleteClassData, getClassData, postClassData, putClassData } from './api';
import {
  getDataClassSuccess,
  getDataClassError,
  postDataSuccess,
  postDataError,
  putDataSuccess,
  putDataError,
  deleteDataSuccess,
  deleteDataError
} from './actions';

const GET_CLASS_DATA = 'GET_CLASS_DATA';
function* getData(action) {
  try {
    const data = yield call(getClassData, ...action.payload);
    console.log('data', data);
    yield put(getDataClassSuccess(data));
  } catch (e) {
    yield put(getDataClassError());
  }
}

const POST_CLASS_DATA = 'POST_CLASS_DATA';
function* postClass(action) {
  try {
    const data = yield call(postClassData, action.payload);
    yield put(postDataSuccess(data));
  } catch (e) {
    yield put(postDataError());
  }
}

const PUT_CLASS_DATA = 'PUT_CLASS_DATA';
function* putClass(action) {
  try {
    const data = yield call(putClassData, action.payload);
    const position = action.payload[1];
    yield put(putDataSuccess(data, position));
  } catch (e) {
    yield put(putDataError());
  }
}

const DELETE_CLASS_DATA = 'DELETE_CLASS_DATA';
function* deleteClass(action) {
  try {
    yield call(deleteClassData, action.payload[0]);
    yield put(deleteDataSuccess(action.payload[1]));
  } catch (e) {
    yield put(deleteDataError());
  }
}

function* ClassSaga() {
  yield takeEvery(GET_CLASS_DATA, getData);
  yield takeEvery(POST_CLASS_DATA, postClass);

  yield takeEvery(PUT_CLASS_DATA, putClass);
  yield takeEvery(DELETE_CLASS_DATA, deleteClass);
}

export default ClassSaga;
