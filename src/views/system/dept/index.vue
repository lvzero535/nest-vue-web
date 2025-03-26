<template>
  <div class="dept-wrap">
    <XTable @register="register" :fetch="getDeptData">
      <template #name="{ value, record }">
        <a @click="editHandler(record as DeptModel)">{{ value }}</a>
      </template>
      <template #options="{ record }">
        <Popconfirm
          title="确定删除菜单？"
          @confirm="onDelete([(record as DeptModel).id!])"
        >
          <a>删除</a>
        </Popconfirm>
      </template>
    </XTable>
  </div>
</template>
<script lang="ts" setup>
import { Popconfirm } from 'ant-design-vue';
import { getDeptList, DeptModel, deleteDept, getDeptInfo } from '@/api/dept';
import { XTable, XTypeButtonEnum, useTable } from '@/components/table';
import Form from './Form.vue';
import { useModal } from '@/components/modal';
import { h, ref } from 'vue';
const { open } = useModal();

const { register, loadData } = useTable({
  selection: {},
  columns: [
    {
      title: '部门名称',
      dataIndex: 'name',
      width: 400,
      cellContent: 'name',
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
  toolbar: {
    search: {
      placeholder: '请输入部门名',
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
          addDeptHandler();
        },
      },
      {
        xType: XTypeButtonEnum.XType_Delete,
        selectMust: true,
        callback: (ids: number[]) => {
          onDelete(ids);
        },
      },
    ],
  },
});
const editHandler = async (record: DeptModel) => {
  const resp = await getDeptInfo(record.id!);
  console.log(resp);
  if (resp.success) {
    const deptInfoData = resp.data;
    addDeptHandler('编辑部门', deptInfoData);
  }
};
const addDeptHandler = (title = '添加部门', deptInfo?: DeptModel) => {
  const formRef = ref<InstanceType<typeof Form>>();
  open({
    title,
    content: h(Form),
    contentProps: {
      ref: formRef,
      deptInfo,
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
  const resp = await deleteDept(ids);
  if (resp.success) {
    loadData();
  }
};

async function getDeptData() {
  const resp = await getDeptList();
  return resp.data;
}
</script>
<style lang="less" scoped>
.dept-wrap {
  height: 100%;
}
</style>
