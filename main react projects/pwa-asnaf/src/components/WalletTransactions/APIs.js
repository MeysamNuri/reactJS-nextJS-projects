import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async walletHistory(url) {
    const { data } = await axios.get(url);
    return data;
  }
};

export default APIs;