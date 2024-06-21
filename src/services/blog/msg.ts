// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改消息PUT /msg/${param0} */
export async function msgControllerUpdateMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  body: API.Msg,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/msg/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 启用禁用消息 PUT /role/new/${param0} */
export async function modifyMsgStatus(
  id: number,
  status: number,
  options?: { [key: string]: any },
) {
  return request<any>(`/msg/updateStatus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id, status },
    ...(options || {}),
  });
}

/** 批量修改消息角色 PUT /msg/${param0} */
export async function msgControllerUpdateBatchMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: {
    msg_ids: number[],
    role_id: number,
  },
  options?: { [key: string]: any },
) {
  return request<any>(`/msg/updateBatch`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 删除消息DELETE /msg/${param0} */
export async function msgControllerDeleteDraft(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/msg/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看消息详情 GET /msg/detail/${param0} */
export async function msgControllerGetMsgById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { id: number },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/msg/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取消息列表 GET /msg/list */
export async function msgControllerGetMsgList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MsgControllerGetMsgListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/msg/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 获取不分页的消息列表 GET /msg/sellist */
export async function msgControllerGetSelMsgList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: { type: string },
  options?: { [key: string]: any },
) {
  return request<any>('/msg/selist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取各类消息总数 */
export async function getMsgCount() {
  return request<any>('/msg/count', {
    method: 'GET',
  });
}

/** 新增消息POST /msg/new */
export async function msgControllerCreateMsg(
  body: API.MsgNew,
  options?: { [key: string]: any },
) {
  return request<any>('/msg/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
