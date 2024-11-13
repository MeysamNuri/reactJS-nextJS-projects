import { axiosInstance as axios } from '../../config/axios';

const API = {
   async login(username, password) {
      const body = new URLSearchParams({ 'username': username, 'password': password });
      const { data } = await axios.post('Auth/Login', body);
      return data;
   }
}

export default API;