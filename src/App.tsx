import React, { type FC, useState, useContext, useEffect } from 'react';
import Logo from './components/HomePage/Images/logoImgSmall.png';
import DefaultUser from './components/Images/defaultUser.png';
import MenuLogo from './components/HomePage/Images/menuLogo.svg';
import LogoSymbolLarge from './components/HomePage/Images/logoSymbolLarge.svg';
import LogoSymbolSmall from './components/HomePage/Images/logoSymbolSmall.svg';
import CloseIcon from './components/HomePage/Images/closeIconSmall.png';
import MenuIcon from './components/HomePage/Images/menuIconSmall.png';
import './App.scss';
import Dashboard from './pages/Dashboard';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';
import { MyContext } from './components/store/dataStore';
import { Col, Row, Popover } from 'antd';
import UserProfile from './components/Home/userProfile';
import {
  AppstoreOutlined,
  UploadOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { updateUserInfo } from './shared/urlHelper';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<any>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [image, setImage] = useState<any>(DefaultUser);
  const locate = window.location.href;
  const slug = locate.split('/')[3];

  const ctx = useContext(MyContext);

  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className="dashboard"
          onClick={() => ctx.sideBarHandler('DASHBOARD')}
        >
          <Link to="dashboard">
            <span className="menu-style">
              <AppstoreOutlined />
              DASHBOARD
            </span>
          </Link>
        </div>
      ),
      key: '0',
    },
  ];

  const handleOpenChange = () => {
    setOpen(true);
  };

  const changeHandler = () => {
    setOpen(false);
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
    } else {
      setImage(
        localStorage.getItem('Image') === 'null'
          ? DefaultUser
          : localStorage.getItem('Image')
      );
      setName(localStorage.getItem('User_Name'));
    }
  }, []);

  return (
    <Layout className="header">
      <Row>
        <Col sm={0} xs={0} md={5} lg={8} xl={10}>
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            className="header-sider"
            width="281px"
          >
            <span className="header-sider-logo">
              <div className="sider-logo-head">
                {collapsed ? (
                  <img src={LogoSymbolLarge} alt="LogoSymbol" />
                ) : (
                  <img src={Logo} alt="JINGLS" />
                )}
              </div>
            </span>
            <div className="sider-menu">
              <div>
                <Menu className="sider-menu-item" mode="inline">
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
                          className="dashboard"
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
                        {/* <Menu.Item
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
                    </Menu.Item> */}
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
                          className="dashboard"
                          onClick={() => ctx.sideBarHandler('DASHBOARD')}
                        >
                          <Link to="dashboard">
                            <span className="menuStyle">
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
                        {/* <Menu.Item
                      key={7}
                      className={classes.logout}
                      onClick={() => logoutClick}
                    >
                      <Link to="/">
                        <span className="menuStyle">
                          <LogoutOutlined />
                          LOGOUT
                        </span>
                      </Link>
                    </Menu.Item> */}
                      </>
                    )}
                  </nav>
                </Menu>
                <div className="menu-item">
                  <div className="menu-logo-item">
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
        </Col>
      </Row>
      <Layout className="layout-right">
        <Header className="header-content">
          <Row className="header-content-row">
            <Col sm={0} xs={0} md={6} lg={6} className="menu-icon">
              <span
                onClick={() => setCollapsed(!collapsed)}
                className="header-content-icon"
              >
                {collapsed ? (
                  <img src={CloseIcon} alt="closeicon" />
                ) : (
                  <img src={MenuIcon} alt="MenuIcon" />
                )}
              </span>
              <span className="header-content-name">
                {slug === 'myProfile' ? 'MY PROFILE' : slug}
              </span>
            </Col>
            <Col
              sm={3}
              xs={3}
              md={0}
              lg={0}
              xl={0}
              className="header-left-content"
            >
              <span className="header-left">
                <span className="header-logo">
                  <img src={LogoSymbolLarge} alt="Logo-symbol" />
                </span>
                <span className="menu-icon">
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <span className="header-content-icon">
                      <a>
                        <img src={MenuIcon} alt="MenuIcon" />
                      </a>
                    </span>
                  </Dropdown>
                </span>
              </span>
            </Col>
            <Col sm={3} xs={3} md={0} lg={0} xl={0}></Col>
            <Col className="header-right-content">
              <div className="header-user-name">{name}</div>
              <div className="avatar">
                <Popover
                  content={
                    <a onClick={logoutClick} className="logout">
                      <LogoutOutlined /> Logout
                    </a>
                  }
                  title={
                    <Link
                      to="myProfile"
                      onClick={changeHandler}
                      className="profile"
                    >
                      <UploadOutlined /> My Profile
                    </Link>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <img src={image} alt="avatar" className="profile-img" />
                </Popover>
              </div>
            </Col>
          </Row>
        </Header>
        <Content className="content">
          <Routes>
            <Route path="products" element={<ProductList />} />
            <Route path="/:dashboard" element={<Dashboard />} />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route
              path="myProfile"
              element={<UserProfile image={image} setImage={setImage} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
