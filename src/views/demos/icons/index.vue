<template>
  <IconPreview :show-tooltip="false" @click="onClick" />
</template>
<script setup lang="ts">
import { IconPreview } from '@/components/icon';
import { useClipboard } from '@vueuse/core';
import { message } from 'ant-design-vue';

const { copy } = useClipboard();

const onClick = (icon: string) => {
  copy(icon)
    .then(() => {
      message.success(`复制[${icon}]成功`);
    })
    .catch(() => {
      message.success(`复制[${icon}]失败`);
    });
};
</script>
