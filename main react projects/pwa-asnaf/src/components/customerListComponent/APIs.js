import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async customersHistory(url) {
    const { data } = await axios.get(url);
    return data;
  }
};

export default APIs;
