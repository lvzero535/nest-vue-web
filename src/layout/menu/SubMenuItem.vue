<template>
  <template v-if="hasChildren(menu)">
    <Menu.SubMenu :key="menu.path">
      <template #title>
        <MenuContent :hideText="hideText" :menu="menu" />
      </template>
      <template v-for="childrenMenu in menu.children" :key="childrenMenu.path">
        <MySubMenuItem :menu="childrenMenu"></MySubMenuItem>
      </template>
    </Menu.SubMenu>
  </template>
  <template v-else>
    <Menu.Item :key="menu.path">
      <MenuContent :hideText="hideText" :menu="menu" />
    </Menu.Item>
  </template>
</template>
<script setup lang="ts">
import { Menu } from 'ant-design-vue';
import { isEmpty } from 'lodash-es';
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import MenuContent from './MenuContent.vue';

defineOptions({
  name: 'MySubMenuItem',
});

defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({}),
  },
  /* 当折叠时，第1级菜单隐藏文字 只显示 */
  hideText: {
    type: Boolean,
    default: false,
  },
});

const hasChildren = (menu: RouteRecordRaw) => {
  return !isEmpty(menu.children);
};
</script>
