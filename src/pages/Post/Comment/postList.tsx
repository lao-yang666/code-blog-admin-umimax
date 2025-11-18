import { Space, Tag } from 'antd';
import { ProList } from '@ant-design/pro-components';
import { isEqual } from 'lodash-es';
import React, { PropsWithChildren } from 'react';
const PostList: React.FC<{ onPostClick: Function, postList: API.Post[], loading: boolean }> = (props) => {
  const { onPostClick, postList, loading } = props
  return (
    <ProList<API.Post>
      rowKey="id"
      headerTitle="文章列表"
      dataSource={postList}
      showActions="hover"
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      loading={loading}
      onItem={(record: any) => {
        return {
          onClick: () => {
            onPostClick(record.id);
          },
        };
      }}
      metas={{
        title: {
          dataIndex: 'title',
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
        },
        description: {
          dataIndex: 'desc',
        },
        // actions: {
        //   render: (text, row, index, action) => [
        //     <a
        //       onClick={() => {
        //         action?.startEditable(row.id);


        //       }}
        //       key="link"
        //     >
        //       编辑
        //     </a>,
        //   ],
        // },
      }}
    />
  );
}

const areEqual = (prevProps: { onPostClick: Function, postList: API.Post[], loading: boolean }, nextProps: { onPostClick: Function, postList: API.Post[], loading: boolean }) => {
  return isEqual(prevProps.postList, nextProps.postList)
};

export default React.memo(PostList, areEqual)