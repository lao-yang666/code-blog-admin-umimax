/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import type { InitialStateTypes } from '@/utils/types'
type AcessItem = Pick<API.buttonPermission, 'permission_key' | 'effect_form' | 'status'>;
export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  if (!initialState) return {}
  const { userInfo, RolePermissions, menuViewIds } = initialState ?? {};


  const menuAccess: Record<string, Array<AcessItem>> = {};
  if (RolePermissions?.length) {
    RolePermissions?.forEach((item: API.RoleMenuPermission) => {
      if (!menuAccess[item.menuId]) {
        menuAccess[item.menuId] = []
      }
      // status 为1 按钮权限生效，否则不生效
      if(item.button_permission.status === 1){
        menuAccess[item.menuId].push({
          effect_form: item.button_permission.effect_form,
          permission_key: item.button_permission.permission_key,
        })
      }
    })
  }
  return {
    role_level: userInfo?.role?.sort as number,
    menuAccess,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: any) => {
      return true
      // return menuViewIds?.includes(route.menu_id)
    },
  };
}
