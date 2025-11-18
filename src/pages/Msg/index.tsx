import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Drawer, Switch, Tag, message } from 'antd';
import React, { useRef, useState } from 'react';

import AccessButton from '@/components/AccessButton';
import DiyForm from '@/components/DiyForm';
import services from '@/services/blog';
import { randomTagColor } from '@/utils';
const { roleControllerGetSelRoleList: getRoleOption } = services.jiaoseguanli;
const { msgControllerCreateMsg: addMsg, msgControllerGetMsgList: queryMsgList,
  msgControllerDeleteDraft: deleteMsg, msgControllerUpdateMsg: modifyMsg, modifyMsgStatus } =
  services.msg;

const msgMap = {
  'gd': { text: '公告', status: '公告' },
  'xx': { text: '消息', status: '消息' },
  'hd': { text: '活动', status: '活动' },
  'tz': { text: '通知', status: '通知' },
}
/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.MsgNew) => {
  const hide = message.loading('正在添加');
  try {
    await addMsg({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await modifyMsg(
      { id: fields.id },
      {
        id: fields.id,
        title: fields.title,
        content: fields.content,
        type: fields.type,
      },
    );
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  开启/禁用
 * @param fields
 */
const handleSwitch = async (id: number, status: number) => {
  const hide = message.loading('正在修改');
  try {
    await modifyMsgStatus(
      id, status,
    );
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteMsg({ id });
    hide();
    message.success('删除成功，即将刷新');
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
  }
};

const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const { initialState } = useModel('@@initialState');
  const [currentRecord, setCurrentRecord] = useState<API.Msg>({} as any);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.Msg>();

  const getRoleList = async () => {
    const { data } = await getRoleOption();
    return (data ?? []).filter((item: API.Role) => (
      item.sort >= (initialState?.msgInfo?.role?.sort as number)
    )).map((item: API.Role) => ({
      label: item.role_name,
      value: item.id,
    }))
  };

  const formColumns: ProColumns<API.Msg>[] = [
    {
      title: '作者',
      dataIndex: 'user_id',
      request: getRoleList,
      hideInForm: true,
      initialValue: currentRecord?.user_id,
      hideInSearch: true,
      render: (_, record) => record?.author?.nickName,
    },
    {
      title: '标题',
      dataIndex: 'title',
      initialValue: currentRecord?.title,
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
      title: '内容',
      dataIndex: 'content',
      valueType: 'text',
      initialValue: currentRecord?.content,
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
      title: '消息类型',
      dataIndex: 'type',
      initialValue: currentRecord?.type,
      valueEnum: msgMap,
      render: (_, record) => {
        return <Tag color={randomTagColor()}>{msgMap[record.type].text}</Tag>
      },
    },
    {
      title: '已读次数',
      dataIndex: 'pinned',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      initialValue: currentRecord?.pinned,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      initialValue: currentRecord?.status,
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
            handleSwitch(record.id, checked ? 1 : 0)
          }} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      initialValue: currentRecord?.created_time,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <AccessButton
            hidedivider={true}
            permission_key='system-msg-edit'
            type='link'
            level={record.role_level}
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
              handleTableAction('edit')
            }}>
            编辑
          </AccessButton>
          <AccessButton permission_key='system-msg-detail' type='link' onClick={() => {
            setRow(record)
          }}>
            查看
          </AccessButton>
          <AccessButton
            permission_key='system-msg-delete'
            type='link'
            level={record.role_level}
            onClick={async () => {
              await handleDel(String(record.id))
              actionRef.current?.reloadAndRest?.();
            }}>
            删除
          </AccessButton>
        </>
      ),
    },
  ];
  const handleSubmit = async (value: any) => {
    let callApi = handleAdd;
    Object.assign(value, { user_id: initialState?.userInfo?.id })
    if (tableAction === 'edit') {
      callApi = handleUpdate
      Object.assign(value, { id: currentRecord.id })
    }
    const success = await callApi(value);
    if (success) {
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }

  const handleFormChange = (changedValues: any, allValues: any) => {
    setParams(allValues)
    console.log(changedValues, allValues);
  };

  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<API.Msg>
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        params={params}
        form={{
          onValuesChange: handleFormChange,
        }}
        bordered
        search={{
          labelWidth: 60,
          span: {
            xs: 24,
            sm: 24,
            md: 12,
            lg: 12,
            xl: 8,
            xxl: 4,
          },
        }}
        toolBarRender={() => [
          <AccessButton
            key="1"
            type="primary"
            permission_key='system-msg-new'
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({} as any) }}>
            新增
          </AccessButton>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryMsgList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            ...filter,
          });
          return {
            data: data?.list || [],
            success,
            total: data?.total || 0,
          };
        }}
        columns={formColumns}
      />
      <DiyForm
        title={tableAction === 'edit' ? '编辑消息' : '新增消息'}
        modalVisible={modalVisible}
        onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Msg>
          onSubmit={handleSubmit}
          rowKey="id"
          type="form"
          columns={formColumns}
        />
      </DiyForm>
      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.Msg>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={formColumns}
          />
        )}
      </Drawer>
    </PageContainer >
  );
};

export default TableList;
