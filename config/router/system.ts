/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 16:50:12
 */
export default {
  path: '/system',
  name: 'system',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/system',
      redirect: '/system/user-management',
      exact: true,
    },
    {
      path: '/system/user-management',
      name: 'user-management',
      component: './System/UserManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/menu-management',
      name: 'menu-management',
      component: './System/MenuManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/role-management',
      name: 'role-management',
      component: './System/RoleManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/internationalization',
      name: 'internationalization',
      component: './System/Internationalization',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/operation-log',
      name: 'operation-log',
      component: './System/OperationLog',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/user',
      name: '用户管理',
      component: './System/User',
      exact: true,
    },
    {
      path: '/system/role',
      name: '角色管理',
      component: './System/Role',
      exact: true,
    },
    {
      name: '分配角色菜单',
      path: '/system/role/roleMenu',
      component: './System/Role/roleMenu',
      hideInMenu: true,
      exact: true,
    },
    {
      path: '/system/menu',
      name: '菜单管理',
      component: './System/Menu',
      exact: true,
    },
    {
      path: '/system/permission',
      name: '权限管理',
      component: './System/Permission',
      exact: true,
    },
  ],
};
