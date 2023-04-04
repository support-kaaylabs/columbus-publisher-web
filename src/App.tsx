import React, { type FC, useState, useContext, useEffect } from 'react';
import Logo from './components/HomePage/Images/logoImgSmall.png';
import MenuLogo from './components/HomePage/Images/menuLogo.svg';
import LogoSymbolLarge from './components/HomePage/Images/logoSymbolLarge.svg';
import LogoSymbolSmall from './components/HomePage/Images/logoSymbolSmall.svg';
import Image from './components/HomePage/Images/photo.jpg';
import CloseIcon from './components/HomePage/Images/closeIconSmall.png';
import MenuIcon from './components/HomePage/Images/menuIconSmall.png';
import classes from './App.module.scss';
import Dashboard from './pages/Dashboard';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';
import { MyContext } from './components/store/dataStore';
import {
  SettingOutlined,
  AlertOutlined,
  DeliveredProcedureOutlined,
  AppstoreOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,

} from '@ant-design/icons';
import { updateUserInfo } from './shared/urlHelper';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const ctx = useContext(MyContext);

  const navigate = useNavigate();

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


  return (
    <Layout className={classes.header} style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        className={classes.header_sider}
        width="281px"
      >
        <div className={classes.header_sider_logo}>
          <div className={classes.sider_logo_head}>
            {collapsed ? (
              <img src={LogoSymbolLarge} alt="LogoSymbol" />
            ) : (
              <img src={Logo} alt="JINGLS" />
            )}
          </div>
        </div>
        <div className={classes.sider_menu}>
          <div>
            <Menu className={classes.sider_menuItem} mode="inline">
              <nav>
                {collapsed ? (
                  <>
                    {/* <Menu.Item
                      key={1}
                      title="PRODUCT"
                      className={classes.products}
                      onClick={() => ctx.sideBarHandler('PRODUCT')}
                    >
                      <Link to="products">
                        <span>
                          <DeliveredProcedureOutlined />
                        </span>
                      </Link>
                    </Menu.Item> */}
                    <Menu.Item
                      key={2}
                      title="DASHBOARD"
                      className={classes.dashboard}
                      onClick={() => ctx.sideBarHandler('DASHBOARD')}
                    >
                      <Link to="dashboard">
                        <span>
                          <AppstoreOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    {/* <Menu.Item
                      key={3}
                      title="INSIGHT"
                      className={classes.insights}
                      onClick={() => ctx.sideBarHandler('INSIGHT')}
                    >
                      <Link to="insight">
                        <span>
                          <AlertOutlined />
                        </span>
                      </Link>
                    </Menu.Item> */}
                    {/* <Menu.Item
                      key={4}
                      title="WALLET"
                      className={classes.wallet}
                      onClick={() => ctx.sideBarHandler('WALLET')}
                    >
                      <Link to="wallet">
                        <span>
                          <WalletOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key={5}
                      title="SETTING"
                      className={classes.setting}
                      onClick={() => ctx.sideBarHandler('SETTING')}
                    >
                      <Link to="setting">
                        <span>
                          <SettingOutlined />
                        </span>
                      </Link>
                    </Menu.Item> 
                    <Menu.Item
                      key={6}
                      title="HELP"
                      className={classes.help}
                      onClick={() => ctx.sideBarHandler('HELP')}
                    >
                      <Link to="help">
                        <span>
                          <CustomerServiceOutlined />
                        </span>
                      </Link>
                    </Menu.Item>   */}
                    <Menu.Item
                      key={7}
                      title="LOGOUT"
                      className={classes.logout}
                      onClick={() => logoutClick}
                    >
                      <Link to="/">
                        <span>
                          <LogoutOutlined />
                        </span>
                      </Link>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    {/* <Menu.Item
                      key={1}
                      className={classes.products}
                      onClick={() => ctx.sideBarHandler('PRODUCT')}
                    >
                      <Link to="products">
                        <span className='menuStyle'>
                          <DeliveredProcedureOutlined />
                          PRODUCT
                        </span>
                      </Link>
                    </Menu.Item> */}
                    <Menu.Item
                      key={2}
                      className={classes.dashboard}
                      onClick={() => ctx.sideBarHandler('DASHBOARD')}
                    >
                      <Link to="dashboard">
                        <span className='menuStyle'>
                          <AppstoreOutlined />
                          DASHBOARD
                        </span>
                      </Link>
                    </Menu.Item>
                    {/* <Menu.Item
                      key={3}
                      className={classes.insights}
                      onClick={() => ctx.sideBarHandler('INSIGHTS')}
                    >
                      <Link to="insight">
                        <span className='menuStyle'>
                          <AlertOutlined />
                          INSIGHTS
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key={4}
                      className={classes.wallet}
                      onClick={() => ctx.sideBarHandler('WALLET')}
                    >
                      <Link to="wallet">
                        <span className='menuStyle'>
                          <WalletOutlined />
                          WALLET
                        </span>
                      </Link>
                    </Menu.Item> 
                    <Menu.Item
                      key={5}
                      className={classes.setting}
                      onClick={() => ctx.sideBarHandler('SETTING')}
                    >
                      <Link to="setting">
                        <span className='menuStyle'>
                          <SettingOutlined />
                          SETTING
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key={6}
                      className={classes.help}
                      onClick={() => ctx.sideBarHandler('HELP')}
                    >
                      <Link to="help">
                        <span className='menuStyle'>
                          <CustomerServiceOutlined />
                          HELP
                        </span>
                      </Link>
                    </Menu.Item> */}
                    <Menu.Item
                      key={7}
                      className={classes.logout}
                      onClick={() => logoutClick}
                    >
                      <Link to="/">
                        <span className='menuStyle'>
                          <LogoutOutlined />
                          LOGOUT
                        </span>
                      </Link>
                    </Menu.Item>
                  </>
                )}
              </nav>
            </Menu>
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
            <span className={classes.header_content_name}>{ctx.name}</span>
          </span>
        </Header>
        <Content className={classes.content}>
          <Routes>
            <Route path="products" element={<ProductList />} />
            <Route path="/:dashboard" element={<Dashboard />} />
            <Route path="products/:slug" element={<ProductDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
