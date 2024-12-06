import { Router } from 'vue-router';
import { getRouteByPath } from '../helper';
import { useTabsStore } from '@/store/modules/tabs';

export default function pageGuard(router: Router) {
  const tabsStore = useTabsStore();
  router.beforeEach((to) => {
    const route = getRouteByPath(to.path);
    if (!route?.children.length) {
      tabsStore.addTabs(to.path);
    }
  });
}
