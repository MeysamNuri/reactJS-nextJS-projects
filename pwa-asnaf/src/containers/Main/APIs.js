import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async reputationSum() {
    const { data } = await axios.get('user/reputation/sum');
    return data;
  },
};

export default APIs;