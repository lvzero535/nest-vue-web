<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';

defineOptions({
  name: 'SvgIcon',
});

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: 'svg-icon',
  },
  size: {
    type: [Number, String],
    default: 14,
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  const s = `${size}`.replace('px', '').concat('px');
  return {
    width: s,
    height: s,
  };
});
</script>

<style lang="less">
.svg-icon {
  overflow: hidden;
  fill: currentcolor;
  vertical-align: -0.15em;
}
</style>
