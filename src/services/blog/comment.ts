// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改评论PUT /comment/${param0} */
export async function commentControllerUpdateComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  body: API.Comment,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/comment/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 启用禁用评论 PUT /role/new/${param0} */
export async function modifyCommentStatus(
  id: string,
  status: string | number,
  options?: { [key: string]: any },
) {
  return request<any>(`/comment/updateStatus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id, status },
    ...(options || {}),
  });
}

/** 批量修改评论 PUT /comment/${param0} */
export async function commentControllerUpdateBatchComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: {
    comment_ids: number[],
    role_id: number,
  },
  options?: { [key: string]: any },
) {
  return request<any>(`/comment/updateBatch`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 删除评论DELETE /comment/${param0} */
export async function commentControllerDeleteComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/comment/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看评论详情 GET /comment/detail/${param0} */
export async function commentControllerGetCommentById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/comment/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取评论列表 GET /comment/list */
export async function commentControllerGetCommentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CommentControllerGetCommentListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/comment/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 获取不分页的评论列表 GET /comment/sellist */
export async function commentControllerGetSelCommentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  id: number,
  orderBy: string,
  options?: { [key: string]: any },
) {
  return request<any>(`/comment/selist/${id}`, {
    method: 'GET',
    params: {
      orderBy
    },
    ...(options || {}),
  });
}

/** 新增评论POST /comment/new */
export async function commentControllerCreateComment(
  body: API.CommentNew,
  options?: { [key: string]: any },
) {
  return request<any>('/comment/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 评论点赞  */
export async function commentControllerCreateLike(commentId: string, options?: { [key: string]: any }) {
  return request<any>(`/comment/like/new/${commentId}`, {
    method: 'POST',
    ...(options || {}),
  });
}


/** 删除点赞  */
export async function commentControllerDeleteLike(id: string, options?: { [key: string]: any }) {
  return request<any>(`/comment/like/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


/** 获取评论是否被点赞  */
export async function commentControllerGetCollectStatus(
  id: string,
  options?: { [key: string]: any },
) {
  return request<any>(`/comment/like/one/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}