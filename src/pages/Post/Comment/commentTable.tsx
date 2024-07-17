import { ProColumns } from '@ant-design/pro-components';
import { Switch, Table, TableColumnsType, message } from 'antd';
import React, { PropsWithChildren } from 'react';
import AccessButton from '@/components/AccessButton';
import services from '@/services/blog';
import { useModel } from '@umijs/max';
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
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => record?.author?.nickName,
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '内容为必填项',
          },
        ],
      },
    },
    {
      title: '文章',
      dataIndex: 'title',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '标题为必填项',
          },
        ],
      },
    },
    {
      title: '点赞次数',
      dataIndex: 'pinned',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => record?.likeNum,
    },
    {
      title: '回复次数',
      dataIndex: 'pinned',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '开启',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.status === 1}
          onChange={(checked) => {
            // handleSwitch(record.id, checked ? 1 : 0)
          }} />
      ),
    },
    {
      title: '评论时间',
      dataIndex: 'created_time',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
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
        columns={columns}
        dataSource={commentList}
      />
    </>
  );
};

export default CommentTable;