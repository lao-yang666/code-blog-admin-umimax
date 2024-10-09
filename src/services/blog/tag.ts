// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改消息PUT /tag/${param0} */
export async function tagControllerUpdateTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  body: API.Tag,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/tag/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量修改消息角色 PUT /tag/${param0} */
export async function tagControllerUpdateBatchTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: {
    tag_ids: number[],
    role_id: number,
  },
  options?: { [key: string]: any },
) {
  return request<any>(`/tag/updateBatch`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 删除消息DELETE /tag/${param0} */
export async function tagControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/tag/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看消息详情 GET /tag/detail/${param0} */
export async function tagControllerGetTagById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/tag/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取消息列表 GET /tag/list */
export async function tagControllerGetTagList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TagControllerGetTagListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/tag/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 获取不分页的消息列表 GET /tag/sellist */
export async function tagControllerGetSelTagList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { type: string },
  options?: { [key: string]: any },
) {
  return request<any>('/tag/selist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 新增消息POST /tag/new */
export async function tagControllerCreateTag(
  body: API.TagNew,
  options?: { [key: string]: any },
) {
  return request<any>('/tag/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/***标签分类 */

export async function tagControllerUpdateTagClasses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  body: API.TagClasses,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/tag/update/classes/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除消息DELETE /tag/${param0} */
export async function tagControllerDeleteTagClasses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/tag/del/classes/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}


/** 获取消息列表 GET /tag/list */
export async function tagControllerGetTagClassesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TagControllerGetTagListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/tag/classeslist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 获取不分页的消息列表 GET /tag/sellist */
export async function tagControllerGetSelTagClassesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  options?: { [key: string]: any },
) {
  return request<any>('/tag/selistClasses', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 新增消息POST /tag/new */
export async function tagControllerCreateTagClasses(
  body: API.TagClassesNew,
  options?: { [key: string]: any },
) {
  return request<any>('/tag/newClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 新增消息POST /tag/new */
export async function tagControllerCreateUserTag(
  body: { tag_id: number; user_id: number; },
  options?: { [key: string]: any },
) {
  return request<any>('/tag/new/userTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function tagControllerUpdateUserTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: { tag_id: number; user_id: number; newtag_id: number },
  options?: { [key: string]: any },
) {
  return request<any>(`/tag/update/userTag`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function tagControllerDeleteUserTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { tag_id: number; user_id: number; },
  options?: { [key: string]: any },
) {
  const { tag_id, user_id } = params;
  return request<any>(`/tag/del/userTag/${tag_id}/${user_id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


export async function tagControllerCreatePostTag(
  body: { tag_id: number; post_id: number; },
  options?: { [key: string]: any },
) {
  return request<any>('/tag/new/postTag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function tagControllerUpdatePostTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: { tag_id: number; post_id: number; newtag_id: number },
  options?: { [key: string]: any },
) {
  return request<any>(`/tag/update/postTag`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function tagControllerDeletePostTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { tag_id: number; post_id: number; },
  options?: { [key: string]: any },
) {
  const { tag_id, post_id } = params;
  return request<any>(`/tag/del/postTag/${tag_id}/${post_id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}