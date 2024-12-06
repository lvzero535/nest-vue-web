<template>
  <template v-if="type === 'svg'">
    <SvgIcon :name="icon" :size="size" v-bind="$attrs" />
  </template>
  <template v-else-if="type === 'iconify'">
    <IconifyIcon
      :icon="icon"
      class="iconify-icon"
      v-bind="$attrs"
      :style="iconifyStyle"
    />
  </template>
</template>
<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue';
import SvgIcon from './SvgIcon.vue';
import { computed, CSSProperties, PropType } from 'vue';
import { DefaultIconsType } from './icons.data';
const props = defineProps({
  type: {
    type: String as PropType<'svg' | 'iconify'>,
    default: 'iconify',
  },
  icon: {
    type: String as PropType<DefaultIconsType | string>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 14,
  },
});

const iconifyStyle = computed<CSSProperties>(() => {
  return {
    /* IconifyIcon的图标大小通过 fontSize 来设置 */
    fontSize: `${props.size}px`,
  };
});
</script>
<style lang="less" scoped>
.iconify-icon {
  vertical-align: -0.15em;
}
</style>
