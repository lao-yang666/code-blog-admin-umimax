import React, { useEffect, useState } from 'react';
import { MessageTwoTone, ShareAltOutlined, StarTwoTone, LikeTwoTone } from '@ant-design/icons';
import { FloatButton } from 'antd';
import {
  postControllerCreateCollection, postControllerLikeStatus, postControllerCreateComment,
  postControllerDeleteLike, postControllerDeleteCollect,
  postControllerCreateLike, postControllerGetCollectStatus
} from '@/services/blog/wenzhangguanli';
// 点赞、收藏、分享、评论
const ToolButton: React.FC<{ id: string | null }> = (props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [colleced, setColleced] = useState<boolean>(false);

  const getPostLikeStatus = async () => {
    try {
      if (props.id) {
        const res = await postControllerLikeStatus(Number(props.id));
        setLiked(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPostCollectStatus = async () => {
    try {
      if (props.id) {
        const res = await postControllerGetCollectStatus(Number(props.id));
        setColleced(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const like = async () => {
    try {
      if (props.id) {
        if (liked) {
          await postControllerDeleteLike(Number(props.id));
        } else {
          await postControllerCreateLike(Number(props.id));
        }
        getPostLikeStatus()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const star = async () => {
    try {
      if (props.id) {
        if (colleced) {
          await postControllerDeleteCollect(Number(props.id));
        } else {
          await postControllerCreateCollection(Number(props.id));
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
    console.log('click')
  }

  useEffect(() => {
    getPostLikeStatus();
    getPostCollectStatus();
  }, [props.id])

  return (
    <>
      <FloatButton.Group shape="circle" style={{ left: 204, top: '30%' }}>
        <FloatButton icon={<LikeTwoTone twoToneColor={liked ? '#222' : ''} />} onClick={like} />
        <FloatButton icon={<StarTwoTone twoToneColor={colleced ? '#eb2f0' : '#fa8c16'} />} onClick={star} />
        <FloatButton icon={<MessageTwoTone twoToneColor="#52c41a" />} onClick={comment} />
        <FloatButton icon={<ShareAltOutlined />} onClick={share} />
      </FloatButton.Group>
    </>
  );
}

export default ToolButton;