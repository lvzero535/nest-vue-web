<template>
  <div class="x-table-container">
    <div class="toolbar-wrap" v-if="toolbar">
      <!-- <slot name="toolbar"></slot> -->
      <XToolbar v-bind="toolbar" />
    </div>
    <div class="table-wrap" :class="{ 'no-toolbar': !toolbar }">
      <Table
        :scroll="{ y: 'max-content' }"
        :loading="loading"
        :data-source="data"
        :columns="tableColumns"
        rowKey="id"
        size="middle"
        :row-selection="rowSelection"
        v-bind="$attrs"
        :pagination="paginationCpt"
      >
        <template #headerCell="{ column }">
          <template v-if="column.dataIndex === 'filterColumns'">
            <Dropdown>
              <Icon class="icon-cls" icon="ep:more" />
              <template #overlay>
                <Menu>
                  <template v-for="item in filterColumns" :key="item.dataIndex">
                    <Menu.Item>
                      <Checkbox
                        :checked="!item.hidden"
                        @change="
                          (checked: SafeAny) => {
                            item.hidden = !checked.target.checked;
                          }
                        "
                        >{{ item.title }}</Checkbox
                      >
                    </Menu.Item>
                  </template>
                </Menu>
              </template>
            </Dropdown>
          </template>
          <slot v-else name="headerCell" v-bind="column"></slot>
        </template>
        <template #bodyCell="{ column, value, record }">
          <template v-if="isString(column.cellContent)">
            <slot v-bind="{ column, value, record }" :name="column.cellContent">
              {{ value }}
            </slot>
          </template>
          <template v-else-if="isVNode(column.cellContent)">
            <component
              :is="column.cellContent"
              v-bind="{ column, value, record }"
            >
              {{ value }}
            </component>
          </template>
          <template v-else-if="isFunction(column.cellContent)">
            <component
              :is="handleCellContent(column.cellContent(value, record, column))"
            >
            </component>
          </template>
        </template>
        <template
          v-for="(_, slotName) in omit($slots, ['headerCell', 'bodyCell'])"
          :key="slotName"
          v-slot:[slotName]="values"
        >
          <slot :name="slotName" v-bind="values"></slot>
        </template>
      </Table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Table, Dropdown, Menu, Checkbox } from 'ant-design-vue';
import { Icon } from '@/components/icon';
import {
  computed,
  onMounted,
  PropType,
  reactive,
  ref,
  watchEffect,
  inject,
  isVNode,
  VNode,
  h,
} from 'vue';
import { ListResult, PageQuery } from '@/api/types';
import { isFunction, isString, noop, omit } from 'lodash-es';
import { XTableMethods, XTableColumn } from './types';
import { XToolbar } from '@/components/toolbar';
import { X_TABLE_HOOK_TOKEN } from './token';
import { useSelection } from './hooks/useSelection';

const {
  selection,
  columns,
  toolbar: toolbarProps,
} = inject(X_TABLE_HOOK_TOKEN)!;

const props = defineProps({
  register: {
    type: Function as PropType<(methods: XTableMethods) => void>,
    default: noop,
  },
  fetch: {
    type: Function as PropType<(pageQuery: PageQuery) => Promise<ListResult>>,
    default: null,
  },
  autoLoad: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
});
const tableMethods: XTableMethods = {
  loadData: () => {
    getTableData(pageQuery);
  },
};
const emits = defineEmits<{
  (
    e: 'change',
    pageQuery: {
      page: number;
      pageSize: number;
    },
  ): void;
  (e: 'register', methods: XTableMethods): void;
}>();

const total = ref(0);
const loading = ref(false);
const pageQuery = reactive({
  page: 1,
  pageSize: 10,
});
const data = ref<unknown[]>([]);
const tableColumns = ref<XTableColumn[]>([]);
const filterColumns = ref<XTableColumn[]>([]);

const { rowSelection, toolbar } = useSelection(
  tableMethods,
  selection,
  toolbarProps,
);

watchEffect(() => {
  filterColumns.value = columns.map((item) => {
    return {
      hidden: false,
      ...item,
    };
  });
});

watchEffect(() => {
  tableColumns.value = filterColumns.value
    ?.filter((item) => !item.hidden)
    .concat([
      {
        title: 'filterColumns',
        dataIndex: 'filterColumns',
        width: 32,
        maxWidth: 32,
        fixed: 'right',
      },
    ]);
});

const paginationCpt = computed(() => {
  return {
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
    total: total.value,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {
      pageQuery.page = page;
      pageQuery.pageSize = pageSize;
      emits('change', pageQuery);
      getTableData(pageQuery);
    },
  };
});

const handleCellContent = (cellContent: string | VNode) => {
  if (isVNode(cellContent)) {
    return cellContent;
  }

  return h(
    'span',
    {
      class: 'cell-content',
    },
    cellContent,
  );
};
async function getTableData(pageQuery: PageQuery) {
  loading.value = true;
  const listData = await props.fetch?.(pageQuery);
  loading.value = false;
  data.value = listData.list;
  total.value = listData.total;
}

onMounted(() => {
  if (props.autoLoad && isFunction(props.fetch)) {
    getTableData(pageQuery);
  }
});

emits('register', tableMethods);

defineExpose(tableMethods);
</script>
<style lang="less" scoped>
.x-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .icon-cls:hover {
    cursor: pointer;
    color: var(--primary-color);
  }

  .toolbar-wrap {
    margin-bottom: 8px;
    height: 32px;
  }

  .table-wrap {
    height: calc(100% - 40px); // 40px 为工具栏的高度
    &.no-toolbar {
      height: 100%;
    }

    .ant-table-wrapper {
      height: 100%;

      :deep(.ant-spin-nested-loading) {
        height: 100%;

        .ant-spin-container {
          height: 100%;

          .ant-table.ant-table-fixed-header {
            height: calc(100% - 56px); // 64px 为分页的高度

            .ant-table-container {
              height: 100%;

              .ant-table-body {
                overflow-y: auto !important;
                max-height: calc(100% - 48px) !important; // 55px 为表头高度
                height: 100%; // 55px 为表头高度
              }
            }
          }
        }
      }
    }
  }
}
</style>
