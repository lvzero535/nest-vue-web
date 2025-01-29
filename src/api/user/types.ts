import { RoleModel } from '../role';
import { BaseModel, GetFormModel } from '../types';

export interface UserModel extends BaseModel {
  username: string;
  password: string;
  roles: RoleModel[];
}

export type AccountInfoModel = Omit<UserModel, 'password'>;

export type UserFormModel = Omit<GetFormModel<UserModel>, 'roles'> & {
  roleIds: number[];
};
