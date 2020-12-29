import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
   async signIn(mobile) {
      const { data } = await axios.post('otp/sms/send', { mobile: mobile });
      return data;
   },
}

export default APIs;