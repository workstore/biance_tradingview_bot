import request from "@/utils/request";
import {
  PINATA_JSON,
  PINATA_KEY,
  PINATA_SECRET_KEY,
} from "@/utils/globalConfig.json";

export const pinJSONToIPFS = async (JSONBody) => {
  // const url = PINATA_JSON;
  // return axios
  //   .post(url, JSONBody, {
  //     headers: {
  //       pinata_api_key: pinataApiKey,
  //       pinata_secret_api_key: pinataSecretApiKey,
  //     },
  //   })
  //   .then(function (response) {
  //     // handle response here
  //   })
  //   .catch(function (error) {
  //     // handle error here
  //   });
  const { data } = await request({
    baseURL: PINATA_JSON,
    method: "POST",
    data: JSONBody,
    headers: {
      pinata_api_key: PINATA_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY,
    },
  });
  const { IpfsHash } = data;
  return IpfsHash;
};
