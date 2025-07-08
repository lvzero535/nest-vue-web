import { DeptModel } from '../dept';
import { RoleModel } from '../role';
import { BaseModel, GetFormModel, PageQuery } from '../types';

export interface UserModel extends BaseModel {
  avatar?: { filename: string };
  username: string;
  password: string;
  roles: RoleModel[];
  dept: DeptModel;
}

export type AccountInfoModel = Omit<UserModel, 'password'>;

export type UserFormModel = Omit<GetFormModel<UserModel>, 'roles' | 'dept'> & {
  roleIds: number[];
  deptId: number;
};

export interface QueryParams extends PageQuery {
  deptId?: number;
}
