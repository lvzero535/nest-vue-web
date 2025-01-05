<template>
  <div class="x-toolbar-container">
    <div class="buttons-wrap">
      <template v-for="(item, index) in realButtons" :key="index">
        <template v-if="item === BarDivider">
          <Divider
            :key="getId()"
            type="vertical"
            style="background-color: '#666'"
          />
        </template>
        <template v-else>
          <!-- 菜单应用使用递归 -->
          <template v-if="item.menus">
            <Dropdown :trigger="['click']">
              <Button
                class="tl-button"
                :key="getId()"
                v-bind="{ ...omit(item, ['menus']), ...commonProps }"
                :icon="getIcon(item, commonProps)"
              >
                {{ item.title }}
              </Button>
              <template #overlay>
                <Menu>
                  <template
                    v-for="menu in item.menus"
                    :key="isString(menu) ? menu + getId() : menu.title"
                  >
                    <template v-if="menu === BarDivider">
                      <Menu.Divider />
                    </template>
                    <Menu.SubMenu :key="getId()" v-else-if="menu.menus">
                      <template #title>
                        <Button
                          v-bind="{ ...omit(menu, ['menus']), ...commonProps }"
                          :icon="getIcon(menu, commonProps)"
                        >
                          {{ menu.title }}
                        </Button>
                      </template>
                      <template
                        v-for="menuButton in menu.menus"
                        :key="
                          isString(menuButton)
                            ? menuButton + getId()
                            : menuButton.title
                        "
                      >
                        <template v-if="menuButton === BarDivider">
                          <Menu.Divider />
                        </template>
                        <template v-else>
                          <Menu.Item :key="getId()">
                            <Button
                              v-bind="{
                                ...(menuButton as object),
                                ...commonProps,
                              }"
                              :icon="getIcon(menuButton, commonProps)"
                            >
                              {{ menuButton.title }}
                            </Button>
                          </Menu.Item>
                        </template>
                      </template>
                    </Menu.SubMenu>
                    <template v-else>
                      <Menu.Item :key="getId()">
                        <Button
                          v-bind="{ ...menu, ...commonProps }"
                          :icon="getIcon(menu, commonProps)"
                        >
                          {{ menu.title }}
                        </Button>
                      </Menu.Item>
                    </template>
                  </template>
                </Menu>
              </template>
            </Dropdown>
          </template>
          <template v-else>
            <Button
              class="tl-button"
              v-bind="{ ...item, ...commonProps }"
              :icon="getIcon(item, commonProps)"
            >
              {{ item.title }}
            </Button>
          </template>
        </template>
      </template>
    </div>
    <div v-if="searchProps" class="search-wrap">
      <InputSearch
        class="search-input"
        v-model:value="searchContent"
        :allow-clear="true"
        :size="commonProps.size"
        enter-button
        v-bind="omit(searchProps, ['onSearch'])"
        @search="onSearch"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  InputSearch,
  ButtonProps,
} from 'ant-design-vue';
import { computed, ref, onMounted } from 'vue';
import {
  XToolbarButtons,
  BarDivider,
  toolbarProps,
  XToolbarButtonItem,
} from './types';
import { isString, omit } from 'lodash-es';
import { getId } from '@/utils/util';
import { hIcon } from '@/components/icon';

const props = defineProps(toolbarProps);

const emits = defineEmits<{
  (e: 'search', value: string): void;
}>();

const searchContent = ref('');

onMounted(() => {
  console.log('XToolbarButtons onMounted', getId());
});

const getIcon = (
  button: XToolbarButtonItem,
  commonProps: XToolbarButtonItem,
) => {
  const icon = commonProps.icon ?? button.icon;
  // TODO: 表格使用hIcon('ant-design:plus-circle-outlined')，会报错，暂时使用字符串
  if (icon && isString(icon)) {
    return hIcon(icon);
  }
  return icon;
};

const commonProps = computed(() => {
  return props.buttons?.commonProps ?? { size: 'small' as ButtonProps['size'] };
});
const realButtons = computed(() => {
  const showNumber = props.buttons?.number || 3;
  const buttons: XToolbarButtons['items'] = [];
  const menus: XToolbarButtons['items'] = [];
  let buttonNumber = 0;
  props.buttons?.items.forEach((item) => {
    if (item !== BarDivider) {
      buttonNumber++;
    }
    if (buttonNumber > showNumber) {
      menus.push(item);
    } else {
      buttons.push(item);
    }
  });
  if (menus.length > 0) {
    buttons.push({
      title: '更多',
      type: 'primary',
      icon: hIcon('ant-design:more-outlined'),
      ...(props.buttons?.moreProps ?? {}),
      menus,
    });
  }
  return buttons;
});

const onSearch = (value: string) => {
  emits('search', value);
  props.searchProps?.onSearch?.(value);
};
</script>
<style lang="less" scoped>
.x-toolbar-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tl-button + .tl-button {
    margin-left: 8px;
  }

  .buttons-wrap {
    :deep(button svg) {
      margin-right: 4px;
    }
  }

  .search-wrap {
    .search-input {
      width: 200px;
    }
  }
}
</style>
