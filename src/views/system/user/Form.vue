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
    <Form.Item label="用户名" name="username">
      <Input
        :disabled="userInfo?.id === 1"
        v-model:value="formState.username"
      />
    </Form.Item>

    <Form.Item label="密码" name="password">
      <InputPassword v-model:value="formState.password" />
    </Form.Item>
    <Form.Item label="部门" name="deptId">
      <SelectDept v-model:value="formState.deptId" />
    </Form.Item>
    <Form.Item label="角色" name="roleIds">
      <Select
        mode="multiple"
        :options="options"
        :disabled="userInfo?.id === 1"
        placeholder="Please select"
        v-model:value="formState.roleIds"
      />
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from 'vue';
import {
  Form,
  Input,
  InputPassword,
  FormInstance,
  Select,
} from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { addUser, updateUser, UserFormModel, UserModel } from '@/api/user';
import { getRoleList } from '@/api/role';
import SelectDept from '../dept/SelectDept.vue';

const props = defineProps({
  userInfo: {
    type: Object as PropType<UserModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();

const formState = reactive<UserFormModel>({
  username: props.userInfo?.username || '',
  deptId: props.userInfo?.dept.id || -1,
  password: props.userInfo?.password || 'a123456',
  roleIds: props.userInfo?.roles.map((item) => item.id!) || [],
});

const rules: Record<keyof UserFormModel, Rule[]> = {
  deptId: [{ required: true, message: '请选择部门' }],
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  roleIds: [{ required: true, message: '请选择角色' }],
};

const options = ref<{ label: string; value: number }[]>([]);
const getRoleData = async () => {
  const resp = await getRoleList({
    page: 1,
    pageSize: 1000000,
  });
  if (resp.success) {
    options.value = resp.data.list.map((item) => ({
      label: item.name,
      value: item.id!,
    }));
  }
};
onMounted(() => {
  getRoleData();
});

const onSubmit = async () => {
  try {
    await formRef.value?.validate();
    if (props.userInfo) {
      const resp = await updateUser(props.userInfo.id!, formState);
      return resp.success;
    } else {
      const resp = await addUser(formState);
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
