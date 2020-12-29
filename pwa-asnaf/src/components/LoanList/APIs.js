import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async getLoanHistory() {
    const { data } = await axios.get('loan/history');
    return data;
  },
  async getLoanHistoryDetails(id) {
   const { data } = await axios.get(`loan/history/details/${id}`);
   return data;
 },
};

export default APIs;