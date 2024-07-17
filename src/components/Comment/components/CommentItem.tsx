import { DeleteTwoTone, LikeTwoTone, MessageTwoTone } from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { Avatar, Popconfirm, Space, Tag } from "antd";
import CommentAdd from './CommentAdd';
import React, { useContext, useEffect, useState } from "react";
import { commentControllerCreateLike, commentControllerDeleteLike, commentControllerGetCollectStatus } from "@/services/blog/comment";
import CommentList from "./CommentList";
import { PostContext, CommentContext } from "@/contexts/postContext";
import dayjs from "dayjs";

const CommentItem: React.FC<{ comment: API.Comment, level: number }> = (props) => {
  const { comment, level } = props
  const { addComment, deleteComment, commentMap } = useContext(CommentContext)
  const { authorId, getPostDetail } = useContext(PostContext)
  const [commentInfo, setCommentInfo] = useState({ liked: false, likeNum: 0 })
  const [commented, setCommented] = useState(false)
  const { initialState } = useModel('@@initialState');
  const handleDeleteComment = () => {
    deleteComment(comment.id)
  }

  const onComment = () => {
    setCommented(!commented)
  }

  const getCommentLikeStatus = async () => {
    try {
      if (comment.id) {
        const res = await commentControllerGetCollectStatus(comment.id);
        setCommentInfo(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 点赞
  const onLike = async () => {
    try {
      if (comment.id) {
        if (commentInfo.liked) {
          await commentControllerDeleteLike(comment.id)
        } else {
          await commentControllerCreateLike(comment.id)
        }
        getCommentLikeStatus()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onAddComment = async (value: string) => {
    addComment(value, comment.id);
    getPostDetail()
  }

  useEffect(() => {
    const liked = comment.comment_like.find(item => item.userId === initialState.userInfo.id)
    setCommentInfo({
      liked: !!liked,
      likeNum: comment.comment_like.length
    })
  }, [])

  return (
    <div className="list-item">
      <div className="user-face">
        <Avatar size={32}></Avatar>
      </div>
      <div className="comment" >
        <div className="user">
          {comment.author.nickName}
          {comment.author.id === authorId && <Tag color="blue">作者</Tag>}
          {level == 2 && comment.parentId && ` 回复 ${commentMap.get(comment.parentId as string)?.author.nickName}`}</div>
        <p className="text">{comment.content}</p>
        <div className="info">
          <span className="time">{dayjs(comment.created_time).format('YYYY-MM-DD HH:mm:ss')}</span>
          <Space className="like liked">
            <LikeTwoTone onClick={onLike} twoToneColor={commentInfo.liked ? '#222' : ''}></LikeTwoTone>
            {commentInfo.likeNum ? <span>{commentInfo.likeNum}</span> : <span>点赞</span>}
          </Space>
          <Space className="hate hated">
            <MessageTwoTone onClick={onComment} twoToneColor={commented ? '#52c41a' : ''}></MessageTwoTone>
            {commented ? <span>取消回复</span> : <span>{level == 1 ? '评论' : '回复'}</span>}
          </Space>
          {(comment.author.id === initialState.userInfo.id || comment.author.id === authorId) &&
            <Space>
              <DeleteTwoTone />
              <Popconfirm
                title="撤回评论"
                description="你确定撤回该评论吗"
                okText="确认"
                cancelText="取消"
                onConfirm={handleDeleteComment}
              >
                <span>撤回评论</span>
              </Popconfirm>

            </Space>
          }
          {level == 1 && comment.replies?.length > 0 && <CommentList commentList={comment.replies} level={2} />}
          {commented && <CommentAdd addComment={onAddComment}></CommentAdd>}
        </div>
      </div>
    </div>
  )

}

export default React.memo(CommentItem)
