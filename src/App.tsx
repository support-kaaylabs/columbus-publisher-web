
// import Dashboard from './pages/Dashboard';
import React, { type FC, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.scss';
import { Button, Col, Layout, Menu, Row } from 'antd';
import { modules } from './shared/ModuleHelper';
import Logo from '../src/assets/columbusbig.png';
import MiniLogo from '../src/assets/columbussmall.png';
import menuBack from '../src/assets/menuback.png';
import group from '../src/assets/group.png';
import notification from '../src/assets/Group 56754.png';
import LoginPage from './components/loginPage';
import Signup from './components/loginPage/signup';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardPage from './components/dashboardPage';
import ResetPassword from './components/loginPage/resetPassword';

const { Sider, Content, Header } = Layout;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [img, setImg] = useState<any>(window.location.pathname);
  const [openKey, setOpenKey] = useState<any>();

  const navigate = useNavigate();

  const onSelectMenu = (key: any) => {
    setOpenKey(key);
    setImg(key.key);
    navigate(key.key);
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
  return (
    <>
      {loginId === 'true' && (
        <Layout>
          <Sider
            className='Sider-Layout'
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
            <Menu mode="inline"
              selectedKeys={openKey}
              defaultSelectedKeys={['/dashboard']}
              onClick={onSelectMenu}
              theme='dark'
              className={!collapsed ? 'side-menu' : 'side-menu-collapsed'}
            >
              {modules.map((module) => {
                if (module.submenu) {
                  return (
                    <Menu.SubMenu
                      className='ant-submenu-openn'
                      key={module.key}
                      title={module.Module_Name}
                      icon={<img src={module.icon} alt={module.name}
                        className={img === module.key ? 'subimage-bright' : 'subimage-dim'} />}
                    >
                      {module.submenu.map((subModule) => (
                        <Menu.Item key={subModule.key}>
                          <div>
                            <div className={img === subModule.key ? 'selected-dot' : 'unselected-dot'}></div>
                            <Link to={subModule.to} />
                            <span className={img === subModule.key ? 'selected-submenu' : 'unselected-submenu'}>{subModule.name}</span>
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={module.key} icon={<img src={module.icon} className={img === module.key ? 'image-bright' : 'image-dim'} alt={module.name} />}>
                      <Link to={module.to} />
                      <span className={img === module.key ? 'title-bright' : 'title-dim'}>{module.Module_Name}</span>
                    </Menu.Item>
                  );
                }
              })}
              <div className='logout-div'>
                <div style={{ opacity: '1' }}><LogoutOutlined /></div>
                <div className='logout' onClick={logoutClick}>Logout</div>
              </div>
            </Menu>
          </Sider>
          <Layout className='main-layout'>
            {loginId === 'true' && (
              <Header className='header'>
                <Row>
                  <Col span={17}>
                    <Button className='back-Button'><img src={menuBack} alt='menu-back' /></Button>
                  </Col>
                  <Col span={7}>
                    <Button className='group-Button'><img src={group} alt='group' /></Button>
                    <Button className='notification-Button'><img src={notification} alt='notification' /></Button>
                    <Button className='img-Button'><img src={notification} alt='notification' /></Button>
                  </Col>
                </Row>
              </Header>
            )}
            <div className='spin-Loading'>
              <Content>
                <Routes>
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                  <Route path="/dashboard" element={<DashboardPage collapsed={collapsed} />} />
                  <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
                </Routes>
              </Content>
            </div>
          </Layout>
        </Layout>
      )}
      {(!loginId) && (
        <Routes>
          <Route path="/" element={<LoginPage signupValidate={false} />} />
          <Route path="/reset-password/:id" element={<ResetPassword signupPageValidation={false} forgotPageValidation={false}/>} />
        </Routes>
      )}
    </>
  );
};

export default App;
