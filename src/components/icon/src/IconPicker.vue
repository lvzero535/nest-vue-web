<template>
  <div class="icon-picker-wrapper">
    <Popover
      v-model:open="visible"
      trigger="click"
      placement="bottomLeft"
      overlayClassName="icon-picker-wrapper-popover"
      :getPopupContainer="getPopupContainer"
    >
      <template #content>
        <IconPreview
          cSize="small"
          :size="38"
          :grid-items="9"
          @click="onClick"
        />
      </template>
      <Input v-model:value="modelValue">
        <template v-if="modelValue" #prefix>
          <Icon :size="20" :icon="modelValue" />
        </template>
      </Input>
    </Popover>
  </div>
</template>
<script setup lang="ts">
import { IconPreview, Icon } from '@/components/icon';
import { Popover, Input } from 'ant-design-vue';
import { ref } from 'vue';

const modelValue = defineModel<string>('value');
const getPopupContainer = (triggerNode: HTMLElement) =>
  triggerNode.parentNode as HTMLElement;

const visible = ref(false);
const onClick = (icon: string) => {
  modelValue.value = icon;
  visible.value = false;
};
</script>

<style lang="less" scoped>
.icon-picker-wrapper {
  :deep(.icon-picker-wrapper-popover) {
    padding: 0;
    height: 280px;
    width: 100%;

    .ant-popover-content {
      height: 100%;

      .ant-popover-inner {
        height: 100%;

        .ant-popover-inner-content {
          height: 100%;
        }
      }
    }
  }
}
</style>
