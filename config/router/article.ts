/*
 * @Description: 文章管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-28 09:34:25
 */
export default {
  path: '/Post',
  name: '文章管理',
  exact: true,
  routes: [
    // {
    //   path: '/administrative',
    //   redirect: '/administrative/organization',
    //   exact: true,
    // },
    {
      name: '文章列表',
      path: '/Post/PostList',
      component: './Post',
      exact: true,
    },
    {
      name: '新建文章',
      path: '/Post/PostAdd',
      component: './Post/postAdd',
      hideInMenu: true,
      exact: true,
      // menuRender: false,
    },
    {
      name: '文章详情',
      path: '/Post/PostDetail',
      component: './Post/postDetail',
      hideInMenu: true,
      exact: true,
      // menuRender: false,
    },
  ],
}