import { axiosInstance as axios } from '../../constants/axios';
import store from 'store-js';

const APIs = {
  async checkOtp(mobile, code, clientId, fcm_token, user_agent) {
    const { data } = await axios.post('otp/check/login', {
      mobile: mobile,
      code: code,
      client_id: clientId,
      fcm_token: fcm_token,
      user_agent: user_agent,
    });
    return data;
  },

  async getBusinesses() {
    const { data } = await axios.get('user/businesses');
    return data;
  },
  
  async appInit(id,page) {
    const { data } = await axios.get(`app/init/${id}`);
    store.set('appInit', data.data[0])
    return data;
  },

};

export default APIs;
