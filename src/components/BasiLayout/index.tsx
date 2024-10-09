/*
 * @Description: 入口文件-全局 layout 配置
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-09-19 20:39:53
 * @LastEditors: laoyang
 * @LastEditTime: 2023-10-19 15:47:21
 */
import { ProConfigProvider, SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, InitDataType, Link, RunTimeLayoutConfig } from '@umijs/max';
import { useBoolean } from 'ahooks'
import { Space, Typography } from 'antd'
import { eq } from 'lodash-es'

// import Footer from '@/components/Footer'; // 全局底部版权组件
import { CustomIcon } from '@/pages/System/Menu/components/MenuIconSel';
import { getLocalStorageItem, getToken, setLocalStorageItem } from '@/utils'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import { getMenuListByRoutes } from '@/utils/route';
import type { InitialStateTypes } from '@/utils/types'

import {
	ActionButtons,
	actionsRender,
	appList, avatarProps,
	LockScreenModal,
	LockSleep,
} from './components'

const { Paragraph } = Typography;

export const BasiLayout: RunTimeLayoutConfig = ({ initialState, setInitialState }: InitDataType) => {
	/* 获取 LAYOUT 的值 */
	const LAYOUT = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT)

	const TOKEN = getToken()
	/* 是否显示锁屏弹窗 */
	const [openLockModal, { setTrue: setLockModalTrue, setFalse: setLockModalFalse }] = useBoolean(false)

	return {
		/* 菜单图标使用iconfont */
		iconfontUrl: process.env.ICONFONT_URL,
		/* 水印 */
		waterMarkProps: {
			content: initialState?.userInfo?.id,
		},
		/* 用户头像 */
		avatarProps: avatarProps(setLockModalTrue),
		/* 自定义操作列表 */
		actionsRender,
		/* 底部版权 */
		// footerRender: () => <Footer />,
		/* 页面切换时触发 */
		onPageChange: (location) => {
			// 如果没有登录，重定向到 login
			if (!TOKEN && !eq(location?.pathname, ROUTES.LOGIN)) {
				history.push(ROUTES.LOGIN);
			}
		},
		menu: {
			params: initialState?.MenuChangeTime,
			request: async () => {
				return getMenuListByRoutes(initialState?.MenuData ?? [])
			},
		},
		postMenuData: (menuData: any) => {
			return menuData.map((item: any) => { return { ...item, icon: <CustomIcon type={item.icon} /> } })
		},
		/* 自定义面包屑 */
		// breadcrumbProps: {
		// 	itemRender: (route) => {
		// 		return (
		// 			<Space>
		// 				<IconFont type={`icon-${last(route.linkPath.split('/'))}`} />
		// 				<span>{route.breadcrumbName}</span>
		// 			</Space>
		// 		)
		// 	},
		// },
		/* 自定义菜单项的 render 方法 */
		menuItemRender: (menuItemProps, defaultDom) => {
			const renderMenuDom = () => {
				return (
					<Space>
						{/* 分组布局不用渲染图标，避免重复 */}
						{!(LAYOUT?.siderMenuType === 'group') &&
							menuItemProps.pro_layout_parentKeys?.length > 0 &&
							<CustomIcon type={menuItemProps.icon} />}
						<Paragraph
							ellipsis={{ rows: 1, tooltip: defaultDom }}
							style={{ marginBottom: 0 }}>
							{defaultDom}
						</Paragraph>
					</Space>
				)
			}
			return (
				/* 渲染二级菜单图标 */
				menuItemProps.isUrl ?
					<a href={menuItemProps.path} target="_blank">
						{renderMenuDom()}
					</a> :
					<Link to={menuItemProps.path || '/'} >
						{renderMenuDom()}
					</Link>
			);
		},
		// 菜单的折叠收起事件
		onCollapse: (collapsed) => {
			setInitialState((s: InitialStateTypes) => ({ ...s, Collapsed: collapsed }));
		},
		// 跨站点导航列表
		appList,
		// 增加一个 loading 的状态
		childrenRender: (children) => {
			return (
				<>
					<ProConfigProvider>
						{children}
						{/* 锁屏弹窗 */}
						<LockScreenModal open={openLockModal} setOpenFalse={setLockModalFalse} />
						{/* 睡眠弹窗 */}
						<LockSleep />
						{/* 公告详情 	<AnnouncementDetail />*/}
						{/* 消息通知 	<EventSourceNotice />*/}
						{/* 全局通用按钮 */}
						<ActionButtons />
						{/* 工具栏 */}
						<SettingDrawer
							disableUrlParams
							enableDarkTheme
							settings={LAYOUT || {}}
							onSettingChange={(Settings: LayoutSettings) => {
								setLocalStorageItem(LOCAL_STORAGE.LAYOUT, { ...initialState?.Settings, ...Settings })
								setInitialState((s: InitialStateTypes) => ({ ...s, Settings }));
							}}
						/>
					</ProConfigProvider>
				</>
			);
		},
		...LAYOUT,
	};
}