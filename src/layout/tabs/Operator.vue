<template>
  <div class="operator-container">
    <Dropdown :trigger="['contextmenu']">
      <!-- 需要一个元素包起来，不然不生效，这里不支持多个元素的默认插槽 -->
      <div>
        <MenuContent :menu="menu" />
      </div>
      <template #overlay>
        <Menu :items="items" @click="onMenuClick" />
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { Dropdown, Menu, MenuProps } from 'ant-design-vue';
import MenuContent from '../menu/MenuContent.vue';
import { PropType, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { hIcon } from '@/components/icon';
import { TAB_ACTIONS, useTabsStore } from '@/store/modules/tabs';
import { isFunction } from 'lodash-es';

const props = defineProps({
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({}),
  },
});

const tabsStore = useTabsStore();

const onMenuClick: MenuProps['onClick'] = (options) => {
  if (isFunction(options.item.handler)) {
    options.item.handler();
  } else {
    tabsStore.closeTabs(options.key as TAB_ACTIONS, props.menu.path);
  }
};

const items = ref([
  {
    key: 'refresh',
    icon: () => hIcon('ep:refresh'),
    label: '刷新当前',
    title: '刷新当前',
    handler() {
      console.log('刷新当前');
    },
  },
  {
    key: TAB_ACTIONS.CLOSE_ALL,
    icon: () => hIcon('ant-design:close-circle-outlined'),
    label: '全部关闭',
    title: '全部关闭',
  },
  {
    key: TAB_ACTIONS.CLOSE_OTHER,
    icon: () => hIcon('ant-design:close-square-outlined'),
    label: '关闭其他',
    title: '关闭其他',
  },
  {
    key: TAB_ACTIONS.CLOSE_LEFT,
    icon: () => hIcon('ant-design:arrow-left-outlined'),
    label: '关闭左边',
    title: '关闭左边',
  },
  {
    key: TAB_ACTIONS.CLOSE_RIGHT,
    icon: () => hIcon('ant-design:arrow-right-outlined'),
    label: '关闭右边',
    title: '关闭右边',
  },
]);
</script>
