
import { useRequest } from 'ahooks';
import {
  commentControllerCreateComment as newComment,
  commentControllerGetSelCommentList as getCommentList,
  modifyCommentStatus as updateComment,
} from '@/services/blog/comment'
import { get } from 'lodash';
import { message } from 'antd';
import { useSearchParams } from '@umijs/max';
import { useEffect, useState } from 'react';

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

export default function useComment(postId?:string) {
  const [tab, seTab] = useState<'likeNum' | 'created_time'>('likeNum')
  const [searchParams] = useSearchParams();
  const id = postId ?? searchParams.get('id') ?? '';
  const { data, refresh, loading } = useRequest<{ commentList: API.Comment[], commentMap: API.CommentMap }, any>(
    async () => {
      const list = get(await getCommentList(Number(id), tab), 'data', [])
      const map: API.CommentMap = new Map(list.map((item: API.Comment) => [item.id, { ...item, children: [] }]));
      return {
        commentList: getCommentData(list),
        commentMap: map,
      }
    })
  const onTabChange = (key: string) => {
    seTab(key as 'likeNum' | 'created_time')
  }

  const addComment = async (comment: string, commentId?: string | undefined) => {
    try {
      await newComment({
        parentId: commentId,
        postId: Number(id),
        content: comment
      })
      refresh()
      message.success(`发表评论成功`);
    } catch (error) {
      console.log(error);
      message.error(`发表评论失败`);
    }
  }

  const deleteComment = async (id: string) => {
    try {
      await updateComment(id, 0)
      refresh()
      message.success(`撤回评论成功`);
    } catch (error) {
      console.log(error);
      message.error(`撤回评论失败`);
    }
  }

  useEffect(() => {
    refresh()
  }, [tab])
  console.log(data, '======commentList=========');

  return {
    commentList: data?.commentList as API.Comment[],
    commentMap: data?.commentMap as API.CommentMap,
    loading,
    postId: id,
    tab,
    onTabChange,
    addComment,
    deleteComment
  };
};