<template>
  <div class="column-resize-container" ref="containerRef">
    <div class="left-column" ref="leftColumnRef">
      <div v-show="isExpand" class="left-content">
        <slot name="left"></slot>
      </div>
      <div v-if="expandable" class="splitter-icon" @click="onShowHide">
        <Icon :icon="isExpand ? 'ep:arrow-left-bold' : 'ep:arrow-right-bold'" />
      </div>
    </div>
    <div
      class="splitter"
      draggable="true"
      @mousedown="onMousedown"
      :style="{
        width: `${splitterWidth}px`,
      }"
    ></div>
    <div class="right-column" ref="rightColumn">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@/components/icon';
const props = defineProps({
  leftWidth: {
    type: Number,
    default: 240,
  },
  minLeftWidth: {
    type: Number,
    default: 50,
  },
  expandable: {
    type: Boolean,
    default: true,
  },
});

const expandIconWidth = 8;

let previousWidth = props.leftWidth;
const isExpand = ref(true);
const onShowHide = () => {
  if (isExpand.value) {
    setLeftColumnWidth(expandIconWidth);
  } else {
    setLeftColumnWidth(previousWidth);
  }
  isExpand.value = !isExpand.value;
};

function setLeftColumnWidth(width: number) {
  leftColumnRef.value!.style.width = `${width}px`;
}

const splitterWidth = 12;

const isResizing = ref(false);
const leftColumnRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
let tempMoveElement: HTMLElement | null = null;

const createMoveElement = () => {
  tempMoveElement = document.createElement('div');
  const leftColumnWidth = leftColumnRef.value?.offsetWidth || 0;
  tempMoveElement.style.position = 'absolute';
  tempMoveElement.style.top = '0';
  tempMoveElement.style.left = `${leftColumnWidth}px`;
  tempMoveElement.style.width = `8px`;
  tempMoveElement.style.height = '100%';
  tempMoveElement.style.backgroundColor = '#999';
  tempMoveElement.style.zIndex = '9999';
  containerRef.value?.appendChild(tempMoveElement);
};

/** 鼠标按下时的位置信息  */
let initMouseValue = 0;

/** 鼠标按下时离最左边的位置信息  */
let initLeftValue = 0;

/** 最大拖动的值 */
let maxMoveValue = 0;

const getElLeft = (el: HTMLElement | null) => {
  return Number((el?.style.left ?? '').replace('px', ''));
};

/**
 * 鼠标按下事件，會劫持鼠标的點擊事件
 * @param
 */
const onMousedown = (e: MouseEvent) => {
  initMouseValue = e.clientX;
  isResizing.value = true;
  createMoveElement();
  initLeftValue = getElLeft(tempMoveElement);

  maxMoveValue = (containerRef.value?.offsetWidth || 0) - splitterWidth;

  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('mouseup', onMouseup);
};

/** 鼠标已拖动过 */
let isDragged = false;

const onMouseup = () => {
  if (!tempMoveElement) {
    return;
  }

  // 每次鼠标拖动过之后，都需要更新左列的宽度，并且设置isExpand为true
  if (isDragged) {
    previousWidth = getElLeft(tempMoveElement);
    setLeftColumnWidth(previousWidth);
    isExpand.value = true;
    isDragged = false;
  }
  isResizing.value = false;

  tempMoveElement.remove();
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('mouseup', onMouseup);
};
const onMousemove = (e: MouseEvent) => {
  if (!isResizing.value) return;
  isDragged = true;
  // 鼠标的移动距离
  const offsetX = e.clientX - initMouseValue;
  let newLeftWidth = offsetX + initLeftValue;

  if (newLeftWidth < props.minLeftWidth) {
    newLeftWidth = props.minLeftWidth;
  }
  if (newLeftWidth > maxMoveValue) {
    newLeftWidth = maxMoveValue;
  }

  tempMoveElement!.style.left = `${newLeftWidth}px`;
};

onMounted(() => {
  /**
   * 使用这种方式初始化左列的宽度
   * 不使用:style="{ width: `${previousWidth}px` }"的方式
   * 是因为 当子元素 isExpand更新后，元素使用了即使不是响应式的变量也会更新 previousWidth
   */
  setLeftColumnWidth(previousWidth);
});
</script>

<style scoped lang="less">
/* 设置容器和左右列的样式 */
.column-resize-container {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.left-column {
  border: 1px solid #dbd8d8;
  transition: width 0.3s;
  display: flex;

  .left-content {
    flex: 1;
    overflow: auto;
    padding: 10px;
  }

  .splitter-icon {
    width: 8px;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: #eee;
  }
}

.right-column {
  flex: 1;
  overflow: auto;
  padding: 10px;
  transition: width 0.3s;
  border: 1px solid #dbd8d8;
}

/* 设置中分线的样式 */
.splitter {
  cursor: col-resize;
  align-items: center;
  display: flex;
}
</style>
