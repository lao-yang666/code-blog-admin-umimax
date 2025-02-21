/*
 * @Description: 导出路由
 * @Version: 2.0
 * @Author: Yang
 * @Date: 2022-09-13 10:27:55
 * @LastEditors: Yang
 * @LastEditTime: 2023-01-12 15:39:47
 */
import msg from './msg' // 公告管理模块
import tag from './tag' // 标签管理模块
import article from './article' // 文章管理模块
import dashboard from './dashboard'; // 指示面板模块
import personalCenter from './personalCenter'; // 个人中心模块
import setting from './system' // 系统设置模块
import technicalDocument from './technicalDocument' // 技术文档模块

export {
    setting, dashboard, msg, tag, personalCenter, technicalDocument, article,
}