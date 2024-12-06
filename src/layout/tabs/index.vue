<template>
  <div class="tabs-container">
    <Tabs
      type="editable-card"
      hideAdd
      @edit="handleEdit"
      :active-key="route.path"
      @change="handleChange"
    >
      <Tabs.TabPane v-for="menu in tabsList" :key="menu.path">
        <template #tab>
          <Operator :menu="menu" />
        </template>
      </Tabs.TabPane>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tabs, TabsProps } from 'ant-design-vue';
// import MenuContent from '../menu/MenuContent.vue';
import Operator from './Operator.vue';
import { useTabsStore } from '@/store/modules/tabs';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const tabsStore = useTabsStore();
const route = useRoute();
const router = useRouter();

const tabsList = computed(() => Array.from(tabsStore.tabsMap.values()) || []);
// const activeKey = computed(() => route.path);

const handleEdit: TabsProps['onEdit'] = (path, action) => {
  action === 'remove' && tabsStore.removeTabs(path as string);
};
const handleChange: TabsProps['onChange'] = (path) => {
  if (route.path === path) {
    return;
  }
  router.push({ path: path as string });
};
</script>
<style lang="less" scoped>
.tabs-container {
  background: #fff;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 4px 12px;

  .ant-tabs {
    :deep(.ant-tabs-nav) {
      margin: 0;
    }
  }
}
</style>
