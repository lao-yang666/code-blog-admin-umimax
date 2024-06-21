// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取文章详情 GET /post/${param0} */
export async function postControllerGetPostById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerGetPostByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章 PUT /post/${param0} */
export async function postControllerUpdatePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerUpdatePostParams,
  body: API.Post,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}


/** 删除文章 DELETE /post/${param0} */
export async function postControllerDeletePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

export async function postControllerDeleteManyPost(
  body: API.PostControllerDeletePostParams[],
  options?: { [key: string]: any },
) {
  return request<any>(`/post/deleteMany`, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}


/** 修改文章草稿 PUT /post/draft/${param0} */
export async function postControllerUpdateDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerUpdateDraftParams,
  body: API.Post,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/draft/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 创建文章草稿 POST /post/draft/new */
export async function postControllerCreateDraft(body: API.PostNew, options?: { [key: string]: any }) {
  return request<any>('/post/draft/new', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除文章草稿 DELETE /post/draft${param0} */
export async function postControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerDeleteDraftParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/post/draft/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文章列表 GET /post/list */
export async function postControllerGetPublishedPosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostControllerGetPublishedPostsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/post/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建文章 POST /post/new */
export async function postControllerCreatePost(body: API.PostNew, options?: { [key: string]: any }) {
  return request<any>('/post/new', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 文章点赞  */
export async function postControllerCreateLike(postId: number, options?: { [key: string]: any }) {
  return request<any>(`/post/like/new/${postId}`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 文章收藏  */
export async function postControllerCreateCollection(postId: number, options?: { [key: string]: any }) {
  return request<any>(`/post/collect/new/${postId}`, {
    method: 'POST',
    ...(options || {}),
  });
}


/** 删除点赞  */
export async function postControllerDeleteLike(id: number, options?: { [key: string]: any }) {
  return request<any>(`/post/like/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 删除收藏  */
export async function postControllerDeleteCollect(id: number, options?: { [key: string]: any }) {
  return request<any>(`/post/collect/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取文章评论 GET /post/list */
export async function postControllerGetCommentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/post/comment/list/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取文章是否被点赞  */
export async function postControllerGetCollectStatus(
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/post/collect/one/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取文章是否被收藏  */
export async function postControllerLikeStatus(
  id: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/post/like/one/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}


/** 文章评论  */
export async function postControllerCreateComment(body: API.PostComment, options?: { [key: string]: any }) {
  return request<any>('/post/comment/new', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除评论  */
export async function postControllerDeleteComment(id: number, options?: { [key: string]: any }) {
  return request<any>(`/post/comment/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}