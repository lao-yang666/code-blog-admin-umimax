/*
 * @Description: 相关推荐
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */

import * as icons from '@ant-design/icons'
import { Select, Space } from 'antd'
import React from 'react'
const iconNames = Object.keys(icons);
export const Icon = (props: { icon: string }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = icons;
  return React.createElement(antIcon[icon]);
};

type MenuIconSelProps = {
  onChange: (<T = any>(value: T) => void) | undefined;

}

// 自定义图标组件  
export const CustomIcon = ({ type, ...props }) => {
  // 从iconMap中获取对应的图标组件  
  const antIcon: { [key: string]: any } = icons;
  const IconComponent = antIcon[type] || null;
  console.log(type, 'xdasdsa')
  // 如果没有找到对应的图标，可以返回一个null或者默认图标  
  if (!IconComponent) {
    console.log(type, 'xxxasdasdasdasdasdsa')
    return null; // 或者返回一个默认图标  
  }

  // 渲染图标  
  return <IconComponent {...props} />;
};

const MenuIconSel: React.FC<MenuIconSelProps> = ({ onChange }) => {
  return (
    <Select
      showSearch
      onChange={onChange}
      style={{ width: 300 }}
      placeholder="选择图标"
      optionRender={({ label, key }) => {
        return <Space key={key}><Icon icon={label as string}></Icon>{label}</Space>

      }}
      options={iconNames.map((item) => ({ label: item, value: item }))}
    />
  )
}
export default MenuIconSel