import { AxiosRequestConfig } from 'axios';

export interface BaseModel {
  id?: number;
  createAt?: string;
  updateAt?: string;
}

export type GetFormModel<T> = Omit<T, keyof BaseModel>; // 排除BaseModel中的id和createAt属性

export interface PageQuery {
  page: number;
  pageSize: number;
  search?: string;
}

export interface ListResult<T = any> {
  total: number;
  list: T[];
}

export type ResListResult<T = any> = ResResult<ListResult<T>>;

export interface ResResult<T = any> {
  code?: number;
  data: T;
  msg?: string;
  success: boolean;
}

export interface RequestOptions extends AxiosRequestConfig {
  tip?: boolean;
}
