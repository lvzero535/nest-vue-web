import { TableProps } from 'ant-design-vue';

// 创建一个类型别名
type TableColumn = NonNullable<TableProps['columns']>[number];

export interface LdTableMethods {
  loadData: () => void;
}

// 让 CustomTableColumn 继承类型别名
export type CustomTableColumn = TableColumn & {
  hidden?: boolean;
};
