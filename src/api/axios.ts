import { useUserStoreWithOut } from '@/store/modules/user';
import { message, Modal } from 'ant-design-vue';
import axios, { AxiosResponse } from 'axios';
import { RequestOptions, ResResult } from './types';
import { SUCCESS_MSG, CODE_TO_MSG, TOKEN_INVALID_CODE } from './const';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStoreWithOut();
    const token = userStore.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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

  const { msg, code } = response.data;
  response.data.success = SUCCESS_MSG === msg;

  if (config.method !== 'get' && response.data.success) {
    message.success('操作成功');
  }

  if (!response.data.success) {
    if (TOKEN_INVALID_CODE === code) {
      const userStore = useUserStoreWithOut();
      Modal.confirm({
        title: '警告',
        closable: true,
        content: CODE_TO_MSG[code!] || CODE_TO_MSG[500],
        okText: '重新登录',
        cancelText: '取消',
        async onOk() {
          userStore.logout();
        },
        onCancel() {
          userStore.setToken('');
        },
      });
    } else {
      Modal.error({
        title: '错误提示',
        closable: true,
        content: CODE_TO_MSG[code!] || CODE_TO_MSG[500],
      });
    }
  }

  if (isReturnOriginData) {
    return response;
  }

  return response.data;
}
