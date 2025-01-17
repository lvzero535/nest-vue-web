<template>
  <div class="app-header-wrap">
    <div class="header-left-wrap">
      <!-- 折叠按钮 -->
      <div class="toggle-collapsed-wrap">
        <Icon
          size="16"
          class="icon-cls"
          v-if="isCollapsed"
          @click="toggleCollapsed"
          icon="ant-design:menu-unfold-outlined"
        />
        <Icon
          size="16"
          class="icon-cls"
          v-else
          @click="toggleCollapsed"
          icon="ant-design:menu-fold-outlined"
        />
      </div>

      <div class="header-breadcrumb-wrap">
        <Breadcrumb class="ml-8" />
      </div>
    </div>

    <div class="header-right-wrap">
      <!-- 搜索 -->
      <div class="search-wrap">
        <Icon class="icon-cls" size="16" icon="ant-design:search-outlined" />
      </div>

      <!-- 全屏 -->
      <div class="fullscreen-wrap ml-16">
        <Icon
          class="icon-cls"
          size="16"
          icon="ant-design:fullscreen-outlined"
        />
      </div>

      <!-- 用户信息 -->
      <div class="user-info-wrap ml-16">
        <Dropdown :trigger="['click']">
          <Icon class="icon-cls" size="24" icon="ant-design:github-filled" />
          <template #overlay>
            <Menu @click="onUserIcon" :items="userItems">
              <!-- <Menu.Item key="1">
                <Icon class="mr-4" size="16" icon="ant-design:user-outlined" />
                <span>个人中心</span>
              </Menu.Item>
              <Menu.Item :key="USER_ICON_KEY.LOGOUT">
                <Icon
                  class="mr-4"
                  size="16"
                  :icon="'ant-design:logout-outlined'"
                />
                <span>退出登录</span>
              </Menu.Item> -->
            </Menu>
          </template>
        </Dropdown>
      </div>

      <!-- 设置 -->
      <div class="setting-wrap ml-16">
        <Icon class="icon-cls" size="16" icon="ep:setting" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { hIcon, Icon } from '@/components/icon';
import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { computed } from 'vue';
import { Dropdown, Menu, MenuProps, Modal } from 'ant-design-vue';
import Breadcrumb from './Breadcrumb.vue';

const appStore = useAppStore();
const userStore = useUserStore();
const { toggleCollapsed } = appStore;
const isCollapsed = computed(() => appStore.isCollapsed);

const userItems = [
  {
    label: '个人中心',
    key: '1',
    icon: hIcon('ant-design:user-outlined'),
    click() {
      console.log('个人中心11');
    },
  },
  {
    label: '退出登录',
    key: '2',
    icon: hIcon('ant-design:logout-outlined'),
    click() {
      Modal.confirm({
        title: '提示',
        closable: true,
        content: '确认退出登录吗？',
        // okText: '重新登录',
        // cancelText: '取消',
        async onOk() {
          userStore.logout();
        },
      });
    },
  },
];

const onUserIcon: MenuProps['onClick'] = (e) => {
  e.item.click?.();
};
</script>
<style scoped lang="less">
.app-header-wrap {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  .icon-cls {
    cursor: pointer;

    &:hover {
      color: #1890ff;
    }
  }

  .header-right-wrap,
  .header-left-wrap {
    display: flex;
    align-items: center;
  }
}
</style>
