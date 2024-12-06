import router from '@/router';

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
