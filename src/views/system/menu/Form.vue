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
      <RadioGroup v-model:value="formState.type" @change="onTypeChange">
        <template v-for="(value, key) in MenuType" :key="key">
          <Radio :value="Number(key)">{{ value }}</Radio>
        </template>
      </RadioGroup>
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
        :tree-data="realTreeData"
        @select="onSelectedNode"
        tree-node-filter-prop="label"
      >
      </TreeSelect>
      <div v-show="false" class="mt-4">
        <Tag>当前父级路径：{{ pathPrefix }}</Tag>
      </div>
    </Form.Item>
    <Form.Item
      v-if="formState.type === MenuTypeEnum.BUTTON"
      tooltip="对应控制器中定义的权限字符，如：@Perm('system:menu:list')"
      label="权限"
      name="permission"
    >
      <Select
        v-model:value="formState.permission"
        :options="permissionOptions"
      ></Select>
    </Form.Item>
    <Form.Item label="名称" name="name">
      <Input
        :disabled="formState.type === MenuTypeEnum.BUTTON"
        v-model:value="formState.name"
      />
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
import { computed, onMounted, PropType, reactive, ref, watch } from 'vue';
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
  Select,
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
import { MenuType, permissionTextMap } from './const';
import { traverseTree } from '@/utils/tree';
import { cloneDeep } from 'lodash-es';
import { SelectProps } from 'ant-design-vue/es/vc-select';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();

const props = defineProps({
  menuInfo: {
    type: Object as PropType<MenuModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();
const treeData = ref<MenuModel[]>([]);
const pathPrefix = ref<string>(props.menuInfo?.parentId ?? '/');
const permissionOptions = ref<SelectProps['options']>([]);

const formState = reactive<MenuModelForm>({
  name: props.menuInfo?.name || '',
  parentId: props.menuInfo?.parentId ?? '-1',
  type: props.menuInfo?.type || MenuTypeEnum.CATALOG,
  order: props.menuInfo?.order || 0,
  path: props.menuInfo?.path,
  icon: props.menuInfo?.icon,
  permission: props.menuInfo?.permission,
  status: props.menuInfo?.status ?? true,
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入菜单名' }],
  parentId: [{ required: true, message: '请选择父菜单' }],
  type: [{ required: true, message: '请选择菜单类型' }],
  order: [{ required: true, message: '请输入菜单排序' }],
  path: [{ required: true, message: '请输入菜单路径' }],
  icon: [{ required: true, message: '请输入菜单图标' }],
  permission: [{ required: true, message: '请选择操作权限' }],
};

watch(
  () => formState.permission,
  (val) => {
    formState.name = '';
    if (val) {
      const name = val.split(':').pop()?.toLowerCase();
      if (!name) {
        return;
      }
      formState.name = permissionTextMap[name];
    }
  },
);

const generatePermissionOptions = (node: MenuModel) => {
  permissionOptions.value = [];
  if (node.type === MenuTypeEnum.MENU) {
    const prefix = node.path?.replace(/\//g, ':').slice(1);
    if (!prefix) {
      return;
    }
    permissionOptions.value = userStore.permissions
      .filter((item) => {
        return item.includes(prefix);
      })
      .map((item) => {
        return {
          label: item,
          value: item,
        };
      });

    const isSelected = permissionOptions.value.find(
      (item) => item.value === formState.permission,
    );
    if (!isSelected) {
      formState.permission = permissionOptions.value[0].value;
    }
  } else {
    formState.permission = '';
  }
};

const onSelectedNode: TreeSelectProps['onSelect'] = (
  value: SafeAny,
  node: SafeAny,
) => {
  generatePermissionOptions(node);
  console.log(value, node);
  if (value === '-1') {
    pathPrefix.value = '/';
  } else {
    pathPrefix.value = node?.path || '/';
  }
};

const onTypeChange = () => {
  if (formState.type === MenuTypeEnum.BUTTON) {
    formState.parentId = '';
  } else {
    formState.parentId = '-1';
  }
};

const getTreeData = (menuType: MenuTypeEnum) => {
  return traverseTree(cloneDeep(treeData.value), (item) => {
    if (item.children?.length && item.children[0].type === menuType) {
      delete item.children;
    }
  });
};

const catalogData = computed(() => {
  return getTreeData(MenuTypeEnum.MENU);
});
const menuData = computed(() => {
  return getTreeData(MenuTypeEnum.BUTTON);
});

const realTreeData = computed(() => {
  if (formState.type === MenuTypeEnum.BUTTON) {
    return menuData.value;
  } else {
    return catalogData.value;
  }
});

async function getMenuData() {
  const resp = await getMenuList();
  if (resp.success) {
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

    if (props.menuInfo.parentId) {
      traverseTree(treeData.value, (node) => {
        if (node.id === props.menuInfo.parentId) {
          generatePermissionOptions(node);
        }
      });
    }
  }
}

onMounted(() => {
  getMenuData();
});

const onSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (props.menuInfo) {
      const resp = await editMenu(props.menuInfo.id!, formState);
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
