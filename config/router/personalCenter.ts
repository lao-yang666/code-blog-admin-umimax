/*
 * @Description: 个人中心模块
 * @Version: 2.0
 * @Author: Yang
 * @Date: 2023-01-12 15:21:05
 * @LastEditors: Yang
 * @LastEditTime: 2023-01-12 15:23:19
 */

export default {
  path: '/Personal',
  name: 'personal-center',
  access: 'adminRouteFilter',
  component: './Personal',
  exact: true,
}
// export default {
//   path: '/personal-center',
//   name: 'personal-center',
//   access: 'adminRouteFilter',
//   exact: true,
//   routes: [
//     {
//       path: '/personal-center',
//       redirect: '/personal-center/personal-information',
//       exact: true,
//     },
//     {
//       path: '/personal-center/personal-information',
//       name: 'personal-information',
//       component: './PersonalCenter/PersonalInformation',
//       access: 'adminRouteFilter',
//       exact: true,
//     },
//     {
//       path: '/personal-center/personal-setting',
//       name: 'personal-setting',
//       component: './PersonalCenter/PersonalSetting',
//       access: 'adminRouteFilter',
//       exact: true,
//     },
//   ],
// }