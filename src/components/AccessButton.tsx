import { useAccess, useRouteProps } from '@umijs/max';
import { Button, ButtonProps, Divider } from 'antd';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
interface AccessButtonProps {
  permission_key: string;
  hidedivider?: boolean; // 是否隐藏分割线
  level?: number | string; // 权限等级
}

type AcessItem = Pick<API.buttonPermission, 'permission_key' | 'effect_form'>;

/**
 * @description 权限按钮
 * 一个按钮默认有 读写 只读 增 删 查 改 上传 下载  等权限(如不设置)
 * 只读 等价于 查 下载 权限
 * 读写 等价于 拥有按钮所有权限 包括增删查改上传下载权限
 * 自身权限: 如删除按钮设置了删除权限
 * 如果同时设置了 读写 只读 增 删 查 改 上传 下载 当中 多个权限按钮权限 优先级： 增删改查上传下载等按钮的自身权限 > 读写权限 > 只读权限 
 * 比如 设置了  禁止删除 和读写权限  则按钮除了删除权限 其他权限都显示
 * 有只读模式且没有读写模式 等同于有权限标识以detail 或者 download结尾的权限显示,其他权限 隐藏(0)或者禁止(1,2)
 * 有读写模式 等同于可访问所有权限标识的按钮(当然按钮自身权限优先)
 * 操作用户或角色时 只能操作比自己角色权限低的数据
 * @param props 
 * @returns 
 */
const AccessButton: React.FC<PropsWithChildren<AccessButtonProps & ButtonProps>> = (props) => {
  const { permission_key, level, hidedivider = false, ...restProps } = props;
  const [hasAccess, setHasAccess] = useState<AcessItem>({ effect_form: '', permission_key: '' });
  const [hasReadAccess, setHasReadAccess] = useState<AcessItem>();
  const [hasOnlyReadAccess, sethasOnlyReadAccess] = useState<boolean>(false);
  const [isLower, setIsLower] = useState<boolean>(false);
  const access = useAccess();
  const routeProps = useRouteProps();

  useEffect(() => {
    const menuAccess = access['menuAccess']?.[routeProps?.menu_id] ?? [];
    const readAceess = menuAccess?.find((item: AcessItem) => item.permission_key?.endsWith('read')); // 只读权限
    const writeAceess = menuAccess?.find((item: AcessItem) => item.permission_key?.endsWith('write')); // 读写权限
    const onlyReadAceess = readAceess && !writeAceess; // 没有读写有只读权限
    // 权限标识匹配查找是否有自身权限 如匹配到则按标识来 0 按钮隐藏   1按钮禁止   2按钮显示
    const targetAccess = menuAccess?.find((item: AcessItem) => item.permission_key
      === props.permission_key) ?? { effect_form: '', permission_key: '' }
    const hasReadAceessFlag = !targetAccess?.permission_key && onlyReadAceess &&
      !(permission_key?.endsWith('download') || permission_key?.endsWith('detail')); // 检查是否仅配置只读权限
    const isLower = level && access.role_level ? Number(level) <= access.role_level : false; // 操作用户或角色时 判断是否是够权限  
    setHasAccess(targetAccess)
    setHasReadAccess(readAceess)
    console.log('hasReadAceessFlag', hasReadAceessFlag, permission_key,targetAccess,onlyReadAceess)
    sethasOnlyReadAccess(!!hasReadAceessFlag)
    setIsLower(isLower);
  }, [access, location])

  const hideButton = useMemo(() => {
    return hasAccess?.effect_form === '0' || (hasOnlyReadAccess && hasReadAccess?.effect_form === '0')
  }, [hasAccess, hasOnlyReadAccess, hasReadAccess])

  const disabledButton = useMemo(() => {
    return hasAccess?.effect_form === '1' || isLower ||
      (hasOnlyReadAccess && (hasReadAccess?.effect_form === '1' || hasReadAccess?.effect_form === '2'))
  }, [hasAccess, isLower, hasOnlyReadAccess, hasReadAccess])
  return (
    hideButton ? null
      : <>
        {!hidedivider && props.type === 'link' ? <Divider type="vertical" /> : null}
        <Button
          {...restProps}
          disabled={disabledButton}
          key={permission_key}
          style={{ padding: props.type === 'link' ? '0' : 'none' }}>
          {props.children}
        </Button>
      </>
  );
};

export default React.memo(AccessButton);
