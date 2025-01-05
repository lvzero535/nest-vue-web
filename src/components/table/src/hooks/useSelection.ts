import { Modal, TableProps } from 'ant-design-vue';
import { computed, Ref, ref } from 'vue';
import {
  XTableMethods,
  XTableSelection,
  XTableToolbar,
  XTypeButtonEnum,
} from '../types';
import { xTypeButtons } from '../const';
import { isEmpty } from 'lodash-es';

function getToolbar(
  toolbar: XTableToolbar,
  selectedRowKeys: Ref<SafeAny[]>,
  tableMethods: XTableMethods,
) {
  const disabled = isEmpty(selectedRowKeys.value);
  const buttons = toolbar.buttons ?? [];
  return {
    searchProps: toolbar.search,
    buttons: {
      items: buttons.map((item) => {
        if (item.xType && xTypeButtons[item.xType]) {
          const xTypeButton = xTypeButtons[item.xType];
          return {
            ...xTypeButton,
            ...item,
            onClick: async (e: MouseEvent) => {
              if (item.xType === XTypeButtonEnum.XType_Delete) {
                Modal.confirm({
                  title: '确定删除选中项？',
                  onOk: () => {
                    if (typeof item.onClick === 'function') {
                      item.onClick?.(e);
                    }
                    item.callback?.(selectedRowKeys.value);
                  },
                });
              } else if (item.xType === XTypeButtonEnum.XType_Refresh) {
                if (typeof item.onClick === 'function') {
                  item.onClick?.(e);
                }
                tableMethods.loadData();
              } else {
                if (typeof item.onClick === 'function') {
                  item.onClick?.(e);
                }
                item.callback?.(selectedRowKeys.value);
              }
            },
            disabled: item.selectMust ? disabled : item.disabled,
          };
        }
        return {
          ...item,
          disabled: item.selectMust ? disabled : item.disabled,
        };
      }),
    },
  };
}

export function useSelection(
  tableMethods: XTableMethods,
  selection: XTableSelection = {},
  toolbarProps?: XTableToolbar,
) {
  const selectedRowKeys = ref<SafeAny[]>([]);
  const selectedRows = ref<SafeAny[]>([]);

  const rowSelection: TableProps['rowSelection'] = {
    ...selection,
    onChange: (_selectedRowKeys: SafeAny[], _selectedRows: SafeAny[]) => {
      selectedRowKeys.value = _selectedRowKeys;
      selectedRows.value = _selectedRows;
    },
    getCheckboxProps: (record: SafeAny) => ({
      disabled: selection?.disableSelect?.(record), // Column configuration not to be checked
    }),
  };

  const toolbar = computed(() => {
    if (!toolbarProps || isEmpty(toolbarProps?.buttons)) {
      return false;
    }
    return getToolbar(toolbarProps, selectedRowKeys, tableMethods);
  });

  return {
    selectedRowKeys,
    selectedRows,
    rowSelection: selection ? rowSelection : undefined,
    toolbar,
  };
}
