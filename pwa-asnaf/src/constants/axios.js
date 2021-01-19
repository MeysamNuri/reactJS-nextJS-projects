import axios from "axios";
import base_url from './base_url'

const axiosInstance = axios.create({ baseURL: base_url });

export { axiosInstance };