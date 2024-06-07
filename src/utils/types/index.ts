/*
 * @Description: 全局公共 type 接口
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-08-31 08:56:55
 * @LastEditors: laoyang
 * @LastEditTime: 2023-09-28 14:47:23
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';

import { FLAG, LANGS, LOCAL_STORAGE, REQUEST_METHODS, ROUTES, STATUS } from '@/utils/enums'

/**
 * @description: 获取枚举的所有 key
 * @author: laoyang
 */
export type EnumKeys<T> = keyof T;

/**
 * @description: 获取枚举的所有可能值
 * @author: laoyang
 */
export type EnumValues<T> = T[EnumKeys<T>];

/**
 * @description: 状态
 * @author: laoyang
 */
export type Status = EnumValues<typeof STATUS>

/**
 * @description: 反推数组的类型，type B = A[]，ArrayType<B> 等同于 返回 A
 * @author: laoyang
 */
export type ArrayType<T extends any[]> = T extends Array<infer R> ? R : never;

/**
 * @description: 公共的类型
 * @author: laoyang
 */
export type CommonTypes = {
  parent_id?: string; // 父级id
  status: Status; // 组织状态
  sort: number; // 排序
  leader: string; // 岗位负责人
  founder: string; // 创建人
  describe: string; // 描述
}

/**
 * @description: 创建和更新时间
 * @author: laoyang
 */
export type TableTimes = {
  created_time: string; // 创建时间
  updated_time: string; // 最后一次更新时间
}

/**
 * @description: 查询时间
 * @author: laoyang
 */
export type SearchTimes = {
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}

/**
 * @description: Response 返回体
 * @author: laoyang
 */
export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 分页查询
 * @author: laoyang
 */
export type PageResponse<T> = {
  total: number;
  list: T[];
};

/**
 * @description: 默认分页查询参数
 * @author: laoyang
 */
export type PaginationParams = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}

/**
 * @description: 请求方法
 * @author: laoyang
 */
export type RequestMethods = EnumValues<typeof REQUEST_METHODS>

/**
 * @description: 全局状态数据流
 * @author: laoyang
 */
export type InitialStateTypes = {
  token?: string;
  userInfo?: API.User;
  MenuData?: API.Menu[];
  menuViewIds?: number[];
  RolePermissions?: API.RoleMenuPermission[];
  CurrentRoleId?: number;
  Locales?: Record<string, any>;
  Settings?: Partial<LayoutSettings>;
  Collapsed?: boolean;
}

/**
 * @description: 存储在 localstorage 的值
 * @author: laoyang
 */
export type AppLocalCacheTypes = {
  [LOCAL_STORAGE.USER_INFO]?: API.USERMANAGEMENT;
  [LOCAL_STORAGE.LAYOUT]?: Partial<LayoutSettings>;
  [LOCAL_STORAGE.ACCESS_TOKEN]?: string;
}

/**
 * @description: 用户登录
 * @author: laoyang
 */
export type LoginTypes = {
  access_token: string;
  login_last_time: Date;
}

/**
 * @description: 用户休眠
 * @author: laoyang
 */
export type LockSleepTypes = {
  last_time: number;
  isSleep: boolean;
}

/**
 * @description: 语言类型
 * @author: laoyang
 */
export type Langs = EnumValues<typeof LANGS>

/**
 * @description: 是否
 * @author: laoyang
 */
export type Flag = EnumValues<typeof FLAG>

/**
 * @description: 路由集合
 * @author: laoyang
 */
export type PathNames = EnumValues<typeof ROUTES>