<template>
  <ConfigProvider :locale="zhCN">
    <LdModalProvider>
      <RouterView />
    </LdModalProvider>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { LdModalProvider } from '@/components/modal';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
