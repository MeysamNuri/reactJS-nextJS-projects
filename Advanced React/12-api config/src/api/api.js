import axios from 'axios'

export const getAxios = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
      "X-AUTH-TOKEN": "123Asd"
    }
    // headers
  });
};