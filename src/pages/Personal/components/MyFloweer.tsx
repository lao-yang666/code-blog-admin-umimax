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
import { randomTagColor } from '@/utils'
const { userControllerGetUserList: queryUserList } = services.yonghuguanli;
interface MyFloweerProps {
  title: string,
  type: string,
}
const MyFloweer: FC<MyFloweerProps> = ({ title, type }) => {

  const [liked, setLiked] = useState<boolean>(false);
  const { data: userList, loading } = useRequest(
    async (params) => get(await queryUserList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 10, type }],
  })

  // const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  //   <Space>
  //     {React.createElement(icon)}
  //     {text}
  //   </Space>
  // );
  // const renderActions = (record: API.User) => {
  //   const actions = [
  //     <IconText icon={EyeOutlined} text={String(record.viewNum)} key="EyeOutlined" />,
  //     <Space key="LikeTwoTone" >
  //       <LikeTwoTone twoToneColor={liked ? '#222' : ''} onClick={() => { like(record.id) }} />
  //       {record.likeNum}
  //     </Space>
  //     ,
  //     <IconText icon={MessageOutlined} text={String(record.Comment?.length)} key="MessageOutlined" />,
  //   ]
  //   if(type !== '0'){
  //     actions.unshift(
  //       <span key="AuthorOutlined">{record.author.nickName}</span>,
  //     )
  //   }
  //   return actions
  // }
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
        dataSource={userList}
        renderItem={(record: API.User) => (
          <List.Item
            style={{ padding: '10px 0' }}>
            <List.Item.Meta
              title={<a onClick={() => history.push(`/User/UserDetail?id=${record.id}`)}>{record.nickName}</a>}
              description={record.gender}

            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default MyFloweer