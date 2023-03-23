import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Routes, Route, Link, Router } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menus = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
      to: '/dashboard',
      name: 'Dashboard',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
      to: '/dashboard',
      name: 'Products',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
      to: '/dashboard',
      name: 'Insights',
    },
  ];

  return (
    <Layout>
      <Sider trigger={true} collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {menus.map((item, index) => (
            <Menu.Item key={index}>
              <Link to={item.to}></Link>
              <span>
                {item.icon} &nbsp; &nbsp;{item.name}
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
