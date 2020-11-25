import axios from 'axios';
let axiosInstance;
export const getAxios = () => {
  if (axiosInstance) return axiosInstance;
  else {
    axiosInstance = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'X-AUTH-TOKEN': '123Asd',
      },
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
      // headers
    });
    axiosInstance.interceptors.request.use((req) => {
      return {
        ...req,
        headers: {
          ...req.headers,
          'X-AUTH-KEY': '4562656',
        },
        data: {
          ...req.data,
          time: new Date().toString(),
        },
      };
    });
    axiosInstance.interceptors.response.use((res) => {
      return res.data;
    });
    return axiosInstance;
  }
};
