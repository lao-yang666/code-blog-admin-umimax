export default {
  path: '/tag',
  name: '标签管理',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/tag',
      redirect: '/tag-list',
      exact: true,
    },
    {
      path: '/tag/tag-list',
      name: 'tag-list',
      component: './Tag',
      exact: true,
    },
    {
      path: '/tag/tag-classes',
      name: 'tag-classes',
      component: './Tag/classes',
      exact: true,
    }
  ]
}