import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyPost from './MyPost'
import MyFloweer from './MyFloweer'
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '我的动态',
    children: <MyPost title='我的文章' type='0' />,
  },
  {
    key: '2',
    label: '我的文章',
    children: <MyPost title='我的文章' type='0' />,
  },
  {
    key: '3',
    label: '我的收藏',
    children: <MyPost title='我的收藏' type='1' />,
  },
  {
    key: '4',
    label: '我的点赞',
    children: <MyPost title='我的点赞' type='2' />,
  },
  {
    key: '5',
    label: '我的关注',
    children: <MyFloweer title='我的关注' type='1' />,
  },
  {
    key: '6',
    label: '我的粉丝',
    children: <MyFloweer title='我的粉丝' type='2' />,
  },

];

const App: React.FC = () => <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;