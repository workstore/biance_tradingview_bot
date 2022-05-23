import axios, { AxiosInstance } from "axios";
import i18n from "../i18n";

const { VITE_APP_PINATA_URL, VAIT_APP_PINATA_KEY, VAIT_APP_PINATA_SECRET_KEY } =
  import.meta.env;

const PinataRequest: AxiosInstance = axios.create({
  baseURL: VITE_APP_PINATA_URL,
  headers: {
    "Content-Type": "application/json",
    pinata_api_key: VAIT_APP_PINATA_KEY,
    pinata_secret_api_key: VAIT_APP_PINATA_SECRET_KEY,
  },
  timeout: 10000,
});

PinataRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

PinataRequest.interceptors.response.use(
  (res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (res.data.errors) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const error = (res.data.errors[0]?.message as string) || "Unknown error";
      console.error(error);
      return Promise.reject(error);
    }
    return res;
  },
  (error) => {
    if (error.response?.status === 403) {
      console.error(i18n.global.t("session_expired"));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export const pinDirectoryToIPFS = (
  pinataApiKey: string,
  pinataSecretApiKey: string,
  data: FormData
): Promise<any> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  return axios.post(url, data, {
    maxBodyLength: Infinity, // this is needed to prevent axios from erroring out with large directories
    headers: {
      // eslint-disable-next-line no-underscore-dangle
      "Content-Type": `multipart/form-data; boundary=${data?._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
};

export default pinDirectoryToIPFS;
