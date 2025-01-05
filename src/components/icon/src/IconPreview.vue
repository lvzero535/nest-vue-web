<template>
  <div class="icons-wrapper">
    <Tabs :size="cSize" v-model:activeKey="activeKey">
      <Tabs.TabPane v-for="item in tabs" :key="item.key" :tab="item.tab">
        <div class="icons-container" v-if="item.key === activeKey">
          <div class="search-wrap">
            <Input
              :size="cSize"
              v-model:value="searchContent"
              :placeholder="item.placeholder"
              allow-clear
            />
          </div>

          <div class="icons-content">
            <template
              v-for="icon in filterIcons(item.icons, searchContent)"
              :key="icon"
            >
              <Tooltip :title="showTooltip ? icon : ''">
                <span @click="onClick(icon)">
                  <Icon class="ml-4 mb-4 icon-item" :size="size" :icon="icon" />
                </span>
              </Tooltip>
            </template>
          </div>
        </div>
      </Tabs.TabPane>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tabs, Input, Tooltip } from 'ant-design-vue';
import { SizeType } from 'ant-design-vue/es/config-provider';
import { Icon } from '@/components/icon';
import antDesign from '@iconify-json/ant-design/icons.json';
import ep from '@iconify-json/ep/icons.json';
import { PropType, ref, watch } from 'vue';
// import { RecycleScroller } from 'vue-virtual-scroller';

defineProps({
  cSize: {
    type: String as PropType<SizeType>,
    default: 'middle',
  },
  size: {
    type: Number,
    default: 48,
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);
const getIcons = (obj: { icons: object; prefix: string }) => {
  return Object.keys(obj.icons).map((icon) => obj.prefix + ':' + icon);
};

const antDesignIcons = getIcons(antDesign);
const epIcons = getIcons(ep);

const searchContent = ref('');
const activeKey = ref('all');

watch(activeKey, () => {
  searchContent.value = '';
});

const filterIcons = (icons: string[], content: string) => {
  if (!content) return icons;
  return icons.filter((icon) => icon.split(':')[1].includes(content));
};

const onClick = (icon: string) => {
  emits('click', icon);
};

const tabs = [
  {
    tab: '全部' + `(${antDesignIcons.length + epIcons.length})`,
    icons: [...antDesignIcons, ...epIcons],
    placeholder: '从全部图标中搜索',
    key: 'all',
  },
  {
    tab: 'Ant Design' + `(${antDesignIcons.length})`,
    icons: antDesignIcons,
    placeholder: '从 Ant Design 图标中搜索',
    key: 'ant-design',
  },
  {
    tab: 'Element Plus' + `(${epIcons.length})`,
    icons: epIcons,
    placeholder: '从 Element Plus 图标中搜索',
    key: 'element-plus',
  },
];
</script>

<style lang="less" scoped>
.icons-wrapper {
  overflow: auto;
  height: 100%;

  .ant-tabs {
    height: 100%;

    :deep(.ant-tabs-content-holder) {
      .ant-tabs-content {
        height: 100%;
      }
    }
  }

  .icons-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .icons-content {
      flex: 1;
      flex-wrap: wrap;
      overflow: auto;
    }
  }

  .search-wrap {
    margin-left: 8px;
    margin-right: 10px;
    margin-bottom: 16px;
  }

  .icon-item {
    cursor: pointer;
    border: 1px solid #eaeaea;

    &:hover {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
  }
}
</style>
