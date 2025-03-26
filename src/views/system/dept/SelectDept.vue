<template>
  <TreeSelect
    v-model:value="value"
    show-search
    :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder="Please select"
    allow-clear
    tree-default-expand-all
    :tree-data="treeData"
    tree-node-filter-prop="label"
  >
  </TreeSelect>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import { DeptModel, getDeptList } from '@/api/dept';

const value = defineModel('value');

const treeData = ref<DeptModel[]>([]);

async function getDeptData() {
  const resp = await getDeptList();
  if (resp.success) {
    treeData.value = resp.data.list;
  }
  return resp.data;
}

onMounted(() => {
  getDeptData();
});
</script>
