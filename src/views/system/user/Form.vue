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
      <Input v-model:value="formState.username" />
    </Form.Item>

    <Form.Item label="密码" name="password">
      <InputPassword v-model:value="formState.password" />
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { PropType, reactive, ref } from 'vue';
import { Form, Input, InputPassword, FormInstance } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { addUser, updateUser, UserFormModel, UserModel } from '@/api/user';

const props = defineProps({
  userInfo: {
    type: Object as PropType<UserModel>,
    default: () => null,
  },
});

const formRef = ref<FormInstance>();

const formState = reactive<UserFormModel>({
  username: props.userInfo?.username || '',
  password: props.userInfo?.password || '',
});

const rules: Record<keyof UserFormModel, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
};

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
