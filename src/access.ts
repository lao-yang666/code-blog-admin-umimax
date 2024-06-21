/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  if (!initialState) return {}
  const { userInfo, RolePermissions, menuViewIds } = initialState ?? {};


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
  return {
    role_level: userInfo?.role?.sort as number,
    menuAccess,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: any) => {
      return menuViewIds?.includes(route.menu_id)
    },
  };
}
