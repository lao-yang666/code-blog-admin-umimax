/*
 * @Description: 全局入口文件
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-09-17 20:33:50
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-24 09:43:51
 */

import { Settings as LayoutSettings } from '@ant-design/pro-components'; // 高级组件
import { addLocale, history } from '@umijs/max';
import { assign, eq, forEach, get, isEmpty, isNil } from 'lodash-es'

import { BasiLayout } from '@/components/BasiLayout'; // 全局 layout 布局
import TabsLayout, { TabsLayoutProps } from '@/components/TabsLayout' // 多标签页配置
import {
  menuControllerGetSelMenuList as queryMenuList,
  menuControllerGetSelPermissionList as roleGetMenuAccessByid,
} from '@/services/blog/caidanguanli'
import { permissionControllerGetRoleUserAccessByid as getMenuView } from '@/services/blog/quanxianguanli'
import {
  getLocalStorageItem, getSessionStorageItem, getToken, setLocalStorageItem,
} from '@/utils' // 全局工具函数
import { ANTD_LANGS } from '@/utils/const'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes, Langs } from '@/utils/types'
import type { DynamicRoutes } from '@/utils/types/dynamicroutes/typings';
import umiRequest from '@/utils/umiRequest'; // umi-request 请求封装

import defaultSettings from '../config/defaultSettings'; // 全局默认配置
import Locales from '../src/locales'; // 全局多语言配置
import loopMenuItem from './components/DiyRouteItem';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  const userInfo = getSessionStorageItem<API.User>('userInfo') ?? undefined;
  const token = getToken() ?? undefined;
  // 获取 LAYOUT 的值
  const Layout_Settings = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT) || defaultSettings;
  // 获取 ACCESS_TOKEN
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN) || undefined;
  // 存储到 localstorage
  setLocalStorageItem(LOCAL_STORAGE.LAYOUT, Layout_Settings)
  // 初始化多语言
  // const Locales = get(await getAllLocalesLang(), 'data', {})
  // 动态添加多语言
  if (!isEmpty(Locales) && !isNil(Locales)) {
    forEach(Locales, (value: Record<string, string>, key: Langs) => {
      addLocale(key, value, ANTD_LANGS[key]);
    })
  }
  // 初始化数据
  const initialState: InitialStateTypes = {
    userInfo,
    token,
    Access_token: ACCESS_TOKEN,
    Settings: Layout_Settings,
    Collapsed: false,
    Locales,
  }
  console.log(initialState, 'initia===app=app');
  // 判断是否登录，没有登录跳转到登录页
  if (!token) {
    history.push(ROUTES.LOGIN);
    return initialState
  }
  // 判断在登录页是否已登录，已登录则跳转主页
  if (eq(location.pathname, ROUTES.LOGIN) && ACCESS_TOKEN) {
    history.push('/');
  }
  // 如果不是登录页面，执行
  if (!eq(location.pathname, ROUTES.LOGIN)) {
    // const result = await initUserAuthority()
    const [menu, roleMenu, menuView] =
      await Promise.all([
        queryMenuList(), roleGetMenuAccessByid({ roleId: Number(userInfo?.role_id) }),
        getMenuView({ id: Number(userInfo?.role_id) })])
    // 初始化全局状态
    return assign(initialState, {
      CurrentRoleId: Number(userInfo?.role_id),
      MenuData: menu.data,
      RolePermissions: roleMenu.data,
      menuViewIds: menuView.data.map((item: API.Permission) => item.menu_id),
    })
  }


  return initialState
}

/**
 * @description: 全局 lyout 布局
 * @doc ProLayout 支持的api https://procomponents.ant.design/components/layout
 * @Author: laoyang
 */
export const layout = BasiLayout

/**
 * @description: 完全覆盖内置的多 Tabs 组件，需要搭配配置 hasCustomTabs:true 使用。
 * @doc https://alitajs.com/zh-CN/docs/guides/tabs#getcustomtabs
 * @Author: laoyang
 */
export const getCustomTabs = () => (props: TabsLayoutProps) => <TabsLayout {...props} />

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * @Author: laoyang
 */
export const request = umiRequest;

let extraRoutes: API.Menu[] = [];

export function patchClientRoutes({ routes }: { routes: DynamicRoutes.RouteItem[] }) {

  const routerIndex = routes.findIndex((item: DynamicRoutes.RouteItem) => item.path === '/')
  const parentId = routes[routerIndex].id
  if (extraRoutes.length) {
    routes[routerIndex]['routes'].push(
      ...loopMenuItem(extraRoutes, parentId),
    )
    console.log('===extraRoutes==,', extraRoutes);
  }
}

export function render(oldRender: any) {
  console.log('===render==');
  queryMenuList().then((res) => {
    if (res) {
      extraRoutes = res.data;
    }
  }).finally(() => {
    oldRender(); // 等请求完了 再执行oldRender
  });

}
