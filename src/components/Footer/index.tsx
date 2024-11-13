import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',

      }}
      links={[
        {
          key: 'WuKong',
          title: '悟空教育',
          href: 'https://www.wukongsch.com/zh/',
          blankTarget: true,
        },
      ]}
      copyright={'2024 WuKong Education'}
    />
  );
};

export default Footer;
