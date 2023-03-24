import React, { useState } from 'react';
import MenuIcon from './Images/menuIconSmall.png';
import CloseIcon from './Images/closeIconSmall.png';
import Logo from './Images/logoImgSmall.png';
import classes from './index.module.scss';
import Image from './Images/photo.jpg';

import {
  SettingOutlined,
  AlertOutlined,
  DeliveredProcedureOutlined,
  BellOutlined,
  AppstoreOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { MenuProps, Menu, Layout } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('PRODUCT', '1', <DeliveredProcedureOutlined />),
  getItem('DASH BOARD', '2', <AppstoreOutlined />),
  getItem('INSIGHTS', '3', <AlertOutlined />),
  getItem('WALLET', '4', <WalletOutlined />),
  getItem('SETTING', '5', <SettingOutlined />),
  getItem('HELP', '6', <CustomerServiceOutlined />)
];

const { Header } = Layout;
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={classes.homePage}>

      <Header className={classes.homePageHeader}>
        <div className={classes.homePageHeader_head}>

          <div className={classes.homePage_head_logo}>
            <img src={Logo} alt='JINGLS' />
          </div>
          <div className={classes.homePage_head_menuButton}>
            <button onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
              {collapsed ? <img src={CloseIcon} alt='Close' /> : <img src={MenuIcon} alt='Menu' />}
            </button>
          </div>
          <div className={classes.homePage_head_name}>
            <p>PRODUCT</p>
          </div>
        </div>
        <div>
          <div className={classes.menuItem}>
            <div className={classes.notification}>
              <BellOutlined />
              <div className={classes.notificationCount} />
            </div>
            <div className={classes.imageLogo}>
              <img src={Image} alt='image1' />
            </div>
          </div>
        </div>


      </Header>
      <div className={classes.sideBarMenu}>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          className={classes.sideBarMenuItem}
        />
      </div>

    </Layout>
  );
};

export default App;