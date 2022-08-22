import axios from 'axios';
import BASE_URL from '../../constant/constant';

const getUsedTimeData = (page, sort, search, date, type) => {
  return axios.get(BASE_URL + '/profile', {
    params: {
      page,
      sort,
      search,
      date,
      type
    }
  });
};

const getResultData = () => {
  return axios.get(BASE_URL + '/result');
};

const postUsedTimeData = (newUsedTimeData) => {
  return axios.post(BASE_URL + '/profile', newUsedTimeData);
};

const postUsedTimeAData = () => {
  return axios.post(BASE_URL + '/anlysis');
};

const putUsedTimeData = (data) => {
  console.log('data', data);
  return axios.put(BASE_URL + `/profile/${data[0]._id}`, data[0]);
};

const deleteUsedTimeData = (positonDelete) => {
  return axios.delete(BASE_URL + '/delete_profile/' + positonDelete);
};

export {
  getUsedTimeData,
  postUsedTimeData,
  putUsedTimeData,
  deleteUsedTimeData,
  postUsedTimeAData,
  getResultData
};
