import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message, Switch, Tag } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AccessButton from '@/components/AccessButton';
import DiyForm from '@/components/DiyForm';
import MenuAuthorizationModal from '@/components/Modals/MenuAuthorizationModal';
import StaffAuthorizationModal from '@/components/Modals/StaffAuthorizationModal';
import services from '@/services/blog';
import { randomTagColor } from '@/utils';
const { roleGetUserAccessByid,
  modifyRoleStatus,
  roleControllerCreateRole: addRole,
  roleControllerGetRoles: queryRoleList,
  roleControllerDeleteRole: deleteRole,
  roleControllerUpdateRole: modifyRole } =
  services.jiaoseguanli;

const { userControllerGetSelUserList: queryUserList } = services.yonghuguanli;
const { menuControllerGetSelMenuList: queryMenuList } = services.caidanguanli;
const {
  permissionControllerGetRoleUserAccessByid: getMenuView,
} = services.quanxianguanli;

/**
 * 添加
 * @param fields
 */
const handleAdd = async (fields: API.RoleNew) => {
  const hide = message.loading('正在添加');
  try {
    await addRole({ ...fields });
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
const handleUpdate = async (fields: API.Role) => {
  const hide = message.loading('正在修改');
  try {
    await modifyRole(
      { id: fields.id },
      { ...fields },
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
    await modifyRoleStatus(
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
const handleDel = async (id: number) => {
  if (!id) return;
  const hide = message.loading('正在删除');
  try {
    await deleteRole({ id });
    hide();
    message.success('删除成功，即将刷新');
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
  }
};

const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [userAceessModalVisible, handleUserAceessModalVisible] = useState<boolean>(false);
  const [menuAceessModalVisible, handleMenuAceessModalVisible] = useState<boolean>(false);
  const [params, setParams] = useState({});
  const [tableAction, handleTableAction] =
    useState<string>('add');
  const [currentRecord, setCurrentRecord] = useState<API.Role>({} as any);
  const [userList, setUserList] = useState<API.User[]>([]);
  const [allUserList, setAllUserList] = useState<ReadonlyArray<API.User>>([]);
  const [menuList, setMenuList] = useState<API.Menu[]>([]);
  const [checkUser, setCheckUser] = useState<number[]>([]);
  const [checkMenu, setCheckMenu] = useState<number[]>([]);
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');

  const MemoizedList = React.memo((props) => (
    <ProTable {...props} />
  ));

  const queryRoleUserAccess = useCallback((id: number) => {
    roleGetUserAccessByid({ id }).then((res) => {
      if (res.code === 200) {
        const userData = res.data.User;
        const userIds = userData.map((item: API.User) => item.id)
        const roleUserList = allUserList.filter(
          (item: API.User) =>
            !userIds.includes(item.id) && (item?.role_level as number) > (initialState?.userInfo?.role?.sort as number))
        // setCheckUser(userIds)
        console.log(initialState?.userInfo, 'initialState?.userInfo?.role_level',allUserList);

        setUserList(roleUserList)
      }
    })
  }, [allUserList]);

  const queryRoleMenuAccess = (id: number) => {
    getMenuView({ id }).then((res) => {
      if (res.code === 200) {
        const menuData = res.data;
        const menuIds = menuData.map((item: API.Menu) => item.menu_id)
        setCheckMenu(menuIds)
      }
    })
  }

  const validateSort = (_, value: any) => {
    if (!isNaN(Number(value)) && Number(value) < 2) {
      return Promise.reject(new Error('等级不能小于2'));
    }
    if (!isNaN(Number(value)) && Number(value) < (initialState?.userInfo?.role?.sort as number)) {
      return Promise.reject(new Error('等级不能高于自己的角色等级'));
    }
    return Promise.resolve();
  }

  const columns: ProColumns<API.Role>[] = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      initialValue: currentRecord?.role_name,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色名称为必填项',
          },
        ],
      },
    },
    {
      title: '角色编码',
      dataIndex: 'role_code',
      valueType: 'text',
      hideInSearch: true,
      fieldProps: {
        disabled: !!currentRecord.id,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '角色编码名称为必填项',
          },
        ],
      },
      initialValue: currentRecord?.role_code,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      valueType: 'text',
      hideInSearch: true,
      initialValue: currentRecord?.describe,
    },
    {
      title: '创建者',
      dataIndex: 'founder',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      initialValue: currentRecord?.founder,
      render: (_, record) => {
        const founder = allUserList.find((item: API.User) => item.id === record.founder)
        return <Tag color={randomTagColor()}>{founder?.nickName ?? record.founder}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '人员',
      dataIndex: 'created_time',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => record?.User?.map((item: API.User) =>
        <Tag key={item.id} color={randomTagColor()}>{item.nickName}</Tag>),
    },
    {
      title: '等级',
      dataIndex: 'sort',
      valueType: 'text',
      tip: '等级数字越小，权限越高, 不能操作比自己等级权限更高的用户信息或者角色信息',
      fieldProps: {
        type: 'number',
        min: 3,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '等级为必填项',
          },
          { validator: validateSort },
        ],
      },
      hideInSearch: true,
      initialValue: currentRecord?.sort,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: !!currentRecord.id,
      initialValue: currentRecord?.status ? String(currentRecord?.status) : '',
      valueEnum: {
        '1': { text: '启用', status: '启用' },
        '0': { text: '禁用', status: '禁用' },
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '360px',
      render: (_, record) => (
        <>
          <AccessButton
            hidedivider={true}
            permission_key='system-role-user'
            type='link'
            level={record.sort}
            onClick={() => {
              console.log(initialState?.userInfo, 'allUserList',allUserList);
              queryRoleUserAccess(record.id)
              setCurrentRecord(record);
              handleUserAceessModalVisible(true)
            }}>
            分配人员
          </AccessButton>
          <AccessButton
            permission_key='system-role-menu'
            type='link'
            level={record.sort}
            onClick={() => {
              history.push(`/system/roleMenu?id=${record.id}`);
            }}>
            分配菜单
          </AccessButton>
          <AccessButton permission_key='system-role-detail' type='link' onClick={() => {
            queryRoleMenuAccess(record.id)
            setCurrentRecord(record);
            handleMenuAceessModalVisible(true)
          }}>
            查看菜单
          </AccessButton>
          <AccessButton
            permission_key='system-role-edit'
            type='link'
            level={record.sort}
            onClick={() => {
              handleModalVisible(true);
              setCurrentRecord(record);
              handleTableAction('edit')
            }}>
            编辑
          </AccessButton>
          <AccessButton
            permission_key='system-role-delete'
            type='link'
            level={record.sort}
            onClick={async () => {
              await handleDel(record.id)
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
    if (tableAction === 'edit') {
      callApi = handleUpdate
      Object.assign(value, { id: currentRecord.id })
    } else {
      Object.assign(value, { founder: initialState?.userInfo?.id })
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
  };

  useEffect(() => {
    queryUserList().then((res) => {
      if (res.code === 200) {
        setUserList(res.data)
        setAllUserList(res.data)
      }
    })
    queryMenuList().then((res) => {
      if (res.code === 200) {
        setMenuList(res.data)
      }
    })
  }, [])
  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<API.Role>
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
            permission_key='system-role-list-delete'
            onClick={() => { handleModalVisible(true); handleTableAction('add'); setCurrentRecord({} as any) }}>
            新增角色
          </AccessButton>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryRoleList({
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
        columns={columns}
      />
      <DiyForm
        title={tableAction === 'edit' ? '编辑角色' : '新增角色'}
        modalVisible={modalVisible}
        onCancel={() => handleModalVisible(false)}>
        <ProTable<API.Role>
          onSubmit={handleSubmit}
          type='form'
          rowKey="id"
          columns={columns}
        />
      </DiyForm>
      <StaffAuthorizationModal
        title={<div>
          <span>分配人员</span>
          <span style={{ color: 'red' }}>
            {currentRecord.role_name}</span>
          <span>角色</span></div>}
        role_id={currentRecord.id}
        level={currentRecord.sort}
        checkData={checkUser}
        userData={userList}
        modalVisible={userAceessModalVisible}
        onChange={(val: number[]) => { setCheckUser(val) }}
        onCancel={(reresh?: boolean) => {
          handleUserAceessModalVisible(false);
          if (reresh) { setCheckUser([]); actionRef.current?.reloadAndRest?.(); }
        }}>
      </StaffAuthorizationModal>
      <MenuAuthorizationModal
        title='分配角色菜单'
        role_id={currentRecord.id}
        checkData={checkMenu}
        menuData={menuList}
        modalVisible={menuAceessModalVisible}
        onChange={(val: number[]) => { setCheckMenu(val) }}
        onCancel={() => handleMenuAceessModalVisible(false)}>
      </MenuAuthorizationModal>
    </PageContainer >
  );
};

export default TableList;
