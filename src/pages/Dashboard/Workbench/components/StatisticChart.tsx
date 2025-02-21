/*
 * @Description: 指标卡片
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-08-08 14:50:57
 * @LastEditors: Yang
 * @LastEditTime: 2023-08-08 15:20:05
 */
import { StatisticCard } from '@ant-design/pro-components';
import { Col, Divider, Row, Space } from 'antd';
import type { FC } from 'react';

import BulletChart from './BulletChart' // 进度图
import TinyAreaChart from './TinyAreaChart' // 迷你面积图
import TinyColumnChart from './TinyColumnChart' // 迷你柱形图

const { Statistic } = StatisticCard;

const StatisticChart: FC = () => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <StatisticCard
          title="今日新增文章量"
          style={{ height: 200 }}
          statistic={{
            value: 1,
            suffix: '篇'
          }}
        >
          <Divider type="horizontal" />
          <Space>
            <Statistic title="日同比" value="6.47%" trend="up" />
            <Statistic title="周同比" value="23.58%" trend="down" />
          </Space>,
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="访问量"
          tooltip="近22天的项目访问量"
          style={{ height: 200 }}
          statistic={{ value: 8846 }}
          chart={<TinyAreaChart />}
        >
          <Statistic value="56.12%" title="日访问量占比" />
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="新增量"
          tooltip='近一周新增文章数'
          style={{ height: 200 }}
          chart={<TinyColumnChart />}
        >
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="客户满意度"
          tooltip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: 80, suffix: '%' }}
          chart={<BulletChart />}
        >
          <Space>
            <Statistic title="日同比" value="12.25%" trend="up" />
            <Statistic title="周同比" value="56.35%" trend="down" />
          </Space>
        </StatisticCard>
      </Col>
    </Row>
  )
}
export default StatisticChart
