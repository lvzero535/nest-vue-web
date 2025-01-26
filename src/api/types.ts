import { AxiosRequestConfig } from 'axios';

export interface BaseModel {
  id?: string;
  createAt?: string;
  updateAt?: string;
}

export type GetFormModel<T> = Omit<T, keyof BaseModel>; // 排除BaseModel中的id和createAt属性

export interface PageQuery {
  page: number;
  pageSize: number;
  search?: string;
}

export interface ListResult<T = unknown> {
  total: number;
  list: T[];
}

export interface ResResult<T = unknown> {
  code?: number;
  data: T;
  msg?: string;
  success: boolean;
}

export interface RequestOptions extends AxiosRequestConfig {
  tip?: boolean;
}
