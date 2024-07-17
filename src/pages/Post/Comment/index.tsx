import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Drawer, Switch, Tag, message, Button, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
import AccessButton from '@/components/AccessButton';
import DiyForm from '@/components/DiyForm';
import services from '@/services/blog';
import { randomTagColor } from '@/utils';
import PostList from './postList'
import CommentTable from './commentTable'
import { useRequest } from 'ahooks';
const { roleControllerGetSelRoleList: getRoleOption } = services.jiaoseguanli;
const { commentControllerGetSelCommentList: getCommentList,
  commentControllerDeleteComment: deleteComment } = services.comment;
const { postControllerGetSelPosts: queryPostList } = services.wenzhangguanli;

const getCommentData = (list: API.Comment[]): API.Comment[] => {
  let descendants: API.Comment[] = [];
  // 递归函数，用于搜索给定节点的所有后代  
  const searchDescendants = (nodeId: number | string) => {
    for (const node of list) {
      // 如果当前节点的父节点ID等于给定的节点ID，那么它就是后代节点  
      if (node.parentId === nodeId) {
        // 将当前节点添加到后代数组中  
        descendants.push(node);
        // 递归搜索当前节点的所有后代  
        searchDescendants(node.id);
      }
    }
  }

  const commentList = list.filter((item: API.Comment) => !item.parentId).map((comment: API.Comment) => {
    searchDescendants(comment.id);
    comment.replies = descendants
    descendants = []
    return comment
  })

  // 返回后代节点数组  
  return commentList;
}


const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(-1);
  const [params, setParams] = useState({});
  const { initialState } = useModel('@@initialState');

  const { data, run: queryCommentList } = useRequest<{ commentList: API.Comment[], commentMap: API.CommentMap }, any>(
    async () => {
      const list = get(await getCommentList(Number(postId), 'created_time'), 'data', [])
      const map: API.CommentMap = new Map(list.map((item: API.Comment) => [item.id, { ...item, children: [] }]));
      return {
        commentList: getCommentData(list),
        commentMap: map,
      }
    }, { manual: true })

  const { data: postList, loading: postLoading } = useRequest(
    async () => get(await queryPostList(), 'data', {}), {
    onSuccess: (post) => {
      setPostId(post?.[0]?.id)
    }
  })
console.log(data,'data')
  useEffect(() => {
    queryCommentList()
  }, [postId])

  return (
    <PageContainer
      header={{
        title: '评论管理',
      }}
    >
      <Row>
        <Col span={5}>
          <PostList
            postList={postList}
            loading={postLoading}
            onPostClick={(id: number) => { setPostId(id)}} />
        </Col>
        <Col span={18} style={{paddingLeft:16}}>
          <CommentTable
            tableData={data as { commentList: API.Comment[], commentMap: API.CommentMap }} />
        </Col>
      </Row>
    </PageContainer >
  );
};

export default TableList;
