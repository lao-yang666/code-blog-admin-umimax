/*
 * @Description: 更多作品
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { useRequest } from 'ahooks'
import { Avatar, Button, Card, Flex, Space, Statistic, Tag, Typography } from 'antd'
import { get } from 'lodash-es'
import { FC, useEffect, useState } from 'react'
import { randomTagColor } from '@/utils'
import {
  userControllerGetStatistic, userControllerfollowingUser,
  userControllerChcekfollowing,
  userControllerDeletefollowing
} from '@/services/blog/yonghuguanli';
import { useModel } from '@umijs/max'
import ToolButton from './ToolButton'
const { Title, Text } = Typography;
const AuthorInfo: FC<{ post: API.Post }> = (props) => {
  const { post } = props
  const [isFollowing, setIsFollowing] = useState(false)
  const { initialState } = useModel('@@initialState');
  const { data: statistic, refresh } = useRequest(
    async () => {
      if (post.author?.id) return get(await userControllerGetStatistic(post.author?.id), 'data', [])
      return {}
    }
  )

  const checkFollow = async () => {
    refresh()
    if (post.author?.id) setIsFollowing(get(await userControllerChcekfollowing(post.author?.id), 'data', []))
  }

  const follow = async (type: number) => {
    try {
      if (type === 1) {
        await userControllerfollowingUser(post.author?.id)
      } else {
        await userControllerDeletefollowing(post.author?.id)
      }
      checkFollow()
    } catch (error) {
      console.log(error, 'error');
    }
  }

  const onActionAfter = () => {
    refresh()
  }

  useEffect(() => {
    checkFollow()
  }, [post.author?.id])
  return (
    <>
      {/* <ToolButton change={refresh}></ToolButton> */}
      <Card>
        <Flex style={{ marginBottom: 10 }} vertical={false} align='center'>
          <Avatar src={post.author?.avatar_url} size={80} />
          <Space direction='vertical' style={{ marginLeft: 20 }}>
            <Title level={5}>
              <Text style={{ paddingRight: 10 }}>{post.author?.nickName}</Text>
              {post?.author?.userTag?.map((item: API.Tag) => {
                return (
                  <Tag key={item.id} color={randomTagColor()}>
                    {item.name}
                  </Tag>
                )
              })}
            </Title>
            <Text>一位非常棒的博主自信乐观</Text>
          </Space>
        </Flex>
        <Flex align='center' style={{ width: '100%' }} justify='space-between'>
          <Statistic title="文章" value={statistic?.postNum} />
          <Statistic title="阅读" value={statistic?.viewNum} />
          <Statistic title="获赞" value={statistic?.likeNum} />
          <Statistic title="收藏" value={statistic?.collectNum} />
          <Statistic title="粉丝" value={statistic?.fensNum} />
        </Flex>
        {initialState.userInfo.id !== post.author?.id && <Flex justify='space-between' style={{ marginTop: 10 }}>
          {isFollowing ?
            <Button type='primary' danger style={{ width: '48%' }} size='large' onClick={() => follow(0)}>取消关注</Button>
            :
            <Button type='primary' style={{ width: '48%' }} size='large' onClick={() => follow(1)}>关注</Button>}
          <Button style={{ width: '48%' }} size='large'>私信</Button>
        </Flex>}
      </Card>
    </>
  )
}
export default AuthorInfo