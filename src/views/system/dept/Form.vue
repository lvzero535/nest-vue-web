<template>
  <Form
    :model="formState"
    name="basic"
    ref="formRef"
    :rules="rules"
    labelAlign="left"
    :labelCol="{ span: 4 }"
    autocomplete="off"
  >
    <Form.Item label="上级部门" name="parentId">
      <TreeSelect
        v-model:value="formState.parentId"
        show-search
        :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :tree-data="treeData"
        tree-node-filter-prop="label"
      >
      </TreeSelect>
    </Form.Item>
    <Form.Item label="部门名称" name="name">
      <Input v-model:value="formState.name" />
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from 'vue';
import { Form, Input, FormInstance, TreeSelect } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import {
  DeptModel,
  DeptModelForm,
  addDept,
  editDept,
  getDeptList,
} from '@/api/dept';

const props = defineProps({
  deptInfo: {
    type: Object as PropType<DeptModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();
const treeData = ref<DeptModel[]>([]);

const formState = reactive<DeptModelForm>({
  name: props.deptInfo?.name || '',
  parentId: props.deptInfo?.parentId,
});

const rules: Record<keyof DeptModelForm, Rule[]> = {
  name: [{ required: true, message: '请输入部门名' }],
  parentId: [{ required: true, message: '请选择父部门' }],
  children: [],
};

async function getDeptData() {
  const resp = await getDeptList();
  if (resp.success) {
    treeData.value = resp.data.list;
  }
  return resp.data;
}

onMounted(() => {
  getDeptData();
});

const onSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (props.deptInfo) {
      const resp = await editDept(props.deptInfo.id!, formState);
      return resp.success;
    } else {
      const resp = await addDept(formState);
      return resp.success;
    }
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }
};

defineExpose({
  onSubmit,
});
</script>
