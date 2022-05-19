import { AxiosResponse } from "axios";
import request from "../utils/request";
import { ApiResponse } from "../types/enums";
import {
  Block2NextRoundType,
  RoundListResult,
  RoundListType,
} from "../types/block";

export const getBlock2NextData = async (): Promise<Block2NextRoundType> => {
  const { data }: AxiosResponse<ApiResponse<Block2NextRoundType>> =
    await request({
      url: `/nodes/block-count-to-next-round`,
      method: "GET",
    });
  return data.result;
};

export const getRoundList = async ({
  pageSize = 0,
  pageNumber = 1,
}): Promise<{
  count: number;
  list: RoundListType[];
}> => {
  const { data }: AxiosResponse<ApiResponse<RoundListResult>> = await request({
    url: `/nodes/round-history?page_size=${pageSize}&page_number=${pageNumber}`,
    method: "GET",
  });

  return {
    count: data.result.count,
    list: data.result.rnd_history_list,
  };
};
