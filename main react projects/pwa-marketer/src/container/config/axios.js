import axios from "axios";

const api_base_url = 'https://marketerapi.daapapp.com/';
// const api_base_url_test = 'https://marketerapi-dev.daapapp.com/';

const axiosInstance = axios.create({ baseURL: api_base_url });
export { api_base_url, axiosInstance };