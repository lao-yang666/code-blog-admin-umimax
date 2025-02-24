/*
 * @Description: 技术文档模块
 * @Version: 2.0
 * @Author: Yang
 * @Date: 2023-08-11 16:16:16
 * @LastEditors: Yang
 * @LastEditTime: 2023-08-11 17:43:49
 */
export default {
  path: '/technical-document',
  name: '技术文档',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/technical-document',
      redirect: '/technical-document/react',
      exact: true,
    },
    {
      path: '/technical-document/react',
      name: 'react',
      component: './TechnicalDocument/React',
      exact: true,
    },
    {
      path: '/technical-document/ant',
      name: 'ant',
      component: './TechnicalDocument/AntDesign',
      exact: true,
    },
    {
      path: '/technical-document/umi',
      name: 'umi',
      component: './TechnicalDocument/Umi',
      exact: true,
    },
    {
      path: '/technical-document/api',
      name: 'api',
      component: './TechnicalDocument/Api',
      exact: true,
    },
    {
      path: 'https://prisma.org.cn/',
      name: 'prisma',
    },
    {
      path: 'https://nest.nodejs.cn/',
      name: 'nest',
    },
  ],
}
