import React, { useState } from 'react';
import Logo from './Images/logoImgSmall.png';
import MenuLogo from './Images/menuLogo.svg';
import LogoSymbolLarge from './Images/logoSymbolLarge.svg';
import classes from './index.module.scss';
import LogoSymbolSmall from './Images/logoSymbolSmall.svg';
import Image from './Images/photo.jpg';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const logoHandler = () => navigate('/products');

  return (
    <Layout className={classes.header}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={classes.header_sider}
        width="281px"
      >
        <div className={classes.sider_logo_head}>
          <div className={classes.sider_logo}>
            {collapsed ? (
              <img src={LogoSymbolLarge} alt="LogoSymbol" />
            ) : (
              <img src={Logo} alt="JINGLS" />
            )}
          </div>
        </div>
        <div className={classes.sider_menu}>
          <Menu
            className={classes.sider_menuItem}
            onClick={logoHandler}
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
              },
            ]}
          ></Menu>
          <div className={classes.menu_item}>
            <div className={classes.menu_logo_item}>
              {collapsed ? (
                <img src={LogoSymbolSmall} alt="LogoSymbol" />
              ) : (
                <img src={MenuLogo} alt="JINGLS" />
              )}
              <p>{collapsed ? 'V1.0' : 'Publisher App version 1.0'}</p>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className={classes.layoutRight}>
        <Header className={classes.header_content}>
          <span>
            <span
              onClick={() => setCollapsed(!collapsed)}
              className={classes.header_content_icon}
            >
              {collapsed ? (
                <img src={CloseIcon} alt="closeicon" />
              ) : (
                <img src={MenuIcon} alt="MenuIcon" />
              )}
            </span>
            <span className={classes.header_content_name}>Product</span>
          </span>

          <span className={classes.header_content_logo}>
            <div className={classes.notification}>
              <BellOutlined />
              <div className={classes.notificationCount} />
            </div>
            <div className={classes.imageLogo}>
              <img src={Image} alt="image1" />
            </div>
          </span>
        </Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
