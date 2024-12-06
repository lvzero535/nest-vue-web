import { useUserStoreWithOut } from '@/store/modules/user';
import { message } from 'ant-design-vue';
import axios, { AxiosResponse } from 'axios';
import { RequestOptions, ResResult } from './types';
import { SUCCESS_MSG, CODE_TO_MSG } from './const';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStoreWithOut();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.error(CODE_TO_MSG[error.status]);
    return Promise.reject(error);
  },
);

export default service;

export async function request<T>(config: RequestOptions): Promise<ResResult<T>>;

export async function request<T>(
  config: RequestOptions,
  isReturnOriginData: boolean,
): Promise<AxiosResponse<ResResult<T>>>;

export async function request<T>(
  config: RequestOptions = {},
  isReturnOriginData = false,
): Promise<ResResult<T> | AxiosResponse<ResResult<T>>> {
  const response = await service.request<ResResult<T>>(config);

  const { msg } = response.data;
  response.data.success = SUCCESS_MSG === msg;

  if (config.method !== 'get' && response.data.success) {
    message.success('操作成功');
  }

  if (isReturnOriginData) {
    return response;
  }

  return response.data;
}
