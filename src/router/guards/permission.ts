import { Router } from 'vue-router';
import { whiteNameList } from '@/router/constant';
import { useUserStore } from '@/store/modules/user';
import { LoginRoute } from '../routes/outsideLayout';

export default function permissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    if (whiteNameList.includes(to.fullPath)) {
      next();
    } else {
      const user = useUserStore();
      if (user.token) {
        if (user.menus?.length === 0) {
          await user.createMenus();
        }
        next();
      } else {
        next({ path: LoginRoute.path });
      }
    }
  });
}
