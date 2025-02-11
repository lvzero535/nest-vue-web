<template>
  <div class="icons-wrapper">
    <Tabs :size="cSize" v-model:activeKey="activeKey">
      <Tabs.TabPane v-for="(_, key) in iconsMap" :key="key" :tab="key">
      </Tabs.TabPane>
    </Tabs>
    <div class="icons-container">
      <div class="search-wrap">
        <Input :size="cSize" v-model:value="searchContent" allow-clear />
      </div>

      <div class="icons-content">
        <RecycleScroller
          :items="showIcons"
          :item-size="size"
          :buffer="100"
          class="icons-list"
          :grid-items="gridItems"
          key-field="icon"
          :item-secondary-size="size"
        >
          <template #default="{ item }">
            <Tooltip :title="showTooltip ? item.icon : ''">
              <span @click="onClick(item.icon)">
                <Icon
                  class="ml-4 mb-4 icon-item"
                  :size="size"
                  :icon="item.icon"
                />
              </span>
            </Tooltip>
          </template>
        </RecycleScroller>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tabs, Input, Tooltip } from 'ant-design-vue';
import { SizeType } from 'ant-design-vue/es/config-provider';
import { Icon } from '@/components/icon';
import { computed, PropType, ref, watch } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { icons, setupIcons } from './icons.data';

defineProps({
  cSize: {
    type: String as PropType<SizeType>,
    default: 'middle',
  },
  size: {
    type: Number,
    default: 120,
  },
  gridItems: {
    type: Number,
    default: 10,
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);

setupIcons();

const getIcons = (obj: { icons: object; prefix: string }) => {
  return Object.keys(obj.icons).map((icon) => ({
    icon: obj.prefix + ':' + icon,
  }));
};

const iconsMap = Object.entries(icons).reduce(
  (acc, [key, value]) => {
    acc[key] = getIcons(value);
    return acc;
  },
  {
    全部: Object.values(icons)
      .map((item) => getIcons(item))
      .flat(),
  } as Record<string, { icon: string }[]>,
);

const searchContent = ref('');
const activeKey = ref('全部');

watch(activeKey, () => {
  searchContent.value = '';
});

const showIcons = computed(() => {
  const icons = iconsMap[activeKey.value];
  if (!searchContent.value) return icons;
  return icons.filter((item) =>
    item.icon.split(':')[1].includes(searchContent.value),
  );
});

const onClick = (icon: string) => {
  emits('click', icon);
};
</script>

<style lang="less" scoped>
.icons-wrapper {
  overflow: auto;
  height: 100%;

  .icons-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 62px);

    .icons-content {
      flex: 1;
      flex-wrap: wrap;
      overflow: auto;

      .icons-list {
        height: 100%;
      }
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
