import './index.css'
import React, { useContext } from 'react'
import { CommentAdd, CommentList, ChangeTab } from './components'
import useComment from '@/hooks/useComment'
import { Spin } from 'antd'
import { CommentContext, PostContext } from "@/contexts/postContext";
const Comment: React.FC = () => {
  const { commentList, commentMap, loading, tab, onTabChange, addComment, deleteComment } = useComment()
  const {  getPostDetail } = useContext(PostContext)
  const onAddComment = async (value: string) => {
    addComment(value);
    getPostDetail()
  }

  return (
    <CommentContext.Provider value={
      {
        commentList,
        commentMap,
        addComment:onAddComment,
        deleteComment,
      }
    }>
      <div className="comment-box">
        <div className="comment-container">
          {/* 添加评论 */}
          <CommentAdd addComment={onAddComment} />
          <div className="tabs-order">
            <ChangeTab tab={tab} changeTab={onTabChange} />
          </div>
          {/* 评论列表 */}
          <div className="comment-list">
            {loading ? <Spin></Spin> :
              <CommentList level={1} commentList={commentList}/>}
          </div>
        </div>
      </div >
    </CommentContext.Provider>

  )
}

export default Comment
