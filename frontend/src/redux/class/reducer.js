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

const initState = {
  classData: [],

  key: false,
  isLoadingResult: false,
  isErrorResult: false,
  isLoading: false,
  isError: false,
  loading: false,
  error: false
};
const usedTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CLASS_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLASS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        classData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_CLASS_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case POST_CLASS_DATA:
      return {
        ...state,
        loading: false
      };
    case POST_CLASS_SUCCESS: {
      const { data } = action.payload;
      state.classData.push(data);
      return {
        ...state,
        classData: state.classData,
        loading: false,
        error: false
      };
    }
    case POST_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case PUT_CLASS_DATA:
      return {
        ...state,
        loading: false
      };
    case PUT_CLASS_SUCCESS: {
      const { data } = action.payload;
      state.classData.splice(action.position, 1, data);
      return {
        ...state,
        classData: state.classData,
        loading: false,
        error: false
      };
    }
    case PUT_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case DELETE_CLASS_DATA:
      return {
        ...state,
        loading: false
      };
    case DELETE_CLASS_SUCCESS: {
      const position = action.payload;
      state.classData.splice(position, 1);
      return {
        ...state,
        classData: state.classData,
        loading: false,
        error: false
      };
    }
    case DELETE_CLASS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};
export default usedTimeReducer;
