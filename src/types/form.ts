export interface EmailBody {
  address: string;
  imageHash: string;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  // statusText: string;
  // headers: AxiosResponseHeaders;
  // config: AxiosRequestConfig<D>;
  // request?: any;
}

export interface ApiResponse<Result> {
  code: number;
  msg: string;
  result: Result;
}
