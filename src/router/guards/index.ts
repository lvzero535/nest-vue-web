import { Router } from 'vue-router';
import permissionGuard from './permission';
import pageGuard from './page';

export function setupGuards(router: Router) {
  permissionGuard(router);
  pageGuard(router);
}
