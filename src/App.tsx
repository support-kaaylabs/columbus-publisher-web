import React, { type FC, useState, useEffect } from 'react';
import Logo from './components/HomePage/Images/logoSymbolLarge.svg';
import DefaultUser from '../src/assets/defaultUser.png';
import MenuLogo from './components/HomePage/Images/menuLogo.svg';
import LogoSymbolLarge from './components/HomePage/Images/logoSymbolLarge.svg';
import MainLogo from '../src/assets/logo.svg';
import LogoSymbolSmall from './components/HomePage/Images/logoSymbolSmall.svg';
import CloseIcon from './components/HomePage/Images/closeIconSmall.png';
import MenuIcon from './components/HomePage/Images/menuIconSmall.png';
import './App.scss';
import AvatarLogo from '../src/assets/avatar-menu-logo.svg';
import { ProductIcon, DashboardIcon } from './components/icons/svgIcons';
import Dashboard from './pages/Dashboard';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';
import { Col, Row, Popover } from 'antd';
import UserProfile from './components/Home/userProfile';
import { updateUserInfo } from './shared/urlHelper';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Signup from './components/loginPage/signup';
import LoginPage from './components/loginPage';
import ResetPassword from './components/loginPage/resetPassword';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const locate = window.location.href;
  const slug = locate.split('/')[3];
  const [name, setName] = useState<any>();
  const [userName, setUserName] = useState<any>();
  const [userEmail, setUserEmail] = useState<any>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [image, setImage] = useState<any>(DefaultUser);
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen((data) => !data);
  };
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          className={name === 'DASHBOARD' ? 'activeMenu' : 'products'}
          onClick={() => setName('DASHBOARD')}
        >
          <Link to="dashboard">
            <span>
              <DashboardIcon
                color={name === 'DASHBOARD' ? '#E53935' : '#222222'}
              />
              DASHBOARD
            </span>
          </Link>
        </div>
      ),
      key: 'dashboard',
    },
    {
      label: (
        <div
          className={name === 'PRODUCT' ? 'activeMenu' : 'products'}
          onClick={() => setName('PRODUCT')}
        >
          <Link to="product">
            <span>
              <ProductIcon color={name === 'PRODUCT' ? '#E53935' : '#222222'} />
              PRODUCT
            </span>
          </Link>
        </div>
      ),
      key: 'product',
    },
  ];

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
  const loginId = localStorage.getItem('Login');

  useEffect(() => {
    if (userID == null || userID == undefined) {
      // navigate('/');
    } else {
      setImage(
        localStorage.getItem('Image') === 'null'
          ? DefaultUser
          : localStorage.getItem('Image')
      );
      setUserName(localStorage.getItem('User_Name'));
      setUserEmail(localStorage.getItem('User_Email'));
      setName(slug.toUpperCase());
    }
  }, [slug]);

  return (
    <>
      {loginId === 'true' && (

        <Layout className="header">
          <Row>
            <Col sm={0} xs={0} md={0} lg={8} xl={10}>
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
                      <img src={Logo} alt="LogoSymbol" className='logo-symbol-small' />
                    ) : (
                      <img src={MainLogo} alt="JINGLS" className='logo-symbol-large' />
                    )}
                  </div>
                </span>
                <div className="sider-menu">
                  <div>
                    <Menu className="sider-menu-item" mode="inline">
                      <nav>
                        {collapsed ? (
                          <>
                            <Menu.Item
                              key="dashboard"
                              title="DASHBOARD"
                              className={
                                name === 'DASHBOARD' ? 'activeMenu' : 'dashboard'
                              }
                              onClick={() => setName('DASHBOARD')}
                            >
                              <Link to="dashboard">
                                <span>
                                  <DashboardIcon
                                    color={
                                      name === 'DASHBOARD' ? '#E53935' : '#222222'
                                    }
                                  />
                                </span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="product"
                              title="PRODUCT"
                              className={
                                name === 'PRODUCT' ? 'activeMenu' : 'products'
                              }
                              onClick={() => setName('PRODUCT')}
                            >
                              <Link to="product">
                                <span>
                                  <ProductIcon
                                    color={
                                      name === 'PRODUCT' ? '#E53935' : '#222222'
                                    }
                                  />
                                </span>
                              </Link>
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item
                              key="dashboard"
                              className={
                                name === 'DASHBOARD' ? 'activeMenu' : 'dashboard'
                              }
                              onClick={() => setName('DASHBOARD')}
                            >
                              <Link to="dashboard">
                                <span>
                                  <DashboardIcon
                                    color={
                                      name === 'DASHBOARD' ? '#E53935' : '#222222'
                                    }
                                  />
                                  DASHBOARD
                                </span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="product"
                              className={
                                name === 'PRODUCT' ? 'activeMenu' : 'products'
                              }
                              onClick={() => setName('PRODUCT')}
                            >
                              <Link to="product">
                                <span>
                                  <ProductIcon
                                    color={
                                      name === 'PRODUCT' ? '#E53935' : '#222222'
                                    }
                                  />
                                  PRODUCT
                                </span>
                              </Link>
                            </Menu.Item>
                          </>
                        )}
                      </nav>
                    </Menu>
                    <div className="menu-item">
                      <div className="menu-logo-item">
                        {collapsed ? (
                          <img src={LogoSymbolSmall} alt="LogoSymbol" className='menu-logo-icon-small' />
                        ) : (
                          <img src={MenuLogo} alt="JINGLS" className='menu-logo-icon-large' />
                        )}
                        {collapsed ? <p className='menu-logo-icon-small'>V1.0</p> : <p className='menu-logo-icon-large'>Publisher App version 1.0</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </Sider>
            </Col>
          </Row>
          {loginId === 'true' && (
            <Layout className="layout-right">
              <Header className="header-content">
                <Row className="header-content-row">
                  <Col sm={0} xs={0} md={0} lg={6} className="menu-icon">
                    <span
                      onClick={() => setCollapsed(!collapsed)}
                      className="header-content-icon"
                    >
                      {collapsed ? (
                        <img src={CloseIcon} alt="closeicon" className='close-icon' />
                      ) : (
                        <img src={MenuIcon} alt="MenuIcon" className='open-icon' />
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
                  <Col
                    sm={0}
                    xs={0}
                    md={3}
                    lg={0}
                    xl={0}
                    className="header-left-content"
                  >
                    <span className="header-left">
                      <span className="header-logo">
                        <img src={MainLogo} alt="Logo-symbol" />
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
                  <Col sm={3} xs={3} md={11} lg={0} xl={0}></Col>
                  <Col className="header-right-content">
                    <div className="header-user-name">{userName}</div>
                    <div className="avatar">
                      <Popover
                        arrow={false}
                        open={open}
                        onOpenChange={handleOpenChange}
                        content={<Row className="avatar-image-contain">
                          <Col sm={8} md={8} lg={8} className="avatar-img">
                            <div className="avatar-img-logo">
                              <div className="profile-head">
                                <div className="profile-logo-img">
                                  <img src={image} alt="avatar" />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col className="avatar-detail" sm={10} md={10} lg={10}>
                            <Row className="avatar-info-icon">
                              <Col className="seller-name">
                                <p className="name">{userName}</p>
                                <p className="email">{userEmail}</p>
                              </Col>
                              <Col
                                className="seller-profile"
                                onClick={handleOpenChange}
                              >
                                <Link to="myProfile" className="my-profile">
                                  MyProfile
                                </Link>
                              </Col>
                            </Row>
                          </Col>
                        </Row>}
                        title={<div className="avatar-title">
                          <img src={AvatarLogo} alt="avatar-logo" />
                          <a onClick={logoutClick} className="logout">
                            Sign out
                          </a>
                        </div>}
                        trigger="click"
                      >
                        <img src={image} alt="avatar" className="profile-img" />
                      </Popover>
                    </div>
                  </Col>
                </Row>
              </Header><Content>
                <Routes>
                  <Route path="product" element={<ProductList />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="myProfile" element={<UserProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
                </Routes>
              </Content>
            </Layout>
          )}

        </Layout>
      )}
      {(!loginId) && (
        <Routes>
          <Route path="/" element={<LoginPage signupValidate={false} />} />
          <Route path="/reset-password/:token/:id" element={<ResetPassword signupPageValidation={false} forgotPageValidation={false}/>} />
        </Routes>
      )}
    </>
  );
};


export default App;
