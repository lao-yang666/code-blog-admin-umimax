/*
 * @Description: 最新公告
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2023-10-11 09:48:13
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-11 17:20:28
 */
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Avatar, Card, List, Tag } from 'antd'
import { get } from 'lodash-es'
import { FC } from 'react'

import { getAnnouncementList } from '@/services/administrative/announcement'
import { formatPerfix, randomTagColor } from '@/utils'
import { AnnouncementTypeEnum } from '@/utils/const'
import { EVENTBUS_TYPE, ROUTES } from '@/utils/enums'
import eventBus from '@/utils/eventBus'
import { msgControllerGetSelMsgList } from '@/services/blog/msg';

const LatestAnnouncement: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
* @description: 获取最新公告列表
* @author: laoyang
*/
  const { data: announcementList, loading: announcementListLoading } = useRequest(
    async (params) => get(await msgControllerGetSelMsgList(params), 'data.list', []), {
    defaultParams: [{ type: 'hd' }],
  })
  return (
    <Card
      title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'latest-announcement') })}
      loading={announcementListLoading}
      bodyStyle={{ padding: '5px 24px' }}>
      <List
        itemLayout="horizontal"
        dataSource={announcementList}
        renderItem={(record: API.ANNOUNCEMENT) => (
          <List.Item actions={[<Tag color={randomTagColor()} key="type">{
            formatMessage({
              id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${AnnouncementTypeEnum[record.type]}`),
            })
          }</Tag>]}>
            <List.Item.Meta
              avatar={<Avatar src={record.avatar_url} />}
              title={<a onClick={() => eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)}>{record.title}</a>}
              description={record.cn_name}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
export default LatestAnnouncement