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

const initState = {
  usedTimeData: [],
  usedTimeDataA: {},
  result: {},
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
    case GET_RESULT_DATA:
      return {
        ...state,
        isLoadingResult: true
      };
    case GET_RESULT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        result: data[0],
        isLoadingResult: false,
        isErrorResult: false
      };
    }
    case GET_RESULT_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case GET_USEDTIME_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        usedTimeData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_USEDTIME_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case POST_USEDTIME_DATA:
      return {
        ...state,
        loading: false
      };
    case POST_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      console.log(' data ', data);
      state.usedTimeData.push(data);
      return {
        ...state,
        usedTimeDataA: data,
        usedTimeData: state.usedTimeData,
        loading: false,
        error: false
      };
    }
    case POST_USEDTIME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case POST_USEDTIMEA_DATA:
      return {
        ...state,
        loading: true
      };
    case POST_USEDTIMEA_SUCCESS: {
      return {
        ...state,

        loading: false,
        error: false,
        key: true
      };
    }
    case POST_USEDTIMEA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case PUT_USEDTIME_DATA:
      return {
        ...state,
        loading: false
      };
    case PUT_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      state.usedTimeData.splice(action.position, 1, data);
      return {
        ...state,
        usedTimeData: state.usedTimeData,
        loading: false,
        error: false
      };
    }
    case PUT_USEDTIME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case DELETE_USEDTIME_DATA:
      return {
        ...state,
        loading: false
      };
    case DELETE_USEDTIME_SUCCESS: {
      const position = action.payload;
      state.usedTimeData.splice(position, 1);
      return {
        ...state,
        usedTimeData: state.usedTimeData,
        loading: false,
        error: false
      };
    }
    case DELETE_USEDTIME_ERROR:
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
