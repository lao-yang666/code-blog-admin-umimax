import { ProColumns } from '@ant-design/pro-components';
import { Switch, Table, TableColumnsType, message } from 'antd';
import React, { PropsWithChildren } from 'react';
import AccessButton from '@/components/AccessButton';
import services from '@/services/blog';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs'
const { roleControllerGetSelRoleList: getRoleOption } = services.jiaoseguanli;
const { commentControllerGetCommentList: queryCommentList,
  commentControllerDeleteComment: deleteComment } = services.comment;

interface MenuTableProps {
  tableData: { commentList: API.Comment[], commentMap: API.CommentMap }
}

/**
 *  删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteComment({ id });
    hide();
    message.success('删除成功，即将刷新');
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
  }
};

const CommentTable: React.FC<PropsWithChildren<MenuTableProps>> = (props) => {
  const { tableData: { commentList = [], commentMap } = {} } = props
  const { initialState } = useModel('@@initialState');

  const getRoleList = async () => {
    const { data } = await getRoleOption();
    return (data ?? []).filter((item: API.Role) => (
      item.sort >= (initialState?.msgInfo?.role?.sort as number)
    )).map((item: API.Role) => ({
      label: item.role_name,
      value: item.id,
    }))
  };

  console.log(commentList,'commentListcommentList')
  const columns: ProColumns<API.Comment>[] = [
    {
      title: '作者',
      dataIndex: 'userId',
      request: getRoleList,
      render: (_, record) => record?.author?.nickName,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      valueType: 'text',
    },
    {
      title: '点赞次数',
      dataIndex: 'likeNum',
      valueType: 'text',
    },
    {
      title: '回复次数',
      dataIndex: 'pinned',

      valueType: 'text',
      render: (_, record) => record?.replies?.length,
    },
    {
      title: '状态',
      dataIndex: 'isDeleted',
      valueType: 'select',
      render: (_, record) => (
        <Switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          defaultChecked={record.status == 1}
          onChange={(checked) => {
            // handleSwitch(record.id, checked ? 1 : 0)
          }} />
      ),
    },
    {
      title: '评论时间',
      dataIndex: 'created_time',
      valueType: 'text',
      render:(_, record)=> dayjs(record.created_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <AccessButton
            permission_key='system-msg-delete'
            type='link'
            level={record.role_level}
            onClick={async () => {
              await handleDel(String(record.id))
            }}>
            删除
          </AccessButton>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey="id"
        bordered
        childrenColumnName='replies'
        columns={columns}
        dataSource={commentList}
      />
    </>
  );
};

export default CommentTable;