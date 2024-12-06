import { createPinia } from 'pinia';
import { App } from 'vue';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const store = createPinia();

store.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
  }),
);

export function setupStore(app: App) {
  app.use(store);
}
