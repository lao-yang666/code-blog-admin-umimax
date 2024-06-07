/*
 * @Description: 顶部布局
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-08-08 14:47:00
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-20 09:09:49
 */
import { useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Avatar, Card, Col, Row, Space, Statistic, Typography } from 'antd';
import { get } from 'lodash-es'
import { FC } from 'react'

import { isSuccess, timeFix, welcomeWords } from '@/utils'

const { Title, Text } = Typography;

// https://www.seniverse.com/
const apiKey = 'Sdcp14pKMKm0XNAMY' // 心知天气 密钥

const RenderContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');

  /**
   * @description: 查询天气实况
   */
  const { data: weatherInfo } = useRequest(
    async () => {
      const response = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=ip`)
      if (isSuccess(response.status)) {
        const result = get(await response.json(), 'results.[0]')
        return result
      }
      return {}
    })
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col>
          <Row gutter={15} align="middle">
            <Col>
              <Avatar src={initialState?.userInfo?.avatar_url} size={80} />
            </Col>
            <Col>
              <Title level={4}>{`${timeFix()}，${initialState?.userInfo?.nickName}，${welcomeWords()}`}</Title>
              {weatherInfo && <Text type="secondary">
                {get(weatherInfo, 'location.name', '')}，
                今日天气{get(weatherInfo, 'now.text', '')}，{get(weatherInfo, 'now.temperature', 0)}℃！</Text>}
            </Col>
          </Row>
        </Col>
        <Col>
          <Space size="large">
            <Statistic title="关注" value={9} />
            <Statistic title="粉丝" value={99} />
            <Statistic title="获赞" value={986} />
            <Statistic title="收藏" value={6} />
            <Statistic title="喜欢" value={126} />
            <Statistic title="评论" value={86} />
            <Statistic title="排名" value={56} />
            <Statistic title="访问" value={7647} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}
export default RenderContent