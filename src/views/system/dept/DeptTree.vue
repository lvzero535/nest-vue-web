<template>
  <div>
    <InputSearch
      v-model:value="searchValue"
      style="margin-bottom: 8px"
      placeholder="Search"
    />
    <Tree
      :fieldNames="{ title: 'name', key: 'id', children: 'children' }"
      v-model:selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      @select="onSelect"
      :tree-data="genData"
    >
    </Tree>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Tree, InputSearch, TreeProps } from 'ant-design-vue';
import { DeptModel, getDeptList } from '@/api/dept';
import { Key } from 'ant-design-vue/es/_util/type';

const genData = ref<DeptModel[]>([]);
const expandedKeys = ref([-1]);
const selectedKeys = ref([-1]);
const searchValue = ref('');
const emits = defineEmits(['select']);
const onSelect: TreeProps['onSelect'] = (keys: Key[], info: SafeAny) => {
  emits('select', keys, info);
  console.log('selected', keys, info);
};

onMounted(async () => {
  const resp = await getDeptList();
  if (resp.success) {
    genData.value = [
      {
        id: -1,
        name: '所有',
        children: resp.data.list,
      },
    ];
  }
});
</script>
