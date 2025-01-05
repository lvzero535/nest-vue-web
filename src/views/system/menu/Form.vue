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
    <Form.Item label="类型" name="type">
      <RadioGroup v-model:value="formState.type">
        <template v-for="(value, key) in MenuType" :key="key">
          <Radio :value="Number(key)">{{ value }}</Radio>
        </template>
      </RadioGroup>
    </Form.Item>
    <Form.Item label="名称" name="name">
      <Input v-model:value="formState.name" />
    </Form.Item>
    <Form.Item label="父级" name="parentId">
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
        @select="onSelectedNode"
        tree-node-filter-prop="label"
      >
      </TreeSelect>
      <div class="mt-4">
        <Tag>当前父级路径：{{ pathPrefix }}</Tag>
      </div>
    </Form.Item>
    <Form.Item
      v-if="formState.type === MenuTypeEnum.BUTTON"
      tooltip="对应控制器中定义的权限字符，如：@Perm('system:menu:list')"
      label="权限"
      name="permission"
    >
      <Input v-model:value="formState.permission"></Input>
    </Form.Item>
    <Form.Item
      v-if="formState.type !== MenuTypeEnum.BUTTON"
      tooltip="http(s)?开头的是外部链接，否则为内部链接"
      label="路由"
      name="path"
    >
      <Input v-model:value="formState.path"> </Input>
    </Form.Item>
    <Form.Item
      v-if="formState.type !== MenuTypeEnum.BUTTON"
      label="图标"
      name="icon"
    >
      <IconPicker v-model:value="formState.icon" />
    </Form.Item>
    <Form.Item
      v-if="formState.type !== MenuTypeEnum.BUTTON"
      label="排序"
      name="order"
    >
      <InputNumber class="w-100" v-model:value="formState.order" />
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
  InputNumber,
  FormInstance,
  TreeSelect,
  RadioGroup,
  Radio,
  Tag,
  TreeSelectProps,
} from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { IconPicker } from '@/components/icon';
import {
  addMenu,
  editMenu,
  getMenuList,
  MenuTypeEnum,
  MenuModelForm,
  MenuModel,
} from '@/api/menu';
import { MenuType } from './const';

const props = defineProps({
  deptInfo: {
    type: Object as PropType<MenuModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();
const treeData = ref<MenuModel[]>([]);
const pathPrefix = ref<string>(props.deptInfo?.parent?.path ?? '/');

const formState = reactive<MenuModelForm>({
  name: props.deptInfo?.name || '',
  parentId: props.deptInfo?.parent?.id ?? '-1',
  type: props.deptInfo?.type || MenuTypeEnum.CATALOG,
  order: props.deptInfo?.order || 0,
  path: props.deptInfo?.path,
  icon: props.deptInfo?.icon,
  permission: props.deptInfo?.permission,
  status: props.deptInfo?.status ?? true,
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入菜单名' }],
  parentId: [{ required: true, message: '请选择父菜单' }],
  type: [{ required: true, message: '请选择菜单类型' }],
  order: [{ required: true, message: '请输入菜单排序' }],
  path: [{ required: true, message: '请输入菜单路径' }],
  icon: [{ required: true, message: '请输入菜单图标' }],
  permission: [{ required: true, message: '请输入权限标识' }],
};

const onSelectedNode: TreeSelectProps['onSelect'] = (
  value: SafeAny,
  node: SafeAny,
) => {
  console.log(value, node);
  if (value === -1) {
    pathPrefix.value = '/';
  } else {
    // const node = treeData.value.find((item) => item.id === Number(value));
    pathPrefix.value = node?.path || '/';
  }
};

async function getMenuData() {
  const resp = await getMenuList();
  if (resp.success) {
    // treeData.value = resp.data.list;
    treeData.value = [
      {
        id: '-1',
        name: '根目录',
        type: MenuTypeEnum.CATALOG,
        path: '/',
        icon: 'ep:icon',
        order: 0,
        status: true,
        children: resp.data.list,
      },
    ];
  }
  return resp.data;
}

onMounted(() => {
  getMenuData();
});

const onSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (props.deptInfo) {
      const resp = await editMenu(props.deptInfo.id!, formState);
      return resp.success;
    } else {
      const resp = await addMenu(formState);
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
