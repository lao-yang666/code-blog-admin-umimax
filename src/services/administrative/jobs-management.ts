/*
 * @Description: 智能行政-岗位管理-API
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-09-08 18:10:19
 * @LastEditors: laoyang
 * @LastEditTime: 2023-09-07 10:12:37
 */
import { ROUTES } from '@/utils/enums'
import type { CreateJobsParams, SearchParams } from '@/utils/types/administrative/jobs-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.JOBSMANAGEMENT

/**
 * @description: 获取岗位管理列表
 * @param {SearchParams} options
 * @author: laoyang
 */
export const getJobsList = (options?: SearchParams) => httpRequest.get<API.JOBSMANAGEMENT[]>(`${baseURL}`, options);

/**
 * @description: 创建岗位数据
 * @param {CreateJobsParams} options
 * @author: laoyang
 */
export const createJobs = (options: CreateJobsParams) => httpRequest.post<API.JOBSMANAGEMENT>(`${baseURL}`, options);

/**
 * @description: 更新岗位数据
 * @param {API.JOBSMANAGEMENT} options
 * @author: laoyang
 */

export const updateJobs = ({ jobs_id, ...options }: API.JOBSMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${jobs_id}`, options);

/**
 * @description: 删除岗位数据
 * @param {string} jobs_id
 * @author: laoyang
 */
export const delJobs = (jobs_id: string) => httpRequest.delete<number>(`${baseURL}/${jobs_id}`);
