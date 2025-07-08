import { useUserStoreWithOut } from '@/store/modules/user';
import { message, Modal } from 'ant-design-vue';
import axios, { AxiosResponse } from 'axios';
import { RequestOptions, ResResult } from './types';
import {
  SUCCESS_MSG,
  CODE_TO_MSG,
  TOKEN_INVALID_CODE,
  SUCCESS_CODE,
} from './const';

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

let loginModal: SafeAny;

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
      loginModal?.destroy();
      loginModal = Modal.confirm({
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
        content: CODE_TO_MSG[code!] || msg || CODE_TO_MSG[500],
      });
    }
  }

  if (isReturnOriginData) {
    return response;
  }

  return response.data;
}

// 处理文件上传的函数
export const uploadFile = async (
  file: File,
  data: Record<string, SafeAny> = {},
  headers: Record<string, SafeAny> = {},
) => {
  // 创建 FormData 对象
  const formData = new FormData();

  formData.append('file', file);
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const userStore = useUserStoreWithOut();
  // 配置 Axios 请求
  return axios
    .post('/api/upload', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((res) => {
      if (res.data.code !== SUCCESS_CODE) {
        Modal.error({
          title: '错误提示',
          closable: true,
          content:
            CODE_TO_MSG[res.data.code!] || res.data.msg || CODE_TO_MSG[500],
        });
        return;
      }
      return res.data;
    });
};
