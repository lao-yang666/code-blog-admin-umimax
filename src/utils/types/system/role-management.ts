import type { PaginationParams, SearchTimes } from '@/utils/types'
/**
 * @description: FormTemplate Props
 * @Author: laoyang
 */
export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};

/**
 * @description: 头部搜索表单 Params
 * @author: laoyang
 */
export type SearchParams = PaginationParams &
  SearchTimes & Partial<Pick<API.ROLEMANAGEMENT, 'role_name' | 'role_code' | 'status'>>

/**
 * @description: 设置角色状态 Params
 * @author: laoyang
 */
export type RoleStatusParams = Pick<API.ROLEMANAGEMENT, 'role_id' | 'status'>
