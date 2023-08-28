
import React, { type FC, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.scss';
import './index.scss';
import { Button, Col, Layout, Menu, Row, Drawer } from 'antd';
import headerIcon from '../src/assets/Icon feather-menu.svg';
import { modules } from './shared/ModuleHelper';
import Logo from '../src/assets/columbusbig.png';
import MiniLogo from '../src/assets/columbussmall.png';
import menuBack from '../src/assets/Group 56840.svg';
// import group from '../src/assets/group.png';
// import notification from '../src/assets/Group 56754.svg';
import selectedDot from '../src/assets/Ellipse 16.svg';
import UnSelectedDot from '../src/assets/Ellipse 17.svg';
import LoginPage from './components/loginPage';
import Signup from './components/loginPage/signup';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardPage from './components/dashboardPage';
import ResetPassword from './components/loginPage/resetPassword';
import { differenceBy, get } from 'lodash';
import BenchMarking from '../src/components/benchMarking/benchMarking';
import Management from '../src/components/selections/management';
import Matrics from '../src/components/selections/matrics';
import Analysis from '../src/components/selections/analysis';
import ShoutOut from '../src/components/shoutOut/shoutout';
import KnowledgeHub from '../src/components/knowledgeHub/knowledgeHub';
import Profile from '../src/components/settings/profile';
import Subscription from '../src/components/settings/subscription';
import Support from '../src/components/support/support';
import defaultUser from './components/columbusImages/defaultUser.png';


const { Sider, Content, Header } = Layout;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<any>(window.location.pathname);
  const [openKey, setOpenKey] = useState<any>([]);
  const [subMenuKey, setSubMenuKey] = useState<string>('');
  const [open, setOpen] = useState(false);
  const userProfile: string | null = `${window.localStorage.getItem('Image')}`;
  const imageUrl = userProfile === 'null' ? defaultUser : userProfile;
  const userName: string | null = window.localStorage.getItem('User_Name');
  const navigate = useNavigate();
  useEffect(() => {
    setActiveKey(window.location.pathname);
  }, [window.location.pathname, collapsed]);

  const onSelectMenu = (key: any) => {
    setActiveKey(window.location.pathname);
    if (key.keyPath.length < 2) {
      setOpenKey([]);
    }
    if (key.keyPath.length <= 1) {
      setSubMenuKey('');
    }
    navigate(key.key);
    setOpen(false);
  };
  const onOpenChange = (key: any) => {
    const diffKey = differenceBy(key, openKey);
    setOpenKey(diffKey);
    if (diffKey.length > 0) {
      const keys = get(diffKey, '[0]', '');
      setSubMenuKey(keys);
      if (!collapsed && !subMenuKey) {
        setActiveKey('');
      }
    }
  };

  const logoutClick = () => {
    const keysToRemove = ['Phone_Number', 'User_Email', 'User_Name', 'User_ID', 'User_Uid', 'User_Type', 'Image', 'token', 'Store_Nme', 'publisherLogin', 'menu_collapse', 'Login'];
    keysToRemove.forEach(k =>
      localStorage.removeItem(k));
    window.location.href = '/';
  };

  const onCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const loginId = localStorage.getItem('Login');
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const mobileMenuCollapsed = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {loginId === 'true' && (
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <Layout>
              <Sider
                className='sider-layout'
                trigger={null}
                collapsible
                collapsedWidth={50}
                collapsed={collapsed}
              >
                <div className='logoss' onClick={() => onCollapsedChange()}>
                  <div>
                    <img src={!collapsed ? Logo : MiniLogo} alt='ColumbusLogo' className={!collapsed ? 'logoC' : 'logoColumbus'} />
                  </div>
                </div>
                <Menu
                  mode="inline"
                  selectedKeys={activeKey}
                  defaultSelectedKeys={['/dashboard']}
                  activeKey={activeKey}
                  onClick={onSelectMenu}
                  theme='dark'
                  openKeys={openKey}
                  onOpenChange={onOpenChange}
                  className={!collapsed ? 'side-menu' : 'side-menu-collapsed'}
                >
                  {modules.map((module) => {
                    if (module.submenu) {
                      return (
                        <Menu.SubMenu
                          className={((subMenuKey === module.key)) ? 'submenu-active' : ''}
                          key={module.key}
                          title={module.Module_Name}
                          icon={<img src={module.icon} alt={module.name} className='menu-icon' />}
                        >
                          {module.submenu.map((subModule) => (
                            <Menu.Item key={subModule.key}>
                              <div>
                                {!collapsed && (
                                  <div>
                                    <div className={activeKey === subModule.key ? 'selected-line' : 'unselected-line'}></div>
                                    {activeKey === subModule.key ? (<img src={selectedDot} className='selected-dot' alt='select-dot' />) : (<img src={UnSelectedDot} className='unselected-dot' alt='un-select-dot' />)}
                                  </div>
                                )}
                                <Link to={subModule.to} />
                                <span>{subModule.name}</span>
                              </div>
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      );
                    } else {
                      return (
                        <Menu.Item
                          key={module.key}
                          icon={<img src={module.icon} alt={module.name} className='menu-icon' />}
                        >
                          <Link to={module.to} />
                          <span >{module.Module_Name}</span>
                        </Menu.Item>
                      );
                    }
                  })}
                  {!collapsed && (
                    <div className='logout-div'>
                      <div><LogoutOutlined /></div>
                      <div className='logout' onClick={logoutClick}>Logout</div>
                    </div>
                  )}
                </Menu>
              </Sider>
              <Layout className='main-layout'>
                <Header className='header'>
                  <Row>
                    <Col span={9} className='col-div1'>
                      <Button className='back-Button' onClick={toggleCollapsed}>
                        {collapsed ? (<img src={menuBack} alt='menu-back' />) : (<img src={headerIcon} alt='header-icon' />)}</Button>
                    </Col>
                    <Col span={12} className='col-div'>
                      <Col className='user-name'><p>{userName}</p></Col>
                      <Col className='img-Button'><img src={imageUrl} alt='user-image' className='img-avatar' /></Col>
                    </Col>
                  </Row>
                </Header>
                <div className='spin-Loading'>
                  <Content>
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage collapsed={collapsed} />} />
                      <Route path="/benchmarking" element={<BenchMarking />} />
                      <Route path="/management" element={<Management />} />
                      <Route path="/matrics" element={<Matrics />} />
                      <Route path="/analysis" element={<Analysis />} />
                      <Route path="/shoutout" element={<ShoutOut />} />
                      <Route path="/knowledgeHub" element={<KnowledgeHub />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
                    </Routes>
                  </Content>
                </div>
              </Layout>
            </Layout>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0}>
            <Layout className='mobile-layout'>
              <Drawer placement="left" open={open} onClose={onClose} width={207}>
                <div className='logoss' onClick={onClose}>
                  <div>
                    <img src={!collapsed ? Logo : MiniLogo} alt='ColumbusLogo' className={!collapsed ? 'logoC' : 'logoColumbus'} />
                  </div>
                </div>
                <Menu
                  mode="inline"
                  selectedKeys={activeKey}
                  defaultSelectedKeys={['/dashboard']}
                  activeKey={activeKey}
                  onClick={onSelectMenu}
                  theme='dark'
                  openKeys={openKey}
                  onOpenChange={onOpenChange}
                  className={!collapsed ? 'side-menu' : 'side-menu-collapsed'}
                >
                  {modules.map((module) => {
                    if (module.submenu) {
                      return (
                        <Menu.SubMenu
                          className={((subMenuKey === module.key)) ? 'submenu-active' : ''}
                          key={module.key}
                          title={module.Module_Name}
                          icon={<img src={module.icon} alt={module.name} className='menu-icon' />}
                        >
                          {module.submenu.map((subModule) => (
                            <Menu.Item key={subModule.key}>
                              <div>
                                {!collapsed && (
                                  <div>
                                    <div className={activeKey === subModule.key ? 'selected-line' : 'unselected-line'}></div>
                                    {activeKey === subModule.key ? (<img src={selectedDot} className='selected-dot' alt='select-dot' />) : (<img src={UnSelectedDot} className='unselected-dot' alt='un-select-dot' />)}
                                  </div>
                                )}
                                <Link to={subModule.to} />
                                <span>{subModule.name}</span>
                              </div>
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      );
                    } else {
                      return (
                        <Menu.Item
                          key={module.key}
                          icon={<img src={module.icon} alt={module.name} className='menu-icon' />}
                        >
                          <Link to={module.to} />
                          <span >{module.Module_Name}</span>
                        </Menu.Item>
                      );
                    }
                  })}
                  {!collapsed && (
                    <div className='logout-div'>
                      <div><LogoutOutlined /></div>
                      <div className='logout' onClick={logoutClick}>Logout</div>
                    </div>
                  )}
                </Menu>
              </Drawer>
              <Header className='mobile-header'>
                <Button className='back-Button' onClick={mobileMenuCollapsed}>
                  <img src={headerIcon} alt='header-icon' />
                </Button>
                <div className='img-Button'>
                  <img src={imageUrl} alt='user-image' className='img-avatar' />
                </div>
              </Header>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage collapsed={collapsed} />} />
                <Route path="/benchmarking" element={<BenchMarking />} />
                <Route path="/management" element={<Management />} />
                <Route path="/matrics" element={<Matrics />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/shoutout" element={<ShoutOut />} />
                <Route path="/knowledgeHub" element={<KnowledgeHub />} />
                <Route path="/support" element={<Support />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
              </Routes>
            </Layout>

          </Col>
        </Row >
      )}
      {
        (!loginId) && (
          <Routes>
            <Route path="/" element={<LoginPage signupValidate={false} />} />
            <Route path="/reset-password/:id" element={<ResetPassword signupPageValidation={false} forgotPageValidation={false} />} />
          </Routes>
        )
      }
    </>
  );
};

export default App;
