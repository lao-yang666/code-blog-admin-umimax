/*
 * @Description: 公共页脚版权
 * @Version: 2.0
 * @Author: laoyang
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Yang
 * @LastEditTime: 2023-08-11 16:48:23
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

import styles from './index.module.less'

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} 努力、奋斗`}
      className={styles['global-footer']}
      links={[
        {
          key: '老羊',
          title: '老羊',
          href: 'http://101.43.20.171:9090/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lao-yang666',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
