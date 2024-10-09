import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useRef, useState } from 'react';

import AccessButton from '@/components/AccessButton';
import DiyForm from '@/components/DiyForm';
import services from '@/services/blog';
const { tagControllerCreateTagClasses: addTagClasses, tagControllerGetTagClassesList: queryTagClassesList,
  tagControllerDeleteTagClasses: deleteTagClasses, tagControllerUpdateTagClasses: modifyTagClasses } =
  services.tag;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.TagClassesNew) => {
  const hide = message.loading('正在添加');
  try {
    await addTagClasses({ ...fields });
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
    await modifyTagClasses(
      { id: fields.id },
      {
        id: fields.id,
        name: fields.name,
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
    await deleteTagClasses({ id });
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
  const [currentRecord, setCurrentRecord] = useState<API.TagClasses>({} as any);
  const actionRef = useRef<ActionType>();

  const formColumns: ProColumns<API.TagClasses>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      initialValue: currentRecord?.name,
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
      title: '创建人',
      dataIndex: 'user_id',
      hideInSearch: true,
      hideInForm: true,
      initialValue: currentRecord?.user_id,
      render: (_, record) => record?.author?.nickName,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      hideInSearch: false,
      valueType: 'dateTimeRange',
      render: (_, record) => record?.created_time,
      colSize: 2,
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

  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<API.TagClasses>
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
          const { data, success } = await queryTagClassesList({
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
        title={tableAction === 'edit' ? '编辑标签分类' : '新增标签分类'}
        modalVisible={modalVisible}
        onCancel={() => handleModalVisible(false)}>
        <ProTable<API.TagClasses>
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
