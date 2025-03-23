import axios from "axios";
import { AuthValue } from "sanhab-components-library";
import { toast } from "react-toastify";
import {messageError,messageSuccess} from '../utils/utils'

export const api = axios.create({ baseURL: window.globalConfig.url });
export const apiLogin = axios.create({ baseURL: window.globalConfig.login });
export const apiRegistrationToken = axios.create({
  baseURL: window.globalConfig.url,
});
export const apiWithoutToken = axios.create({
  baseURL: window.globalConfig.url,
});

// export const GetTokenRefresh = axios.create({
//   baseURL: window.globalConfig.login,
// });

export const apiCommon = axios.create({ baseURL: window.globalConfig.common });

// auth: true

api.interceptors.request.use(
  (config) => {
    const tokenvalue = AuthValue()?.token;
    config.headers.Authorization = `Bearer ${tokenvalue}`;
    return config;
  },
  function (error) {

    console.log(error,"errorServiceeee");
    messageError("خطای سمت سرور")
    return Promise.reject(error);
  }
);

apiLogin.interceptors.request.use(
  (config) => {
    const tokenvalue = AuthValue()?.token;
    config.headers.Authorization = `Bearer ${tokenvalue}`;
    return config;
  },
  function (error) {
    messageError("خطای سمت سرور")
    return Promise.reject(error);
  }
);

apiCommon.interceptors.request.use(
  (config) => {
    // const jwtToken = localStorage.getItem("token");
    const tokenvalue = AuthValue()?.token;
    config.headers.Authorization = `Bearer ${tokenvalue}`;
    return config;
  },
  function (error) {
    messageError("خطای سمت سرور")
    return Promise.reject(error);
  }
);

apiRegistrationToken.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("registrationToken");
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  function (error) {
    messageError("خطای سمت سرور")
    return Promise.reject(error);
  }
);

apiWithoutToken.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    messageError("خطای سمت سرور")
    return Promise.reject(error);
  }
);
