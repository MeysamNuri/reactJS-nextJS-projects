import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async getFirstTransactionDate() {
    const { data } = await axios.get('insurance/first/transaction');
    return data;
  },
  async getInsuranceUsersList() {
    const { data } = await axios.get('insurance/users/list');
    return data;
  },
  async getInsuranceRequestList(id) {
    const { data } = await axios.get(`insurance/dependants/list/${id}`);
    return data;
  }
};

export default APIs;