import { BaseModel, GetFormModel } from '../types';

export interface DeptModel extends BaseModel {
  name: string;
  parentId?: string;
  children?: DeptModel[];
}

export type DeptModelForm = GetFormModel<DeptModel>;
