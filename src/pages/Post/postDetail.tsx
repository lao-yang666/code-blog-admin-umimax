import MdViewer from '@/components/Md-editor/Md-viewer';
import MoreArticle from './components/MoreArticles';
import RelatedRecommend from './components/RelatedRecommend';
import AuthorInfo from './components/AuthorInfo';
import services from '@/services/blog';
import './index.less';
const { postControllerGetPostById: getPostDetail } =
  services.wenzhangguanli;
import { useSearchParams } from '@umijs/max';
import { Col, Row, Skeleton } from 'antd';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { get } from 'lodash';
import { PostContext } from "@/contexts/postContext";
const PostAdd: React.FC<unknown> = () => {
  const [mdValue, handleChangeValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data, refresh } = useRequest(
    async () => {
      const data = get(await getPostDetail({ id }), 'data', [])
      handleChangeValue(data?.content)
      return data
    }
  )
  return (
    <PostContext.Provider value={
      {
        authorId: data?.author.id,
        post: data,
        getPostDetail: refresh,
      }
    }>
      <Row className='markdown-main'>
        <Col span={15} className='markdown-container' offset={3}>
          <MdViewer value={mdValue} style={{ width: '1200px' }} ></MdViewer>
        </Col>
        <Col span={6} className='markdown-person'>
          {data?.author ? <AuthorInfo post={data}></AuthorInfo> : <Skeleton />}
          {data?.author ? <MoreArticle authorId={data?.author.id} postId={Number(id)}></MoreArticle> : <Skeleton />}
          <RelatedRecommend></RelatedRecommend>
        </Col>
      </Row>
    </PostContext.Provider>

  )
}
export default PostAdd;