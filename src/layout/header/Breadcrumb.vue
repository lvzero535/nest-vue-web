<template>
  <Breadcrumb>
    <template v-for="item in route.matched" :key="item.path">
      <Breadcrumb.Item>
        <MenuContent :menu="item" :showIcon="showIcon" />
        <template v-if="item.children?.length" #overlay>
          <Menu
            @click="onMenuClick"
            :selected-keys="getSelectedKeys(item.children)"
          >
            <Menu.Item
              v-for="childrenItem in item.children"
              :key="childrenItem.path"
            >
              <MenuContent :showIcon="showIcon" :menu="childrenItem" />
            </Menu.Item>
          </Menu>
        </template>
      </Breadcrumb.Item>
    </template>
  </Breadcrumb>
</template>
<script setup lang="ts">
import { Breadcrumb, Menu, MenuProps } from 'ant-design-vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import MenuContent from '../menu/MenuContent.vue';

defineProps({
  /* 显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();

const onMenuClick: MenuProps['onClick'] = (options) => {
  router.push({ path: options.key as string });
};

/**
 * 获取选中的键
 * 该函数用于从一个路由记录数组中筛选出当前路由路径对应的选中项的键（路径）
 * 主要通过比较每个项的路径是否包含在当前路由路径中，或者与当前路由路径完全匹配来确定选中项
 *
 * @param items RouteRecordRaw[] 一个包含路由记录的数组
 * @returns string[] 返回一个包含所有选中项路径的数组
 */
const getSelectedKeys = (items: RouteRecordRaw[]) => {
  return items
    .filter((item) => {
      return (
        (route.path.includes(item.path) && item.children?.length) ||
        route.path === item.path
      );
    })
    .map((item) => item.path);
};
</script>
