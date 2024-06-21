import MdViewer from '@/components/Md-editor/Md-viewer';
import ToolButton from './components/ToolButton';
import MoreArticle from './components/MoreArticles';
import RelatedRecommend from './components/RelatedRecommend';
import AuthorInfo from './components/AuthorInfo';
import services from '@/services/blog';
import './index.less';
const { postControllerGetPostById: getPostDetail } =
  services.wenzhangguanli;
import { useSearchParams } from '@umijs/max';
import { Col, Row } from 'antd';
import { useState } from 'react';

const PostAdd: React.FC<unknown> = () => {
  const [mdValue, handleChangeValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  if (id) {
    getPostDetail({ id }).then((res) => {
      handleChangeValue(res.data?.content);
    })
  }
  return (
    <Row className='markdown-main'>
      <Col span={3}>
        <ToolButton id={id}></ToolButton>
      </Col>
      <Col span={15} className='markdown-container'>
        <MdViewer value={mdValue} style={{ width: '1200px' }} ></MdViewer>
      </Col>
      <Col span={6} className='markdown-person'>
        <AuthorInfo></AuthorInfo>
        <MoreArticle></MoreArticle>
        <RelatedRecommend></RelatedRecommend>
      </Col>
    </Row>
  )
}
export default PostAdd;