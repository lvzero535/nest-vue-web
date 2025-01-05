import { BaseModel, GetFormModel } from '../types';

export interface RoleModel extends BaseModel {
  name: string;
  value: string;
  remark: string;
  status: boolean;
  menus: RoleModel[];
}

// export type RoleFormModel = GetFormModel<RoleModel>;

export type RoleFormModel = Omit<GetFormModel<RoleModel>, 'menus'> & {
  menuIds: string[];
};
