import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async getReputationList() {
    const { data } = await axios.get( `reputations/list?from=&to=&business_id=&page=1`);
    return data;
  },
  async getPdf(from, to, business_id, page) {
    const { data } = await axios.get(`reputations/list/PDF/?from=${from}&to=${to}&business_id=${business_id}&page=${page}`);
    return data;
  }
};

export default APIs;