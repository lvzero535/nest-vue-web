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

const formState = reactive({
  username: '',
  password: '',
});

const handleLogin = () => {
  console.log('Received values of form: ', formState);
  // 这里可以添加实际的登录逻辑
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
