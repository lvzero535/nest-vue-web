<template>
  <div class="menu-container">
    <Menu
      @click="onMenuClick"
      theme="dark"
      mode="inline"
      :open-keys="openKeys"
      :collapsed="collapsed"
      collapsible
      :selected-keys="selectedKeys"
    >
      <template v-for="menu in menus" :key="menu.path">
        <SubMenuItem :menu="menu" :hide-text="collapsed" />
      </template>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { Menu, MenuProps } from 'ant-design-vue';
import { computed } from 'vue';
import SubMenuItem from './SubMenuItem.vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const selectedKeys = computed(() => {
  return [route.path];
});
const openKeys = computed(() => {
  return route.matched.slice(1).map((item) => item.path);
});
const menus = computed(() => userStore.menus);
/**
 * 当菜单项被点击时调用的函数
 * @param {Object} options - 包含菜单项相关信息的对象
 * @property {string} options.key - 菜单项的唯一键值，用于标识菜单项
 * 此函数的作用是：根据点击的菜单项，重定向到对应的路由路径
 */
const onMenuClick: MenuProps['onClick'] = (options) => {
  router.push({ path: options.key as string });
};
</script>
