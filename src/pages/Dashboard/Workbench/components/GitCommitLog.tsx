/*
 * @Description: Git 更新日志
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:54:01
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 10:00:17
 */
import { useRequest } from 'ahooks'
import { Card, Space, Timeline, Typography } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react'
import styled from 'styled-components'
import { isSuccess } from '@/utils'
const TimeLineBox = styled(Timeline)`
  && .ant-timeline-item {
    padding-bottom: 13px !important;
  }
`;
const { Text } = Typography;

const GitCommitLog: FC = () => {
  // dayjs 相对时间
  dayjs.extend(relativeTime);
  /**
 * @description: 请求项目 commit 日志
 * @author: laoyang
 */
  const { data: commitList } = useRequest(
    async () => {
      const response =
        await fetch('https://api.github.com/repos/lao-yang666/code-blog-admin-umi/commits?page=1&per_page=5')
      if (isSuccess(response.status)) {
        const result = await response.json()
        return result
      }
      return []
    })
  return (
    <Card title='更新日志'>
      <TimeLineBox style={{ marginTop: '10px' }}
        items={
          commitList?.map((item) => {
            return {
              children: (
                <Space direction="vertical" size={0} style={{ display: 'flex' }}>
                  <a onClick={() => window.open(item.html_url)}>
                    {item.commit.message}
                  </a>
                  <Text type="secondary">{dayjs(item.commit.author.date).fromNow()}</Text>
                </Space>
              ),
            }
          })
        }
      />
    </Card>
  )
}
export default GitCommitLog