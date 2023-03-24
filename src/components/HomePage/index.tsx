import React, { useState } from 'react';
import Logo from './Images/logoImgLarge.png';
import LogoSymbol from './Images/logoSymbol.svg';
import classes from './index.module.scss';
import Image from './Images/photo.jpg';
import CloseIcon from './Images/closeIconSmall.png';
import MenuIcon from './Images/menuIconSmall.png';

import {
  SettingOutlined,
  AlertOutlined,
  DeliveredProcedureOutlined,
  BellOutlined,
  AppstoreOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={classes.header}>
      <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className={classes.header_sider}>
        <div className={classes.sider_logo_head}>
          <div className={classes.sider_logo}>
            {collapsed ? <img src={LogoSymbol} alt='LogoSymbol' /> : <img src={Logo} alt='JINGLS' />}
          </div>
        </div>
        <div className={classes.sider_menu}>
          <Menu
            className={classes.sider_menuItem}
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <DeliveredProcedureOutlined />,
                label: 'PRODUCT',
              },
              {
                key: '2',
                icon: <AppstoreOutlined />,
                label: 'DASH BOARD',
              },
              {
                key: '3',
                icon: <AlertOutlined />,
                label: 'INSIGHTS',
              },
              {
                key: '4',
                icon: <WalletOutlined />,
                label: 'WALLET',
              },
              {
                key: '5',
                icon: <SettingOutlined />,
                label: 'SETTING',
              },
              {
                key: '6',
                icon: <CustomerServiceOutlined />,
                label: 'HELP',
              }
            ]}
          />
        </div>
      </Sider>
      <Layout className={classes.layoutRight}>
        <Header className={classes.header_content}>
          <span onClick={() => setCollapsed(!(collapsed))} className={classes.header_content_icon}>
            {collapsed ? <img src={CloseIcon} alt='closeicon' /> : <img src={MenuIcon} alt='MenuIcon' />}
          </span>
          <span className={classes.header_content_name}>Product</span>
          <span>
            <div className={classes.notification}>
              <BellOutlined />
              <div className={classes.notificationCount} />
            </div>
          </span>
          <span>
            <div className={classes.imageLogo}>
              <img src={Image} alt='image1' />
            </div>
          </span>


        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;