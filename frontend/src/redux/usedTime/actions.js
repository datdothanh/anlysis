import {
  GET_USEDTIME_DATA,
  GET_USEDTIME_SUCCESS,
  GET_USEDTIME_ERROR,
  POST_USEDTIME_DATA,
  POST_USEDTIME_SUCCESS,
  POST_USEDTIME_ERROR,
  POST_USEDTIMEA_DATA,
  POST_USEDTIMEA_SUCCESS,
  POST_USEDTIMEA_ERROR,
  PUT_USEDTIME_DATA,
  PUT_USEDTIME_SUCCESS,
  PUT_USEDTIME_ERROR,
  DELETE_USEDTIME_DATA,
  DELETE_USEDTIME_SUCCESS,
  DELETE_USEDTIME_ERROR,
  GET_RESULT_DATA,
  GET_RESULT_SUCCESS,
  GET_RESULT_ERROR
} from './types';

const deleteData = (payload) => {
  return {
    type: DELETE_USEDTIME_DATA,
    payload
  };
};
const deleteDataSuccess = (payload) => {
  return {
    type: DELETE_USEDTIME_SUCCESS,
    payload
  };
};
const deleteDataError = (payload) => {
  return {
    type: DELETE_USEDTIME_ERROR,
    payload
  };
};

const putData = (payload) => {
  return {
    type: PUT_USEDTIME_DATA,
    payload
  };
};
const putDataSuccess = (payload, position) => {
  return {
    type: PUT_USEDTIME_SUCCESS,
    payload,
    position
  };
};
const putDataError = (payload) => {
  return {
    type: PUT_USEDTIME_ERROR,
    payload
  };
};

const postData = (payload) => {
  return {
    type: POST_USEDTIME_DATA,
    payload
  };
};
const postDataSuccess = (payload) => {
  return {
    type: POST_USEDTIME_SUCCESS,
    payload
  };
};
const postDataError = (payload) => {
  return {
    type: POST_USEDTIME_ERROR,
    payload
  };
};

const postDataA = (callback) => {
  return {
    type: POST_USEDTIMEA_DATA,
    payload: { callback }
  };
};
const postDataASuccess = (payload) => {
  return {
    type: POST_USEDTIMEA_SUCCESS,
    payload
  };
};
const postDataAError = (payload) => {
  return {
    type: POST_USEDTIMEA_ERROR,
    payload
  };
};

const getData = (payload) => {
  return {
    type: GET_USEDTIME_DATA,
    payload
  };
};
const getDataSuccess = (payload) => {
  return {
    type: GET_USEDTIME_SUCCESS,
    payload
  };
};
const getDataError = (payload) => {
  return {
    type: GET_USEDTIME_ERROR,
    payload
  };
};

const getResultData = (payload) => {
  return {
    type: GET_RESULT_DATA,
    payload
  };
};
const getResultSuccess = (payload) => {
  return {
    type: GET_RESULT_SUCCESS,
    payload
  };
};
const getResultError = (payload) => {
  return {
    type: GET_RESULT_ERROR,
    payload
  };
};

export {
  getResultData,
  getResultSuccess,
  getResultError,
  getData,
  getDataSuccess,
  getDataError,
  postData,
  postDataSuccess,
  postDataError,
  postDataA,
  postDataASuccess,
  postDataAError,
  putData,
  putDataSuccess,
  putDataError,
  deleteData,
  deleteDataSuccess,
  deleteDataError
};
