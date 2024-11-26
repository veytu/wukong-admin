import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import { Alert, message, Tabs, Image, Flex } from 'antd';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel, Helmet } from '@umijs/max';
import { login, getCaptcha } from '@/pages/User/service';
import Settings from '../../../../config/defaultSettings';
import useStyles from './index.style';


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [captcha, setCaptcha] = useState<string | undefined>('');
  const [captchaToken, setCaptchaToken] = useState<string | undefined>('');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const { styles } = useStyles();

  const fetchCaptcha = async () => {
    const response = await getCaptcha();
    if (response.code === 200) {
      setCaptcha(response.data?.imageUrl);
      setCaptchaToken(response.data?.token);
    }
  };

  React.useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, captchaToken });
      if (msg.code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        localStorage.setItem('token', msg.data?.token || '');
        message.success(defaultLoginSuccessMessage);

        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      fetchCaptcha();
      setUserLoginState(msg);

    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      fetchCaptcha();
      message.error(defaultLoginFailureMessage);
    }
  };

  const { code, message: errorMessage } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <div className={styles.loginForm} >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="WuKong Admin"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={'account'}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录'
                })
              }
            ]}
          />
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <Flex justify='space-between' gap="middle">
              <ProFormText
                name="captcha"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="请输入验证码！"
                      />
                    ),
                  },
                ]}
              />
              <img src={`data:image/png;base64,${captcha}`} onClick={fetchCaptcha} className={styles.captcha} />
            </Flex>
          </>
          {code === 1 && <LoginMessage content={errorMessage || '登录失败,请重试'} />}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
