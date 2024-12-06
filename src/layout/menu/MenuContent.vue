<template>
  <template v-if="menu.meta?.icon && showIcon">
    <Icon class="mr-4" :icon="menu.meta.icon" :size="iconSize" />
  </template>
  <span v-show="!hideText">
    {{ menu.meta?.title }}
  </span>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { Icon } from '@/components/icon';

const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({}),
  },
  /* 当折叠时，第1级菜单隐藏文字 只显示 */
  hideText: {
    type: Boolean,
    default: false,
  },
  /* 显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
});

/* 菜单图标大小, 默认14px,隐藏文字时,图标变大 */
const iconSize = computed(() => {
  return props.hideText ? 18 : 14;
});
</script>
