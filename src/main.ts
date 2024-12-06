import { createApp } from 'vue';
import '@/styles/index.less';
import 'virtual:svg-icons-register';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';

const app = createApp(App);

async function bootstrap() {
  setupStore(app);
  setupRouter(app);
  app.mount('#app');
}

bootstrap();
