import axios from 'axios';
import BASE_URL from '../../constant/constant';

const getClassData = (page, sort, search, date, type) => {
  return axios.get(BASE_URL + '/classRoom', {
    params: {
      page,
      sort,
      search,
      date,
      type
    }
  });
};

const postClassData = (newClassData) => {
  return axios.post(BASE_URL + '/classRoom', newClassData);
};

const putClassData = (data) => {
  console.log('data', data);
  return axios.put(BASE_URL + `/classRoom/${data[0]._id}`, data[0]);
};

const deleteClassData = (positonDelete) => {
  return axios.delete(BASE_URL + '/delete_classRoom/' + positonDelete);
};

export { getClassData, postClassData, putClassData, deleteClassData };
