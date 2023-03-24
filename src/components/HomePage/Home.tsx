import React, { type FC, useState } from 'react';
import classes from './Home.module.scss';
import Image from './Images/photo.jpg';
import {
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AlertOutlined,
  DeliveredProcedureOutlined,
  BellOutlined,
  AppstoreOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const Home: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '100vh', background: '#FFFFFF', boxShadow: '0px 3px 6px #00000029' }}>
        <div className={classes.logo}>      
          <span className={classes.firstLetter}>J</span><span className={classes.lastLetter}>ingls</span>
        </div>  
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DeliveredProcedureOutlined />,
              label: 'PRODUCT'
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
                label: 'WALLET'
            },
            {
                key: '5',
                icon: <CustomerServiceOutlined />,
                label: 'INSIGHTS',
            },
            {
                key: '6',
                icon: <SettingOutlined />,
                label: 'INSIGHTS',
            }

          ]}
        />
      </Sider>
      <Layout className={classes.siteLayout}>
        <Header className={classes.header}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
           <div className={classes.siderChild}>
                <div className={classes.nameOfContent}>
                    <p>Product</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
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
        <Content >
           
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;