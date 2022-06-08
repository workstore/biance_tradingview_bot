import request from "@/utils/request";
// import { EmailBody, AxiosResponse, ApiResponse } from "@/types/form";

export const saveEmail = async (email) => {
  const { status } = await request({
    url: "/email",
    method: "POST",
    data: email,
  });
  return status;
};
