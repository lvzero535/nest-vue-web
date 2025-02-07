<template>
  <ConfigProvider :locale="zhCN">
    <XModalProvider>
      <RouterView />
    </XModalProvider>
  </ConfigProvider>
</template>
<script setup lang="ts">
import { XModalProvider } from '@/components/modal';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
