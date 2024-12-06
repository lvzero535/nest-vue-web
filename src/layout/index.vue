<template>
  <Layout class="app-layout">
    <Layout.Sider v-model:collapsed="isCollapsed" :trigger="null" collapsible>
      <AppLogo :hide-text="isCollapsed" />
      <AppMenu :collapsed="isCollapsed" />
    </Layout.Sider>
    <Layout>
      <Layout.Header style="background: #fff; padding: 0">
        <AppHeader />
      </Layout.Header>
      <Layout.Content>
        <div class="app-content-container">
          <TabsView />
          <div class="app-component-container">
            <RouterView></RouterView>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Layout } from 'ant-design-vue';
import AppMenu from './menu/Menu.vue';
import AppLogo from './logo/index.vue';
import AppHeader from './header/index.vue';
import TabsView from './tabs/index.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();
const isCollapsed = computed(() => appStore.isCollapsed);
</script>
<style lang="less" scoped>
.app-layout {
  height: 100vh;

  .app-content-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .app-component-container {
      margin: 16px;
      padding: 16px;
      background: #fff;
      min-height: 280px;
      flex: 1;
    }
  }
}
</style>
