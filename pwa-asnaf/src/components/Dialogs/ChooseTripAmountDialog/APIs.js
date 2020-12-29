import { axiosInstance as axios } from '../../../constants/axios';

const APIs = {
  async getTourCredits() {
    const { data } = await axios.get('tourism/credits');
    return data;
  }
};

export default APIs;