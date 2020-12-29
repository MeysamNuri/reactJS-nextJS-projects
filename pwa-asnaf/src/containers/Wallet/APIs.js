import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async walletHistory() {
    const { data } = await axios.get('wallet/history?from=&to=&page=1');
    return data;
  },
  async getPdf(from, to, page) {
    const { data } = await axios.get(`wallet/history/PDF?from=${from}&to=${to}&page=${page}`);
    return data;
  }
};

export default APIs;