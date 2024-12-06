import { BaseModel, GetFormModel } from '../types';

export interface UserModel extends BaseModel {
  username: string;
  password: string;
}

export type UserFormModel = GetFormModel<UserModel>;
