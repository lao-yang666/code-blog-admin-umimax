/*
 * @Description: 更多作品
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { history } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Avatar, Button, Card, List, Row, Space, Statistic, Tag } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import services from '@/services/blog'
import { randomTagColor } from '@/utils'
const { postControllerGetPublishedPosts: queryPostList } = services.wenzhangguanli;
const AuthorInfo: FC = () => {


  const { data: postList, loading } = useRequest(
    async (params) => get(await queryPostList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 5 }],
  })
  return (
    <Card>
      <Space size="large">
        <Statistic title="文章" value={9} />
        <Statistic title="阅读" value={99} />
        <Statistic title="获赞" value={986} />
        <Statistic title="收藏" value={6} />
        <Statistic title="粉丝" value={126} />
      </Space>
      <Row>
        <Button type='primary'>关注</Button>
        <Button>私信</Button>
      </Row>
    </Card>
  )
}
export default AuthorInfo