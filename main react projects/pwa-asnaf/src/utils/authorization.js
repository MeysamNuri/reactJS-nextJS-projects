import { axiosInstance } from "../constants/axios";

// set and clear token in axios
export default function setAuthorization(token) {
   if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
   }
}