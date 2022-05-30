import request from "@/utils/request";
import { EmailBody, AxiosResponse, ApiResponse } from "@/types/form";

export const saveEmail = async (email: EmailBody): Promise<number> => {
  const { status }: AxiosResponse<ApiResponse<string>> = await request({
    url: "/email",
    method: "POST",
    data: email,
  });
  return status;
};
