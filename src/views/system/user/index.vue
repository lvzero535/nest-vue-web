<template>
  <div class="user-wrap">
    <LdTable @register="register" :columns="columns" :fetch="getUserData">
      <template #toolbar>
        <Button
          @click="addUserHandler"
          type="primary"
          :icon="hIcon('ant-design:plus-outlined')"
          >添加</Button
        >
        <InputSearch
          v-model:value="searchContent"
          style="width: 200px"
          placeholder="请输入用户名"
          :allow-clear="true"
          enter-button
          @search="loadData"
        />
      </template>

      <template #bodyCell="{ column, value, record }">
        <template v-if="column.dataIndex === 'username'">
          <a @click="editUserHandler(record as UserModel)">{{ value }}</a>
        </template>
        <template v-if="column.dataIndex === 'options'">
          <Popconfirm
            title="确定删除用户？"
            @confirm="onDelete(record as UserModel)"
          >
            <a>删除</a>
          </Popconfirm>
        </template>
      </template>
    </LdTable>
  </div>
</template>
<script lang="ts" setup>
import { getUserList, UserModel, deleteUser, getUserById } from '@/api/user';
import { Button, Popconfirm, InputSearch, TableProps } from 'ant-design-vue';
import { LdTable, useTable } from '@/components/table';
import { hIcon } from '@/components/icon';
import { h, ref } from 'vue';
import Form from './Form.vue';

import { useModal } from '@/components/modal';
import { PageQuery } from '@/api/types';
const { open } = useModal();

const columns: TableProps['columns'] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 200,
  },
  {
    title: '密码',
    dataIndex: 'password',
    width: 200,
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
  },
];
const searchContent = ref('');

const { register, loadData } = useTable();

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

const onDelete = async (record: UserModel) => {
  const resp = await deleteUser(record.id!);
  if (resp.success) {
    loadData();
  }
};

async function getUserData(pageQuery: PageQuery) {
  const resp = await getUserList({
    ...pageQuery,
    search: searchContent.value,
  });
  return resp.data;
}
</script>
<style lang="less" scoped>
.user-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .table-wrap {
    height: calc(100% - 40px);

    .ant-table-wrapper {
      height: 100%;

      :deep(.ant-spin-nested-loading) {
        height: 100%;

        .ant-spin-container {
          height: 100%;

          .ant-table.ant-table-fixed-header {
            height: calc(100% - 64px); // 64px 为分页的高度

            .ant-table-container {
              height: 100%;

              .ant-table-body {
                overflow-y: auto !important;
                max-height: calc(100% - 55px) !important; // 55px 为表头高度
              }
            }
          }
        }
      }
    }
  }
}

.toolbar-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
</style>
