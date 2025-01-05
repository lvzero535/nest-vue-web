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
    <Form.Item label="角色名" name="name">
      <Input v-model:value="formState.name" />
    </Form.Item>

    <Form.Item label="角色值" name="value">
      <Input v-model:value="formState.value" />
    </Form.Item>
    <Form.Item label="父级" name="parentId">
      <TreeSelect
        v-model:value="formState.menuIds"
        show-search
        :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        style="width: 100%"
        :tree-checkable="true"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :show-checked-strategy="SHOW_PARENT"
        :tree-data="treeData"
        tree-node-filter-prop="label"
      >
      </TreeSelect>
    </Form.Item>
    <Form.Item label="备注" name="remark">
      <Textarea show-count :maxlength="200" v-model:value="formState.remark" />
    </Form.Item>
    <Form.Item label="状态" name="status">
      <RadioGroup v-model:value="formState.status">
        <Radio :value="true">启用</Radio>
        <Radio :value="false">禁用</Radio>
      </RadioGroup>
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from 'vue';
import {
  Form,
  Input,
  FormInstance,
  Textarea,
  RadioGroup,
  Radio,
  TreeSelect,
} from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { addRole, updateRole, RoleFormModel, RoleModel } from '@/api/role';
import { getMenuList, MenuModel } from '@/api/menu';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const props = defineProps({
  roleInfo: {
    type: Object as PropType<RoleModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();

const formState = reactive<RoleFormModel>({
  name: props.roleInfo?.name || '',
  value: props.roleInfo?.value || '',
  remark: props.roleInfo?.remark || '',
  status: props.roleInfo?.status || true,
  menuIds: props.roleInfo?.menus.map((item) => item.id!) ?? [],
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入角色名' }],
  value: [{ required: true, message: '请输入角色值' }],
  remark: [{ required: true, message: '请输入备注' }],
};
const treeData = ref<MenuModel[]>([]);
async function getMenuData() {
  const resp = await getMenuList();
  if (resp.success) {
    // treeData.value = resp.data.list;
    treeData.value = resp.data.list;
  }
  return resp.data;
}

onMounted(() => {
  getMenuData();
});

const onSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (props.roleInfo) {
      const resp = await updateRole(props.roleInfo.id!, formState);
      return resp.success;
    } else {
      const resp = await addRole(formState);
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
