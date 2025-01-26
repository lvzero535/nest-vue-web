import { Router } from 'vue-router';
import { whiteNameList } from '@/router/constant';
import { useUserStore } from '@/store/modules/user';
import { LoginRoute } from '../routes/outsideLayout';

export default function permissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    if (whiteNameList.includes(to.path)) {
      next();
    } else {
      const user = useUserStore();
      if (user.token) {
        if (user.menus?.length === 0) {
          await user.getUserInfo();
          // 刚添加的路由，还没有添加到路由中，需要重新跳转一次
          next({ ...to, replace: true });
        } else {
          next();
        }
        console.log(router.hasRoute(to.path));
      } else {
        next({ path: LoginRoute.path, query: { redirect: to.path } });
      }
    }
  });
}
