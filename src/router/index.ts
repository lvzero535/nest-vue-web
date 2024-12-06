import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { setupGuards } from './guards';

export const router = createRouter({
  history: createWebHashHistory(''),
  routes,
});

export function setupRouter(app: App) {
  setupGuards(router);
  app.use(router);
}

export default router;
