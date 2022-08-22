import {
  GET_CLASS_DATA,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  POST_CLASS_DATA,
  POST_CLASS_SUCCESS,
  POST_CLASS_ERROR,
  PUT_CLASS_DATA,
  PUT_CLASS_SUCCESS,
  PUT_CLASS_ERROR,
  DELETE_CLASS_DATA,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR
} from './types';

const deleteData = (payload) => {
  return {
    type: DELETE_CLASS_DATA,
    payload
  };
};
const deleteDataSuccess = (payload) => {
  return {
    type: DELETE_CLASS_SUCCESS,
    payload
  };
};
const deleteDataError = (payload) => {
  return {
    type: DELETE_CLASS_ERROR,
    payload
  };
};

const putData = (payload) => {
  return {
    type: PUT_CLASS_DATA,
    payload
  };
};
const putDataSuccess = (payload, position) => {
  return {
    type: PUT_CLASS_SUCCESS,
    payload,
    position
  };
};
const putDataError = (payload) => {
  return {
    type: PUT_CLASS_ERROR,
    payload
  };
};

const postData = (payload) => {
  return {
    type: POST_CLASS_DATA,
    payload
  };
};
const postDataSuccess = (payload) => {
  return {
    type: POST_CLASS_SUCCESS,
    payload
  };
};
const postDataError = (payload) => {
  return {
    type: POST_CLASS_ERROR,
    payload
  };
};

const getDataClass = (payload) => {
  return {
    type: GET_CLASS_DATA,
    payload
  };
};
const getDataClassSuccess = (payload) => {
  return {
    type: GET_CLASS_SUCCESS,
    payload
  };
};
const getDataClassError = (payload) => {
  return {
    type: GET_CLASS_ERROR,
    payload
  };
};

export {
  getDataClass,
  getDataClassSuccess,
  getDataClassError,
  postData,
  postDataSuccess,
  postDataError,
  putData,
  putDataSuccess,
  putDataError,
  deleteData,
  deleteDataSuccess,
  deleteDataError
};
