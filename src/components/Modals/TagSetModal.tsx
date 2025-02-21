import { Button, message, Modal, Tag, Flex, Space } from 'antd';
import React, { useEffect } from 'react';

import services from '@/services/blog';
import { useRequest } from 'ahooks';
import { groupBy, get } from 'lodash-es';
import { randomTagColor } from '@/utils';
import styled from 'styled-components'
const { tagControllerGetSelTagList: queryTagList,
  tagControllerUpdateUserTags: addUserTag, tagControllerUpdatePostTags: addPostTag } =
  services.tag;
const { CheckableTag } = Tag;

interface TagSetModalProps<T> {
  tagType?: 'post' | 'user';
  currentRecord:
  this['tagType'] extends 'post' ? API.Post :
  this['tagType'] extends 'user' ? API.User :
  T;
  modalVisible: boolean;
  onCancel: (reresh?: boolean) => void;
}

const Title = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e8e8e8;
  display: inline-block;
  min-width: 320px;
  width: 100%;
`

const LeftTag = styled.div`
  width: 60%;
`

const RightTag = styled.div`
  font-size: 16px;
  margin-left: 12px;
  
  border-left: 1px solid #e8e8e8;
  min-width: 320px;
  width: 40%;
`
const TagTitle = styled.label`
  font-size: 16px;
  padding-left: 20px;
  font-weight: 500;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e8e8e8;
  display: inline-block;
  width: 100%;
`

const TagItem = styled.div`
  padding: 10px 20px;
`

const TagSetModal = <T,>({ currentRecord, modalVisible, onCancel, tagType }: TagSetModalProps<T>): JSX.Element => {
  const [checkTag, setCheckTag] = React.useState<API.Tag[]>([]);
  const { data: tagList = {}} = useRequest(async () => groupBy(get(await queryTagList(), 'data', {}), 'classesName'));
  console.log(tagList, '====tagList===', currentRecord)
  const onConfrim = () => {
    // 确定按钮
    if (tagType === 'post') {
      addPostTag({ tag_ids: checkTag.map(tag => tag.id), post_id: currentRecord.id }).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          onCancel(true);
        } else {
          message.error(res.msg);
        }
      }).catch((err) => {
        message.error(err)
      })
    } else if (tagType === 'user') {
      addUserTag({ user_id: currentRecord.id, tag_ids: checkTag.map(tag => tag.id) }).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          onCancel(true);
        }
        else {
          message.error(res.msg);
        }
      }).catch((err) => {
        message.error(err)
      })
    }
  }

  const delTag = (id: number) => {
    const newCheckTag = checkTag.filter(item => item.id !== id)
    setCheckTag(newCheckTag)
  }

  const handleChange = (tag: API.Tag, checked: boolean) => {
    if (checked) {
      setCheckTag([...checkTag, tag])
    } else {
      delTag(tag.id)
    }
  }
  useEffect(() => {
    console.log(tagList, '====tagListxxx===', currentRecord)
    if (tagType == 'post') {
      setCheckTag(currentRecord.PostTag || [])
    } else if (tagType == 'user') {
      setCheckTag(currentRecord.userTag || [])
    }
  }, [currentRecord])
  return (
    <Modal
      destroyOnClose
      title='标签设置'
      width={820}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={<div>
        <Button type="primary" onClick={() => onConfrim()} style={{ marginRight: '10px' }}>确定</Button>
        <Button onClick={() => onCancel()}>取消</Button>
      </div>}
    >
      <Flex>
        <LeftTag>
          {
            Object.keys(tagList).map((item, index) => {
              return <div key={index} style={{ flexBasis: '60%', marginBottom: 16 }}>
                <Title>{item}</Title>
                <Flex gap="4px 0" wrap>
                  {tagList[item].map((tag: API.Tag) => {
                    return <CheckableTag
                      key={tag.id}
                      checked={Boolean(checkTag.find(item => item.id == tag.id))}
                      onChange={checked => handleChange(tag, checked)}>{tag.name}</CheckableTag>
                  })}
                </Flex>
              </div>
            })
          }
        </LeftTag>
        <RightTag>
          <TagTitle>已选择标签</TagTitle>
          <TagItem>
            {
              checkTag.map((tag: API.Tag) => {
                return <Tag closable onClose={() => delTag(tag.id)} key={tag.id} color={randomTagColor()}>{tag.name}</Tag>
              })
            }
          </TagItem>
        </RightTag>
      </Flex>
    </Modal>
  )
}


export default TagSetModal;