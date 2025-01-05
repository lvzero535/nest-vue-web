<template>
  <div>
    <XToolbar :buttons="options" />
  </div>
</template>
<script setup lang="ts">
import { hIcon } from '@/components/icon';
import { XToolbar, XToolbarButtons } from '@/components/toolbar';

const options: XToolbarButtons = {
  commonProps: {
    size: 'small',
  },
  // moreText: '高级',
  items: [
    {
      title: '添加',
      icon: hIcon('ant-design:plus-circle-outlined'),
      type: 'primary',
      onClick: () => {
        console.log('添加');
      },
    },
    '|',
    {
      title: '编辑',
      type: 'primary',
      icon: hIcon('ant-design:delete-outlined'),
    },
    {
      title: '删除',
      type: 'link',
      icon: 'ant-design:delete-outlined',
      // icon: hIcon('ant-design:delete-outlined'),
    },
    {
      title: '导入',
      type: 'link',
      onClick: () => {
        console.log('导入');
      },
    },
    {
      title: '导出',
      type: 'link',
      onClick: () => {
        console.log('导出');
      },
    },
    '|',
    {
      title: '高级选项',
      type: 'link',
      menus: [
        {
          title: '高级选项1',
          type: 'link',
          onClick: () => {
            console.log('添加');
          },
        },
        {
          title: '高级选项2',
          type: 'link',
        },
      ],
    },
  ],
};
</script>
