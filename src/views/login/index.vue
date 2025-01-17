<template>
  <div class="login-container">
    <Card title="登录" style="width: 300px">
      <Form
        :labelCol="{ span: 6 }"
        :model="formState"
        name="normal_login"
        class="login-form"
      >
        <Form.Item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入您的用户名!' }]"
        >
          <Input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </Input>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入您的密码!' }]"
        >
          <InputPassword v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </InputPassword>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            html-type="submit"
            class="login-form-button"
            @click="handleLogin"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Form, Input, Button, Card, InputPassword } from 'ant-design-vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const formState = reactive({
  username: 'admin',
  password: 'Qwer1234',
});

const handleLogin = async () => {
  console.log('Received values of form: ', formState);
  const resp = await login(formState);
  console.log(resp);
  if (resp.success) {
    userStore.setToken(resp.data.access_token);
    let redirect = route.query.redirect as string;
    if (!redirect) {
      redirect = '/';
    }
    router.push(redirect);
    return;
  }
  // 这里可以添加实际的登录逻辑
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e2e2e2;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}
</style>
