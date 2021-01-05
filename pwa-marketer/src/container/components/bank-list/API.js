import { axiosInstance as axios } from '../../config/axios';

const API = {
   async bankList() {
      const { data } = await axios.get('marketer/banks/list');
      return data;
   }
}
export default API;