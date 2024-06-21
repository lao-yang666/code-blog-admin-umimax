/*
 * @Description: 消息铃铛
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-08 15:26:07
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-12 15:40:20
 */
import { BellOutlined } from '@ant-design/icons'
import { useIntl } from '@umijs/max'
import { useMount, useRequest, useUnmount } from 'ahooks'
import { Avatar, Badge, Card, ConfigProvider, List, Popover, Spin, Tabs } from 'antd'
import { get, map } from 'lodash-es'
import { FC, useState } from 'react'

import { queryUnreadyCount } from '@/services/administrative/announcement'
import { formatPerfix } from '@/utils'
import { AnnouncementTypeEnum } from '@/utils/const'
import { EVENTBUS_TYPE, MSG_TYPE, ROUTES } from '@/utils/enums'
import eventBus from '@/utils/eventBus'
import type { PaginationParams } from '@/utils/types'
import type { AnnouncementType } from '@/utils/types/administrative/announcement'
import { msgControllerGetMsgList, getMsgCount } from '@/services/blog/msg';
const NoticeBell: FC = () => {
  // 国际化工具类
  const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<AnnouncementType>(MSG_TYPE.ACTIVITY)
  // 当前页码
  const [current, setCurrent] = useState<number>(1)
  // 分页参数
  const paginationParams: PaginationParams = { pageSize: 5, current }

  /**
 * @description: 获取活动公告列表
 * @author: laoyang
 */
  const { data: announcementList, loading: announcementListLoading, run: fetchAnnouncementList } = useRequest(
    async () => get(await msgControllerGetMsgList({
      type: activeKey,
      ...paginationParams,
    }), 'data', {}), {
    refreshDeps: [activeKey, current],
  })

  /**
 * @description: 查询不同消息类型的未读条数
 * @author: laoyang
 */
  const { data: unreadyCount, loading: unreadyCountLoading, run: fetchUnreadyCount } = useRequest(
    async () => get(await getMsgCount(), 'data', {}), {
    onSuccess: () => {
      setCurrent(1);
      fetchAnnouncementList();
    },
  })

  /**
   * @description: 消息类型
   * @author: laoyang
   */
  const renderAnnouncementType = (
    <Tabs
      activeKey={activeKey}
      centered
      onChange={(key) => {
        setActiveKey(key);
        setCurrent(1);
      }}

      items={map(AnnouncementTypeEnum, (type: string, value: string) => ({
        label:
          `${formatMessage({ id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${type}`) })}(${get(unreadyCount, value, 0)})`,
        key: value,
      }))} />
  )

  /**
   * @description: 渲染消息内容
   * @author: laoyang
   */
  const renderContent = (
    <Card
      bodyStyle={{ padding: 0 }}
      bordered={false}
      style={{ boxShadow: 'none' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={get(announcementList, 'list', [])}
        loading={announcementListLoading}
        pagination={{
          position: 'bottom',
          align: 'center',
          size: 'small',
          total: get(announcementList, 'total', 0),
          hideOnSinglePage: true,
          ...paginationParams,
          onChange: (page) => setCurrent(page),
        }}
        renderItem={(record: API.ANNOUNCEMENT) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={
                <Badge dot offset={[5, 5]}>
                  <a onClick={() => {
                    eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record, fetchUnreadyCount);
                  }}>{record.title}</a></Badge>}
              description={record.cn_name}
            />
          </List.Item>
        )}
      />
    </Card>
  )

  useMount(() => {
    eventBus.on(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })

  useUnmount(() => {
    eventBus.off(EVENTBUS_TYPE.UPDATEUNREADYCOUNT, fetchUnreadyCount)
  })
  return (
    <>
      <ConfigProvider theme={{
        components: {
          Popover: { minWidth: 350 },
          Tabs: { horizontalMargin: '0' },
        },
      }}>
        <Popover title={renderAnnouncementType} content={renderContent}>
          <Spin spinning={unreadyCountLoading} size="small">
            <Badge count={get(unreadyCount, 'total', 0)} size="small">
              <BellOutlined />
            </Badge>
          </Spin>
        </Popover>
      </ConfigProvider>
    </>
  )
}
export default NoticeBell