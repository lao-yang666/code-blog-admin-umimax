/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 10:05:08
 */
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, Space, Typography } from 'antd'
import { FC } from 'react';

import BlogLogs from './components/BlogLogs' // 博客日志
import GitCommitLog from './components/GitCommitLog' // Git 更新日志
import HotPost from './components/MyPost' // 主要技
import Logs from './components/Logs' // 主要技术栈
import PersonTabs from './components/PersonTabs'
import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片
import TechnologyStack from './components/TechnologyStack' // 主要技术栈
const { Paragraph, Text } = Typography;

const Workbench: FC = () => {
  // 全局状态
  const { initialState } = useModel('@@initialState');

  // 渲染副标题
  const renderSecondary = (content: string, rows = 1) => {
    return (
      <Paragraph ellipsis={{
        rows,
        tooltip: {
          title: content,
          color: initialState?.Settings?.colorPrimary || 'blue',
        },
      }} style={{ marginBottom: 0 }}>
        <Text type="secondary">{content}</Text>
      </Paragraph>
    )
  }
  return (
    <PageContainer content={<RenderContent />} title={false}>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 16 }}>
        <PersonTabs></PersonTabs>
      </Space>
    </PageContainer>
  )
}
export default Workbench