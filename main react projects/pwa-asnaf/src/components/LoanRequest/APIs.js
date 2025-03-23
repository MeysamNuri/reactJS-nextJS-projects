import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async getLoanList() {
    const { data } = await axios.get('loans');
    return data;
  },
  async registerLoan(id) {
    const { data } = await axios.post('loan/register/request', {loan_id: id});
    return data;
  }
};

export default APIs;