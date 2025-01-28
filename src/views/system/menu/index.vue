<template>
  <div class="menu-wrap">
    <XTable @register="register" :fetch="getMenuData">
      <template #name="{ value, record }">
        <a @click="editMenuHandler(record as MenuModel)">{{ value }}</a>
      </template>
      <template #options="{ record }">
        <Popconfirm
          title="确定删除菜单？"
          @confirm="onDelete([(record as MenuModel).id!])"
        >
          <a>删除</a>
        </Popconfirm>
      </template>
    </XTable>
  </div>
</template>
<script lang="ts" setup>
import { Popconfirm, Tag } from 'ant-design-vue';
import {
  getMenuList,
  MenuTypeEnum,
  MenuModel,
  deleteMenu,
  getMenuById,
} from '@/api/menu';
import { XTable, XTypeButtonEnum, useTable } from '@/components/table';
import Form from './Form.vue';
import { useModal } from '@/components/modal';
import { h, ref } from 'vue';
import { MenuType } from './const';
import { DefaultIconsType, hIcon } from '@/components/icon';
const { open } = useModal();

const { register, loadData } = useTable({
  selection: {},
  columns: [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 200,
      cellContent: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 200,
      cellContent: (value: MenuTypeEnum) => {
        const colors: Record<MenuTypeEnum, string> = {
          [MenuTypeEnum.CATALOG]: 'orange',
          [MenuTypeEnum.BUTTON]: 'red',
          [MenuTypeEnum.MENU]: 'green',
        };
        return h(Tag, { color: colors[value] }, MenuType[value]);
      },
    },
    {
      title: '路由',
      dataIndex: 'path',
      width: 200,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 100,
      cellContent: (value: DefaultIconsType) => hIcon(value, { size: 22 }),
    },
    {
      title: '排序',
      dataIndex: 'order',
      width: 100,
    },

    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      cellContent: (value: boolean) => {
        return h(
          Tag,
          { color: value ? 'green' : 'red' },
          value ? '启用' : '禁用',
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'options',
      width: 100,
      fixed: 'right',
      cellContent: 'options',
    },
  ],
  toolbar: {
    search: {
      placeholder: '请输入菜单名',
      onSearch: (value: string) => {
        console.log(value);
        loadData();
      },
    },
    buttons: [
      {
        xType: XTypeButtonEnum.XType_Refresh,
      },
      {
        xType: XTypeButtonEnum.XType_Add,
        onClick: () => {
          addMenuHandler();
        },
      },
      {
        xType: XTypeButtonEnum.XType_Delete,
        selectMust: true,
        callback: (ids: SafeAny[]) => {
          onDelete(ids);
        },
      },
    ],
  },
});

const editMenuHandler = async (record: MenuModel) => {
  const resp = await getMenuById(record.id!);
  if (resp.success) {
    const menuInfoData = resp.data;
    addMenuHandler('编辑菜单', menuInfoData);
  }
};

const addMenuHandler = (title = '添加菜单', menuInfo?: MenuModel) => {
  const formRef = ref<InstanceType<typeof Form>>();
  open({
    title: title,
    content: h(Form),
    contentProps: {
      ref: formRef,
      menuInfo,
    },
    onOk: async () => {
      const result = await formRef.value?.onSubmit();
      if (result) {
        loadData();
      }
      return result;
    },
  });
};

const onDelete = async (ids: string[]) => {
  const resp = await deleteMenu(ids);
  if (resp.success) {
    loadData();
  }
};

async function getMenuData() {
  const resp = await getMenuList();
  return resp.data;
}
</script>
<style lang="less" scoped>
.menu-wrap {
  height: 100%;
}
</style>
