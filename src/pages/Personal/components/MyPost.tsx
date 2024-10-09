/*
 * @Description: 最新文章
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { EyeOutlined, LikeOutlined, LikeTwoTone, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Avatar, Card, Flex, List, Space, Tag } from 'antd'
import { get } from 'lodash-es'
import { FC, useState } from 'react'
import React from 'react';

import services from '@/services/blog'
import { postControllerCreateLike, postControllerDeleteLike } from '@/services/blog/wenzhangguanli';
import { randomTagColor } from '@/utils'
const { postControllerGetMyPublishedPosts: queryPostList } = services.wenzhangguanli;
interface MyPostProps {
  title: string,
  type: string,
}
const MyPost: FC<MyPostProps> = ({ title, type }) => {

  const [liked, setLiked] = useState<boolean>(false);
  const { data: postList, loading } = useRequest(
    async (params) => get(await queryPostList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 10, type }],
  })

  const like = async (id: any) => {
    try {
      if (liked) {
        await postControllerDeleteLike(Number(id));
      } else {
        await postControllerCreateLike(Number(id));
      }
      queryPostList({ current: 1, pageSize: 10 })
    } catch (error) {
      console.log(error);
    }
  }
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const renderActions = (record: API.Post) => {
    const actions = [
      <IconText icon={EyeOutlined} text={String(record.viewNum)} key="EyeOutlined" />,
      <Space key="LikeTwoTone" >
        <LikeTwoTone twoToneColor={liked ? '#222' : ''} onClick={() => { like(record.id) }} />
        {record.likeNum}
      </Space>
      ,
      <IconText icon={MessageOutlined} text={String(record.Comment?.length)} key="MessageOutlined" />,
    ]
    if(type !== '0'){
      actions.unshift(
        <span key="AuthorOutlined">{record.author.nickName}</span>,
      )
    }
    return actions
  }
  return (
    <Card title={title}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        loading={loading}
        dataSource={postList}
        renderItem={(record: API.Post) => (
          <List.Item
            actions={renderActions(record)}
            style={{ padding: '10px 0' }}>
            <List.Item.Meta
              title={<a onClick={() => history.push(`/Post/PostDetail?id=${record.id}`)}>{record.title}</a>}
              description={record.content.replace(/[^\u4e00-\u9fff]+/g, '').substring(0, 100)}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default MyPost