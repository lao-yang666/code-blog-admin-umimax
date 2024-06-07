/*
 * @Description: 全局通用按钮
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-23 13:47:16
 * @LastEditors: laoyang<baiwumm.com>
 * @LastEditTime: 2024-02-02 10:37:46
 */
import { EllipsisOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { KeepAliveContext, useIntl } from '@umijs/max'
import { FloatButton } from 'antd'
import { FC, useContext, useState } from 'react'

import { INTERNATION } from '@/utils/enums'

const ActionButtons: FC = () => {
  const { formatMessage } = useIntl();
  // 刷新当前组件
  const { refreshTab } = useContext(KeepAliveContext);
  // 受控展开，需配合 trigger 一起使用
  const [open, setOpen] = useState<boolean>(false)
  return (
    <FloatButton.Group
      open={open}
      icon={<EllipsisOutlined />}
      trigger="click"
      onOpenChange={(open) => setOpen(open)}>
      {/* Github issues*/}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        onClick={() => window.open('//github.com/lao-yang666/laoyang-admin/issues')}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.github-issues` })}
      />
      {/* 项目文档 */}
      <FloatButton
        onClick={() => window.open('//http://101.43.20.171:9090/')}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.document` })}
      />
      {/* 刷新页面 */}
      <FloatButton
        icon={<SyncOutlined />}
        onClick={() => refreshTab(location.pathname)}
        tooltip={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ActionButtons.refresh` })} />
      {/* 回到顶部 */}
      <FloatButton.BackTop visibilityHeight={100} />
    </FloatButton.Group>
  )
}
export default ActionButtons