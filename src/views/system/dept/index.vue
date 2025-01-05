<template>
  <div class="dept-wrap">
    <XTable @register="register" :fetch="getDeptData"> </XTable>
  </div>
</template>
<script lang="ts" setup>
import { getDeptList } from '@/api/dept';
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
        callback: () => {
          // onDelete(ids);
        },
      },
    ],
  },
});

const addDeptHandler = () => {
  const formRef = ref<InstanceType<typeof Form>>();
  open({
    title: '添加部门',
    content: h(Form),
    contentProps: {
      ref: formRef,
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
