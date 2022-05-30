import axios, { AxiosInstance } from "axios";
import i18n from "../i18n";
// import { useToken } from "@/store";

const request: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
});

// const getToken = () => useToken().value;

request.interceptors.request.use(
  (config) => {
    // const token = getToken();
    // if (token && config.headers) {
    //   // eslint-disable-next-line no-param-reassign
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (res.data.errors) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const error = (res.data.errors[0]?.message as string) || "Unknown error";
      // Toast.error(error);
      return Promise.reject(error);
    }
    return res;
  },
  (error) => {
    if (error.response?.status === 403) {
      // Toast.error(i18n.global.t("session_expired"));
    } else {
      // Toast.error(error);
    }
    return Promise.reject(error);
  }
);

export default request;
