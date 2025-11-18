import React, { useContext, useEffect, useState } from 'react';
import Comment from '@/components/Comment'
import { MessageTwoTone, ShareAltOutlined, StarTwoTone, LikeTwoTone, RollbackOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, FloatButton, Input, Space } from 'antd';
import {
  postControllerCreateCollection, postControllerLikeStatus,
  postControllerDeleteLike, postControllerDeleteCollect,
  postControllerCreateLike, postControllerGetCollectStatus
} from '@/services/blog/wenzhangguanli';
import { PostContext } from "@/contexts/postContext";

// 点赞、收藏、分享、评论
const ToolButton: React.FC<{ change: Function, post: API.Post }> = (props) => {
  const { change, post } = props
  // const { post, getPostDetail } = useContext(PostContext)
  const [liked, setLiked] = useState<boolean>(false);
  const [colleced, setColleced] = useState<boolean>(false);
  const [showComment, changeShowComment] = useState<boolean>(false);
  const getPostLikeStatus = async () => {
    try {
      if (post.id) {
        const res = await postControllerLikeStatus(Number(post.id));
        setLiked(res.data)
        change()
       // getPostDetail()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPostCollectStatus = async () => {
    try {
      if (post.id) {
        const res = await postControllerGetCollectStatus(Number(post.id));
        setColleced(res.data)
        change()
        // getPostDetail()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const like = async () => {
    try {
      if (post.id) {
        if (liked) {
          await postControllerDeleteLike(Number(post.id));
        } else {
          await postControllerCreateLike(Number(post.id));
        }
        getPostLikeStatus()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const star = async () => {
    try {
      if (post.id) {
        if (colleced) {
          await postControllerDeleteCollect(Number(post.id));
        } else {
          await postControllerCreateCollection(Number(post.id));
        }
        getPostCollectStatus()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const share = () => {

  }

  const comment = () => {
    changeShowComment(true)
  }

  useEffect(() => {
    getPostLikeStatus();
    getPostCollectStatus();
  }, [post.id])

  return (
    <>
      <FloatButton.Group shape="circle" style={{ left: '20vw', top: '300px', position: 'fixed', width: 0, height: 0 }}>
        <FloatButton icon={<LikeTwoTone twoToneColor={liked ? '#222' : ''} />} onClick={like} badge={{ count: post.likeNum }} />
        <FloatButton icon={<StarTwoTone twoToneColor={colleced ? '#eb2f0' : '#fa8c16'} />} onClick={star} badge={{ count: post.collectNum }} />
        <FloatButton icon={<MessageTwoTone twoToneColor="#52c41a" />} onClick={comment} badge={{ count: post.Comment.length }} />
        <FloatButton icon={<ShareAltOutlined />} onClick={share} />
        <FloatButton icon={<RollbackOutlined />} onClick={() => history.go(-1)} />
      </FloatButton.Group>
      <Drawer
        width={600}
        open={showComment}
        onClose={() => {
          changeShowComment(false)
        }}
        closeIcon={
          <CloseCircleOutlined
            style={{
              fontSize: 20,
            }}
          />
        }
        title="评论"
      >
        <Comment></Comment>
      </Drawer>
    </>
  );
}

export default ToolButton;