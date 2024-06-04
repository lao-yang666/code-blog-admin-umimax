/*
 * @Description: 最新公告
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { useRequest } from 'ahooks'
import { Avatar, Card, List, Tag } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import services from '@/services/blog'
import { randomTagColor } from '@/utils'
const { postControllerGetPublishedPosts: queryPostList } = services.wenzhangguanli;
const HotPost: FC = () => {


  const { data: postList, loading } = useRequest(
    async (params) => get(await queryPostList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 5 }],
  })
  return (
    <Card title='最新文章'>
      <List
        itemLayout="horizontal"
        loading={loading}
        dataSource={postList}
        renderItem={(record: API.Post) => (
          <List.Item style={{ padding: '10px 0' }} actions={[<Tag color={randomTagColor()} key={record.id}>{

          }</Tag>]}>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={<a onClick={() => window.open(record.link)}>{record.title}</a>}
              description={record.author?.nickName}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default HotPost