import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useIntl, useModel } from '@umijs/max'
import { App, Button, Tabs, theme, Typography } from 'antd';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import services from '@/services/blog';
import { formatPerfix, saveToken, setSessionStorageItem, timeFix } from '@/utils';
import { IconFont } from '@/utils/const'
import { ROUTES } from '@/utils/enums';

import backURl from '../../../public/images/sanyueqi.jpg';
const { userLoginByAccount } = services.yonghuguanli;

type LoginType = 'phone' | 'account';

const Page = () => {
  dayjs.extend(relativeTime);
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { initialState } = useModel('@@initialState');
  const [message, setMessage] = useState<string>('')
  const { token } = theme.useToken();
  const { notification } = App.useApp();
  const { formatMessage } = useIntl();
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const res = await userLoginByAccount({ name: values.username, password: values.password });
      if (res.data.code === -1) {
        setMessage(res.data.msg)
      } else if (res.data.access_token) {
        saveToken(res.data.access_token);
        setSessionStorageItem('userInfo', res.data)
        // window.location.href = '/';
        //  const { data } = await queryMenuList();
        // await setInitialState((s) => ({ ...s, 
        // ...{ token: res.data.access_token, userInfo: res.data, MenuData: data } })).then(() => {
        //   // history.push('/');  // 需要先登录才能获取菜单列表,所以此时动态路由未加载 
        //   window.location.href = '/';  // window.location.href跳转会使render与patchClientRoutes重新渲染
        // })
        setTimeout(() => {
          // 路由跳转
          const urlParams = new URL(window.location.href).searchParams;
          // history.push(urlParams.get('redirect') || '/login');
          window.location.href = '/';
          // 欢迎语
          notification.success({
            message: `${timeFix()}，${res.data?.nickName} 💕`,
            description: res.data?.login_last_time ?
              <span>
                {formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'success.last-time') })}
                <Typography.Text strong>{dayjs(res.data?.login_last_time).fromNow()}</Typography.Text>
              </span>
              :
              <Typography.Text strong>
                {formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'success.first-login') })}
              </Typography.Text>,
            icon:
              <IconFont
                type="icon-huanyingye"
                style={{ color: initialState?.Settings?.colorPrimary, fontSize: '24px' }} />,
          })
        }, 0)

      }
    } catch (error) {
      setMessage('登录出错!请稍后再试！')
    }

  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        message={<div style={{ color: 'red', textAlign: 'center' }}>{message}</div>}
        onFinish={onSubmit}
        title="崩铁!启动"
        backgroundImageUrl={backURl}
        subTitle="一发入魂,十连双金,YYDS"

        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)',
          },
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'用户名: zhangsan'}
              initialValue={'zhangsan'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'密码: zhangsan123'}
              initialValue={'zhangsan123'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 20,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider >
      <Page />
    </ProConfigProvider>
  );
};