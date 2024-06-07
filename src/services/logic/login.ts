/*
 * @Description: 用户登录模块 API
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-11-29 16:38:17
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-26 17:24:29
 */
import type { LoginTypes } from '@/utils/types';
import type { LoginParams } from '@/utils/types/login'
import { httpRequest } from '@/utils/umiRequest'

/**
 * @description: 用户登录接口
 * @param {LoginParams} options
 * @Author: laoyang
 */
export const Login = (options?: LoginParams) => httpRequest.post<LoginTypes>('/auth/login', options);

/**
 * @description: 用户退出登录
 * @param {LoginParams} options
 * @Author: laoyang
 */
export const Logout = () => httpRequest.post<Record<string, any>>('/auth/logout');

/**
 * @description: 获取当前用户信息
 * @Author: laoyang
 */
export const getUserInfo = () => httpRequest.get<API.USERMANAGEMENT>('/auth/user-info');

/**
 * @description: 获取当前用户按钮权限
 * @Author: laoyang
 */
export const getPermissions = () => httpRequest.get<string[]>('/auth/permissions');

/**
 * @description: 获取用户权限菜单
 * @Author: laoyang
 */
export const getRoutesMenus = () => httpRequest.get<API.MENUMANAGEMENT[]>('/auth/routes-menu');

/**
 * @description: 获取图形验证码
 * @Author: laoyang
 */
export const getCaptcha = () => httpRequest.get<string>('/auth/verify-code');