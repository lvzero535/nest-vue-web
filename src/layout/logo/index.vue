<template>
  <div class="app-logo-wrap">
    <Icon icon="logo" type="svg" size="48" class="app-logo" />
    <span v-show="!hideText" class="app-title">开发系统</span>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@/components/icon';
defineProps({
  hideText: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="less" scoped>
.app-logo-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #e2e2e2;

  .app-title {
    font-size: 20px;
    margin-left: 5px;
  }
}
</style>
