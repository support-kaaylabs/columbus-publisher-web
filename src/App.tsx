import React, { type FC, useState, useEffect, useRef } from 'react';
import Logo from './components/Images/logoImgSmall.png';
import MenuLogo from './components/Images/bottomLogoImg.png';
import LogoSymbolLarge from './components/Images/logoSymbolLarge.png';
import LogoSymbolSmall from './components/Images/logoSymbolSmall.png';
import CloseIcon from './components/Images/closeIconSmall.png';
import Notification from './components/Images/notificationIconSmall.png';
import MenuIcon from './components/Images/menuIconSmall.png';
import HeaderLogo from './components/Images/EllipseIconSmall.png';
import './App.scss';
import Dashboard from './pages/Dashboard';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';
import { updateUserInfo } from './shared/urlHelper';
import { Layout, Menu, Popover } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  AlertOutlined,
  WalletOutlined,
  AppstoreOutlined,
  CustomerServiceOutlined,
  DeliveredProcedureOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const ref = useRef<HTMLHeadingElement>(null);
  const contentWidth = ref.current?.clientWidth || 0;
  const navigate = useNavigate();
  const [openLogo, setOpenLogo] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (contentWidth > -1 && contentWidth < 1000) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [contentWidth]);

  const hideLogo = () => {
    setOpenLogo(false);
  };
  const hideNotification = () => {
    setOpenNotification(false);
  };
  const handleOpenLogo = (newOpen: boolean) => {
    setOpenLogo(newOpen);
  };
  const handleOpenNotification = (newOpen: boolean) => {
    setOpenNotification(newOpen);
  };

  const logoutClick = () => {
    const userId: any = localStorage.getItem('User_ID');
    const params = {
      Device_ID: null,
    };

    updateUserInfo(userId, params).then((res) => {
      if (res.success) {
        localStorage.clear();
        window.location.href = '/';
      }
    });
  };

  const userID: any = localStorage.getItem('User_ID');
  useEffect(() => {
    if (userID == null || userID == undefined) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const route = window.location.href;
    setName(route.split('/')[3].toUpperCase() || '');
  }, [name]);

  return (
    <Layout className="header" style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        className="headerSider"
        width="281px"
      >
        <div className="headerSiderLogo">
          <div className="siderLogoHead">
            {collapsed ? (
              <img src={LogoSymbolLarge} alt="LogoSymbol" />
            ) : (
              <img src={Logo} alt="JINGLS" />
            )}
          </div>
        </div>
        <div className="siderMenu">
          <div>
            <Menu
              defaultSelectedKeys={[name]}
              className="siderMenuItem"
              mode="inline"
            >
              <nav>
                {collapsed ? (
                  <>
                    <Menu.Item
                      key="PRODUCT"
                      title="PRODUCT"
                      className={name === 'PRODUCT' ? 'activeMenu' : ' '}
                      onClick={() => setName('PRODUCT')}
                    >
                      <Link to="product">
                        <span>
                          <DeliveredProcedureOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="DASHBOARD"
                      title="DASHBOARD"
                      className={name === 'DASHBOARD' ? 'activeMenu' : ''}
                      onClick={() => setName('DASHBOARD')}
                    >
                      <Link to="dashboard">
                        <span>
                          <AppstoreOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="INSIGHTS"
                      title="INSIGHT"
                      className={name === 'INSIGHTS' ? 'activeMenu' : ''}
                      onClick={() => setName('INSIGHTS')}
                    >
                      <Link to="insight">
                        <span>
                          <AlertOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="WALLET"
                      title="WALLET"
                      className={name === 'WALLET' ? 'activeMenu' : ''}
                      onClick={() => setName('WALLET')}
                    >
                      <Link to="wallet">
                        <span>
                          <WalletOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    <div style={{ marginTop: 'auto' }}>
                      <Menu.Item
                        key="SETTING"
                        title="SETTING"
                        className={name === 'SETTING' ? 'activeMenu' : ''}
                        onClick={() => setName('SETTING')}
                      >
                        <Link to="setting">
                          <span>
                            <SettingOutlined />
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="HELP"
                        title="HELP"
                        className={name === 'HELP' ? 'activeMenu' : ''}
                        onClick={() => setName('HELP')}
                      >
                        <Link to="help">
                          <span>
                            <CustomerServiceOutlined />
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="LOGOUT"
                        className="logout"
                        onClick={() => logoutClick}
                      >
                        <Link to="/">
                          <span>
                            <LogoutOutlined />
                          </span>
                        </Link>
                      </Menu.Item>
                    </div>
                  </>
                ) : (
                  <>
                    <Menu.Item
                      key="PRODUCT"
                      className={name === 'PRODUCT' ? 'activeMenu' : ' '}
                      onClick={() => setName('PRODUCT')}
                    >
                      <Link to="product">
                        <span className="menuStyle">
                          <DeliveredProcedureOutlined />
                          PRODUCT
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="DASHBOARD"
                      className={name === 'DASHBOARD' ? 'activeMenu' : ' '}
                      onClick={() => setName('DASHBOARD')}
                    >
                      <Link to="dashboard">
                        <span className="menuStyle">
                          <AppstoreOutlined />
                          DASHBOARD
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="INSIGHTS"
                      className={name === 'INSIGHTS' ? 'activeMenu' : ' '}
                      onClick={() => setName('INSIGHTS')}
                    >
                      <Link to="insights">
                        <span className="menuStyle">
                          <AlertOutlined />
                          INSIGHTS
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="WALLET"
                      className={name === 'WALLET' ? 'activeMenu' : ' '}
                      onClick={() => setName('WALLET')}
                    >
                      <Link to="wallet">
                        <span className="menuStyle">
                          <WalletOutlined />
                          WALLET
                        </span>
                      </Link>
                    </Menu.Item>
                    <div style={{ marginTop: '260px' }}>
                      <Menu.Item
                        key="SETTING"
                        className={name === 'SETTING' ? 'activeMenu' : ' '}
                        onClick={() => setName('SETTING')}
                      >
                        <Link to="setting">
                          <span className="menuStyle">
                            <SettingOutlined />
                            SETTING
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="HELP"
                        className={name === 'HELP' ? 'activeMenu' : ' '}
                        onClick={() => setName('HELP')}
                      >
                        <Link to="help">
                          <span className="menuStyle">
                            <CustomerServiceOutlined />
                            HELP
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="LOGOUT"
                        className="logout"
                        onClick={() => logoutClick}
                      >
                        <Link to="/">
                          <span className="menuStyle">
                            <LogoutOutlined />
                            LOGOUT
                          </span>
                        </Link>
                      </Menu.Item>
                    </div>
                  </>
                )}
              </nav>
            </Menu>
            <div className="menuItem">
              <div className="menuLogoItem">
                {collapsed ? (
                  <img src={LogoSymbolSmall} alt="LogoSymbol" />
                ) : (
                  <img src={MenuLogo} alt="JINGLS" />
                )}
                <p>{collapsed ? 'V1.0' : 'Publisher App version 1.0'}</p>
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className="layoutRight">
        <Header className="headerContent">
          <span>
            <span
              onClick={() => setCollapsed(!collapsed)}
              className="headerContentIcon"
            >
              {collapsed ? (
                <img src={CloseIcon} alt="closeicon" />
              ) : (
                <img src={MenuIcon} alt="MenuIcon" />
              )}
            </span>
            <span className="headerContentName">{name}</span>
          </span>
          <span className="headerContentLogo">
            <div className="notification">
              <Popover
                content={
                  <a onClick={hideNotification}>
                    <p>Your order is received</p>
                    <p>Your Order is received</p>
                  </a>
                }
                title="Today"
                trigger="click"
                open={openNotification}
                onOpenChange={handleOpenNotification}
              >
                <img src={Notification} alt="Notification" />
              </Popover>
            </div>
            <div className="imageLogo">
              <Popover
                content={
                  <a onClick={hideLogo}>
                    <LogoutOutlined />
                    &nbsp;Logout
                  </a>
                }
                title="D'Souza Genilia"
                trigger="click"
                open={openLogo}
                onOpenChange={handleOpenLogo}
              >
                <img src={HeaderLogo} alt="ImageLogo" />
              </Popover>
            </div>
          </span>
        </Header>
        <Content className="content" ref={ref}>
          <Routes>
            <Route path="product" element={<ProductList />} />
            <Route path="/:dashboard" element={<Dashboard />} />
            <Route path="product/:slug" element={<ProductDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
