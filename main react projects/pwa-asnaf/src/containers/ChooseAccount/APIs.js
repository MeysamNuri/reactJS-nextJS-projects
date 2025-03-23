import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async appInit(id) {
    const { data } = await axios.get(`app/init/${id}`);
    return data;
  },

};

export default APIs;
