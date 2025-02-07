<template>
  <Modal
    ref="modalRef"
    :wrap-style="{ overflow: 'hidden' }"
    v-bind="omit($attrs, ['title'])"
  >
    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">
        <slot name="title">
          {{ $attrs.title }}
        </slot>
      </div>
    </template>
    <template #modalRender="{ originVNode }">
      <div ref="modelWrapRef" :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
    <slot></slot>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties, watch, watchEffect } from 'vue';
import { Modal } from 'ant-design-vue';
import { useDraggable } from '@vueuse/core';
import { omit } from 'lodash-es';

defineOptions({
  inheritAttrs: false,
});

const modalTitleRef = ref<HTMLElement>();
const modelWrapRef = ref<HTMLElement>();

const { x, y, isDragging } = useDraggable(modalTitleRef);

// 弹窗标题元素移动前的初始坐标
const modalTitleInitPosition = {
  x: 0,
  y: 0,
};

// 拖动是一个过程，这里是判断是开始的瞬间，为了记录拖动前的状态，是否开始拖动
const startedDrag = ref(false);

const transformX = ref(0);
const transformY = ref(0);
const transformMax = {
  x: 0,
  y: 0,
};

const transformMin = {
  x: 0,
  y: 0,
};

watch(modelWrapRef, () => {
  if (!modelWrapRef.value) {
    return;
  }
  const bodyRect = document.body.getBoundingClientRect();
  const initRect = modelWrapRef.value.getBoundingClientRect();

  transformMin.y = bodyRect.top - initRect.top;
  transformMax.y = bodyRect.bottom - initRect.bottom;

  transformMin.x = bodyRect.left - initRect.left;
  transformMax.x = bodyRect.right - initRect.right;
});

watch([x, y], () => {
  // 拖动前的记录
  if (!startedDrag.value) {
    modalTitleInitPosition.x = x.value;
    modalTitleInitPosition.y = y.value;
  }
  // 已开始拖动
  startedDrag.value = true;
});
watch(isDragging, () => {
  // 拖动结束后，恢复标记
  if (!isDragging) {
    startedDrag.value = false;
  }
});

const between = (val = 0, min = 0, max = 0) => {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
};

watchEffect(() => {
  console.log('position =>', x.value);
  // 开始拖动后，修改modal的拖动坐标
  if (startedDrag.value) {
    transformX.value = between(
      x.value - modalTitleInitPosition.x,
      transformMin.x,
      transformMax.x,
    );
    transformY.value = between(
      y.value - modalTitleInitPosition.y,
      transformMin.y,
      transformMax.y,
    );
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
</script>
