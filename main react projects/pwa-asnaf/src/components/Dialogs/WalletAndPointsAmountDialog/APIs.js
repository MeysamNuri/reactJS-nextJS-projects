import { axiosInstance as axios } from '../../../constants/axios';

const APIs = {
  async chargeWallet(amount) {
    const { data } = await axios.post('wallet/charge', {amount: amount});
    return data;
  },
  async withdrawInit(amount) {
    const  data  = await axios.post('wallet/withdrawinit', {amount: amount});
    return data;
  },
  async withdraw(amount) {
    const  data  = await axios.post('wallet/withdraw', {amount: amount});
    return data;
  },
  async convertRepoToCredit(repu_num) {
    const { data } = await axios.post('convert/reputation/credit', {reputation_num: repu_num});
    return data;
  }
};

export default APIs;