import { TableProps } from 'ant-design-vue';
import { XToolbarButtonItem, XToolbarProps } from '@/components/toolbar';
import { VNode } from 'vue';

// 创建一个类型别名
type TableColumn = NonNullable<TableProps['columns']>[number];

export enum XTypeButtonEnum {
  XType_Refresh = 'XType_Refresh',
  XType_Add = 'XType_Add',
  XType_Delete = 'XType_Delete',
}
export interface XTableToolbarButton extends XToolbarButtonItem {
  selectMust?: boolean;
  callback?: (selectedRowKeys: SafeAny[]) => void;
  xType?: XTypeButtonEnum;
}
export interface XTableToolbar {
  search?: XToolbarProps['searchProps'];
  buttons?: XTableToolbarButton[];
}

export interface XTableMethods {
  loadData: () => void;
}

export interface XTableSelection {
  disableSelect?: (record: SafeAny) => boolean;
}

export interface XTableHookProps {
  selection?: XTableSelection & TableProps['rowSelection'];
  toolbar?: XTableToolbar;
  columns: XTableColumn[];
}

// 让 XTableColumn 继承类型别名
export type XTableColumn = TableColumn & {
  hidden?: boolean;
  cellContent?: string | VNode | ((...args: SafeAny) => VNode | string);
};
