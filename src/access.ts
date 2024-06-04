/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { forEach } from 'lodash-es'

import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  if (!initialState) return {}
  const { Permissions, RouteMenu, userInfo, RolePermissions } = initialState ?? {};
  /**
   * @description: 获取当前所有路由
   * @author: 白雾茫茫丶
   */
  const getRouteNames = (tree = RouteMenu): string[] => {
    // 收集当前层级的所有 name 属性 
    let result: string[] = []
    // 遍历收集
    forEach(tree, (node: API.MENUMANAGEMENT) => {
      result.push(node.name);
      if (node?.routes?.length) {
        result = result.concat(getRouteNames(node.routes));
      }
    });
    return result
  }

  const menuAccess: Record<string, Array<{ effect_form: string; permission_key: string; }>> = {};
  if (RolePermissions?.length) {
    RolePermissions?.forEach((item: API.RoleMenuPermission) => {
      if (!menuAccess[item.menuId]) {
        menuAccess[item.menuId] = []
      }
      menuAccess[item.menuId].push({
        effect_form: item.button_permission.effect_form,
        permission_key: item.button_permission.permission_key,
      })
    })
  }
  console.log(menuAccess, '=========menuAccess=========cc==', userInfo);
  return {
    role_level: userInfo?.role?.sort as number,
    menuAccess,
    // 判断是否有操作权限
    operationPermission: (data: string) => Permissions ? Permissions.includes(data) : false,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: any) => {
      console.log(route, '==');

      const allRouteNames = getRouteNames()
      return !allRouteNames.includes(route.name)
    },
  };
}
