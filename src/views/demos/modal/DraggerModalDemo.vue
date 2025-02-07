<template>
  <div>
    <Button type="primary" @click="showModal">DraggerModal</Button>
    <DraggerModal title="DraggerModal title" v-model:open="open" @ok="handleOk">
      <!-- <template #title>
        <div>aaaa</div>
      </template> -->
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </DraggerModal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import DraggerModal from '@/components/modal/src/DraggerModal.vue';
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>
