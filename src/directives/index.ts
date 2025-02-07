import { App } from 'vue';
import { dragger } from './dragger';

export function setupDirectives(app: App) {
  app.directive('dragger', dragger);
}
