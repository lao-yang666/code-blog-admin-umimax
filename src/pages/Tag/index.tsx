import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message, Tag } from 'antd';
import React, { useRef, useState } from 'react';

import AccessButton from '@/components/AccessButton';
import DiyForm from '@/components/DiyForm';
import services from '@/services/blog';
import { randomTagColor } from '@/utils';
const { userControllerGetSelUserList: queryUserList } = services.yonghuguanli
const { postControllerGetSelPosts: queryPostList } = services.wenzhangguanli;
const { tagControllerCreateTag: addTag, tagControllerGetTagList: queryTagList,
  tagControllerDeleteDraft: deleteTag, tagControllerUpdateTag: modifyTag,
  tagControllerGetSelTagClassesList: getTagClasses,
  tagControllerCreateUserTag: addUserTag,tagControllerCreatePostTag: addPostTag } =
  services.tag;

const tagMap = {
  'post': { text: '文章', status: '文章' },
  'user': { text: '人物', status: '人物' },
}
/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.TagNew) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addTag({ ...fields });
    console.log(fields,'fieldsfields');
    
    if (fields.userId) await addUserTag({ tag_id: res.data.id, user_id: fields.userId })
    if (fields.post_id) await addPostTag({ tag_id: res.data.id, post_id: fields.post_id })
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
    await modifyTag(
      { id: fields.id },
      {
        id: fields.id,
        name: fields.name,
        classesId: fields.classesId,
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
 *  删除
 * @param selectedRows
 */
const handleDel = async (id: string | undefined) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteTag({ id });
    hide();
    message.success('删除成功，即将刷新');
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
  }
};

const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [diyParams, setDiyParams] = useState({} as any);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const { initialState } = useModel('@@initialState');
  const [currentRecord, setCurrentRecord] = useState<API.Tag>({} as any);
  const actionRef = useRef<ActionType>();

  const getTagClassesList = async () => {
    const { data } = await getTagClasses();
    return (data ?? []).map((item: API.TagClasses) => ({
      label: item.name,
      value: item.id,
    }))
  };

  const getAuthorList = async () => {
    const { data } = await queryUserList();
    return (data ?? []).map((item: API.User) => ({
      label: item.nickName,
      value: item.id,
    }))
  };

  const getPostList = async () => {
    const { data } = await queryPostList();
    return (data ?? []).map((item: API.Post) => ({
      label: item.title,
      value: item.id,
    }))
  };

  const formColumns: ProColumns<API.Tag>[] = [
    {
      title: '作者',
      dataIndex: 'user_id',
      hideInForm: true,
      initialValue: currentRecord?.user_id,
      hideInSearch: true,
      render: (_, record) => record?.author?.nickName,
    },
    {
      title: '名称',
      dataIndex: 'name',
      initialValue: currentRecord?.name,
      render: (_, record) => {
        return <Tag color={randomTagColor()}>{record?.name}</Tag>
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '分类',
      request: getTagClassesList,
      dataIndex: 'classesId',
      initialValue: currentRecord?.classesId,
      valueEnum: tagMap,
      render: (_, record) => record?.tagClasses?.name,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '分类为必填项',
          },
        ],
      },
    },
    {
      title: '适用对象',
      dataIndex: 'type',
      initialValue: currentRecord?.type,
      valueEnum: tagMap,
      render: (_, record) => {
        return <Tag color={randomTagColor()}>{tagMap[record.type].text}</Tag>
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '适用对象为必填项',
          },
        ],
      },
    },
    {
      title: '人物',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: diyParams?.type !== 'user',
      hideInSearch: true,
      request: getAuthorList,
      hideInTable: true,
    },
    {
      title: '文章',
      dataIndex: 'post_id',
      valueType: 'text',
      hideInForm: diyParams?.type !== 'post',
      hideInSearch: true,
      hideInTable: true,
      request: getPostList,
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
            permission_key='system-tag-edit'
            type='link'
            level={record.role_level}
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
              handleTableAction('edit')
            }}>
            编辑
          </AccessButton>
          <AccessButton
            permission_key='system-tag-delete'
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
  const handleDiyFormChange = (changedValues: any, allValues: any) => {
    setDiyParams(allValues)
    console.log(changedValues, allValues);
  };
  
  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<API.Tag>
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
            permission_key='system-tag-new'
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({} as any) }}>
            新增
          </AccessButton>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryTagList({
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
        title={tableAction === 'edit' ? '编辑标签' : '新增标签'}
        modalVisible={modalVisible}
        onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Tag>
          form={{
            onValuesChange: handleDiyFormChange,
          }}
          onSubmit={handleSubmit}
          rowKey="id"
          type="form"
          columns={formColumns}
        />
      </DiyForm>
    </PageContainer >
  );
};

export default TableList;
