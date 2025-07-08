<template>
  <XColumnResize>
    <template #left>
      <div>
        <DeptTree @select="onSelectNode" />
      </div>
    </template>
    <template #right>
      <XTable @register="register" :fetch="getUserData">
        <template #username="{ value, record }">
          <a @click="editUserHandler(record as UserModel)">{{ value }}</a>
        </template>
        <template #avatar="{ value }">
          <img
            width="32"
            height="32"
            :src="value?.filename ? '/api/' + value.filename : '/vite.svg'"
            alt="avatar"
          />
        </template>
        <template #options="{ record }">
          <Popconfirm
            title="确定删除用户？"
            @confirm="onDelete([(record as UserModel).id!])"
          >
            <a v-if="!isAdmin(record)">删除</a>
            <span v-else>-</span>
          </Popconfirm>
        </template>
      </XTable>
    </template>
  </XColumnResize>
</template>
<script lang="ts" setup>
import { getUserList, UserModel, deleteUser, getUserById } from '@/api/user';
import { Popconfirm, Tag } from 'ant-design-vue';
import { XTable, XTypeButtonEnum, useTable } from '@/components/table';
import { XColumnResize } from '@/components/layout';
import { h, ref } from 'vue';
import Form from './Form.vue';
import DeptTree from '../dept/DeptTree.vue';

import { useModal } from '@/components/modal';
import { PageQuery } from '@/api/types';
import { RoleModel } from '@/api/role';
import { isEmpty } from 'lodash-es';
import { DeptModel } from '@/api/dept';
const { open } = useModal();

const searchContent = ref('');
const deptId = ref(-1);
const isAdmin = (record: UserModel) => record.username === 'admin';
const { register, loadData } = useTable({
  columns: [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 200,
      cellContent: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: 200,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 100,
      cellContent: 'avatar',
    },
    {
      title: '部门',
      dataIndex: 'dept',
      width: 200,
      cellContent: (dept: DeptModel) => {
        if (isEmpty(dept)) {
          return '-';
        }
        return dept.name;
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 200,
      cellContent: (roles: RoleModel[]) => {
        if (isEmpty(roles)) {
          return '-';
        }
        return h(
          'span',
          null,
          roles.map((item) => h(Tag, { color: 'green' }, () => item.name)),
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      ellipsis: true,
      minWidth: 50,
    },
    {
      title: '操作',
      dataIndex: 'options',
      width: 100,
      fixed: 'right',
      cellContent: 'options',
    },
  ],
  selection: {
    disableSelect: isAdmin,
  },
  toolbar: {
    search: {
      placeholder: '请输入用户名',
      onSearch: (value: string) => {
        searchContent.value = value;
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
          addUserHandler();
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

const onSelectNode = (id: number[]) => {
  deptId.value = id[0];
  loadData();
};

const addUserHandler = () => {
  openUserModal('添加用户');
};
const editUserHandler = async (userInfo: UserModel) => {
  const resp = await getUserById(userInfo.id!);
  if (resp.success) {
    openUserModal('编辑用户', resp.data);
  }
};

const openUserModal = (title: string, userInfo?: UserModel) => {
  const formRef = ref<InstanceType<typeof Form>>();
  open({
    title,
    confirmLoading: true,
    content: h(Form),
    contentProps: {
      ref: formRef,
      userInfo,
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

const onDelete = async (ids: number[]) => {
  const resp = await deleteUser(ids);
  if (resp.success) {
    loadData();
  }
};

async function getUserData(pageQuery: PageQuery) {
  const resp = await getUserList({
    ...pageQuery,
    search: searchContent.value,
    deptId: deptId.value,
  });
  return resp.data;
}
</script>
<style lang="less" scoped>
.user-wrap {
  height: 100%;
}
</style>
