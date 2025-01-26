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

    <Form.Item label="备注" name="remark">
      <Textarea show-count :maxlength="200" v-model:value="formState.remark" />
    </Form.Item>
    <Form.Item label="状态" name="status">
      <RadioGroup v-model:value="formState.status">
        <Radio :value="true">启用</Radio>
        <Radio :value="false">禁用</Radio>
      </RadioGroup>
    </Form.Item>

    <Form.Item label="菜单" name="menuIds">
      <Tree
        checkable
        ref="treeRef"
        v-model:checkedKeys="formState.menuIds"
        :fieldNames="{ title: 'name', key: 'id', children: 'children' }"
        :style="{
          height: '150px',
          paddingTop: '5px',
          overflow: 'auto',
          borderRadius: '6px',
          border: '1px solid #dcdfe6',
          resize: 'vertical',
        }"
        :tree-checkable="true"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="Please select"
        :tree-data="treeData"
        tree-node-filter-prop="label"
      >
      </Tree>
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
  Tree,
  TreeProps,
} from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { addRole, updateRole, RoleFormModel, RoleModel } from '@/api/role';
import { getMenuList } from '@/api/menu';
const props = defineProps({
  roleInfo: {
    type: Object as PropType<RoleModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();
const treeRef = ref();

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

type TreeData = TreeProps['treeData'];
const treeData = ref<TreeData>([]);

function getCheckedKeys(
  checkedList: string[],
  treeData: TreeData,
  total: string[] = [],
) {
  return treeData!.reduce((pre, cur) => {
    // 父点不用管，子点需要处理，当前所有子节点选中后，父节点也会被选中
    // 这里主要是处理半选节点
    if (cur.children?.length) {
      getCheckedKeys(checkedList, cur.children, total);
    } else {
      if (checkedList.includes(cur.id!)) {
        pre.push(cur.id!);
      }
    }
    return pre;
  }, total);
}

async function getMenuData() {
  const resp = await getMenuList();
  if (resp.success) {
    // treeData.value = resp.data.list;
    treeData.value = resp.data.list as TreeData;
    formState.menuIds = getCheckedKeys(formState.menuIds, treeData.value);
  }
  return resp.data;
}

onMounted(() => {
  getMenuData();
});

const onSubmit = async () => {
  try {
    console.log(treeRef.value?.halfCheckedKeys, treeRef.value?.checkedKeys);
    await formRef.value?.validate();

    formState.menuIds = [
      ...(treeRef.value?.halfCheckedKeys ?? []),
      ...(treeRef.value?.checkedKeys ?? []),
    ];
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
