import MdViewer from '@/components/Md-editor/Md-viewer';
import services from '@/services/blog';
const { postControllerGetPostById: getPostDetail } =
  services.wenzhangguanli;
import { useSearchParams } from '@umijs/max';
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
    <MdViewer value={mdValue}></MdViewer>
  )
}
export default PostAdd;