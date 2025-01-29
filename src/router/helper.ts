import { MenuModel, MenuTypeEnum } from '@/api/menu';
import { DefaultIconsType } from '@/components/icon';
import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { constantRoutes } from './routes/constantRoutes';
import { rootRoute } from './routes';
import { asyncDemoMenus } from './routes/system';
import { useUserStoreWithOut } from '@/store/modules/user';

/**
 * 根据路径获取路由对象
 * @param path - 要搜索的路径
 * @returns 匹配的路由对象，如果没有找到则返回 undefined
 */
export function getRouteByPath(path: string) {
  // 这里无法使用 useRouter() 函数，因为它只能在组件的 setup 函数中使用
  // const router = useRouter();
  // 获取所有路由配置
  const routes = router.getRoutes();
  // 在路由配置中查找路径匹配的路由对象
  return routes.find((item) => item.path === path);
}

function getMeta(menu: MenuModel, isMenu = false): RouteRecordRaw['meta'] {
  return {
    title: menu.name,
    icon: menu.icon as DefaultIconsType,
    keepAlive: true,
    permissions: isMenu ? (menu.children?.map((i) => i.permission!) ?? []) : [],
  };
}

export function menusToRoutes(menus: MenuModel[]): RouteRecordRaw[] {
  return menus.map((item) => {
    if (item.type === MenuTypeEnum.CATALOG) {
      const children = item.children?.sort((a, b) => b.order! - a.order!);
      return {
        path: item.path!,
        redirect: children![0].path!,
        children: menusToRoutes(children!),
        meta: getMeta(item),
      };
    }
    // 如果是按钮类型，则添加到菜单里，但不返回路由对象
    // 如果是菜单类型，则返回一个路由对象

    return {
      path: item.path!,
      component: () => import(`@/views${item.path!}/index.vue`),
      // component: () =>
      //   import.meta.glob(`src/views${item.path!}/index.vue`, {
      //     eager: true,
      //   }),
      meta: getMeta(item, true),
    };
  });
}

export function generateDynamicRoutes(menus: MenuModel[]) {
  const userStore = useUserStoreWithOut();
  const isDemo = userStore.isDemoMode;
  const asyncRoutes = isDemo ? asyncDemoMenus : menusToRoutes(menus);
  const routes = [...constantRoutes, ...asyncRoutes];
  rootRoute.children = routes;
  router.addRoute(rootRoute);
  // 获取所有路由配置
  // 在路由配置中查找路径匹配的路由对象
  return routes;
}
