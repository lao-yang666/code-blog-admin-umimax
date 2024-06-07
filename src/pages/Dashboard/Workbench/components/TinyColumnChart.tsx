/*
 * @Description: 迷你柱形图
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-08-08 14:55:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:00:13
 */
import { TinyColumn } from '@ant-design/charts';
import { FC } from 'react'

const TinyColumnChart: FC = () => {
  const data = [2, 6, 1, 2, 3, 2, 1];
  const config = {
    height: 100,
    autoFit: false,
    data,
    label: {
      visible: true,
    }
  };
  return <TinyColumn {...config} />;
}
export default TinyColumnChart
