<template>
  <div>Login</div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { onMounted } from 'vue';
onMounted(() => {
  const user = useUserStore();
  if (!user.token) {
    user.login().then(() => {
      router.push({ path: '/' });
    });
  } else {
    router.push({ path: '/' });
  }
});
</script>
