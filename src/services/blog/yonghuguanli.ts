// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改用户 PUT /user/${param0} */
export async function userControllerUpdateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserByIdParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量修改用户角色 PUT /user/${param0} */
export async function userControllerUpdateBatchUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: {
    user_ids: number[],
    role_id: number,
  },
  options?: { [key: string]: any },
) {
  return request<any>(`/user/updateBatch`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 删除用户 DELETE /user/${param0} */
export async function userControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerDeleteDraftParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看用户详情 GET /user/detail/${param0} */
export async function userControllerGetUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /user/list */
export async function userControllerGetUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetUserListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 获取不分页的用户列表 GET /user/sellist */
export async function userControllerGetSelUserList() {
  return request<any>('/user/selist', {
    method: 'GET',
  });
}

/** 获取统计 */
export async function userControllerGetStatistic(id:number) {
  return request<any>(`/user/statistic/${id}`, {
    method: 'GET',
  });
}

/** 获取首页统计 */
export async function userControllerGetHomeStatistic() {
  return request<any>(`/user/allStatistic`, {
    method: 'GET',
  });
}

/** 获取所有用户排名 */
export async function userControlleListRank() {
  return request<any>(`/user/userListRank`, {
    method: 'GET',
  });
}

/** 新增用户 POST /user/new */
export async function userControllerCreateUser(
  body: API.UserNew,
  options?: { [key: string]: any },
) {
  return request<any>('/user/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增关注*/
export async function userControllerfollowingUser(
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/user/following/new/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 查看是否关注了 */
export async function userControllerChcekfollowing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/user/following/detail/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除关注 **/
export async function userControllerDeletefollowing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/user/following/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 登录 PUT /user/${param0} */
export async function userLoginByAccount(
  body: Pick<API.UserNew, 'name' | 'password'>,
  options?: { [key: string]: any },
) {
  return request<any>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}