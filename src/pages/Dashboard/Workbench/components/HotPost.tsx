/*
 * @Description: 最新文章
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { history } from '@umijs/max';
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
          <List.Item style={{ padding: '10px 0' }} actions={record?.PostTag?.map((item) => (
            <Tag color={randomTagColor()} key={item.tag_id}>{
              item.name
            }</Tag>)
          )}>
            <List.Item.Meta
              title={<a onClick={() => history.push(`/Post/PostDetail?id=${record.id}`)}>{record.title}</a>}
              description={record.author?.nickName}
            />
          </List.Item>
        )
        }
      />
    </Card >
  )
}
export default HotPost