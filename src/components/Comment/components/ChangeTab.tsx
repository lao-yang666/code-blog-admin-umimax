import React, { useState } from 'react'

const ChangeTab: React.FC<{tab:string, changeTab: Function }> = (props) => {
  const { tab, changeTab } = props
  return (
    <ul className="sort-container">
      <li className={tab === 'likeNum' ? 'on' : ''} onClick={() => changeTab('likeNum')}>最热</li>
      <li className={tab === 'created_time' ? 'on' : ''} onClick={() => changeTab('created_time')}>最新</li>
    </ul>
  )
}
export default ChangeTab