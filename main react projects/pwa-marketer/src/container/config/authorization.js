import { axiosInstance } from "./axios";

// set and clear token in axios
export default function setAuthorization(token) {
   if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
   } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
   }
}