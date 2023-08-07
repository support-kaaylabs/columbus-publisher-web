
import Dashboard from './pages/Dashboard';
import React, { type FC, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.scss';
import {Layout, Menu } from 'antd';
import { modules } from './shared/ModuleHelper';
import _ from 'lodash';
import Logo from '../src/assets/columbusbig.png';
import MiniLogo from '../src/assets/columbussmall.png';
// import menuBack from '../src/assets/menuback.png';
// import group from '../src/assets/group.png';
// import notification from '../src/assets/Group 56754.png';
import LoginPage from './components/loginPage';
import Signup from './components/loginPage/signup';
import ForgotPassword from './components/loginPage/ForgotPassword';
import { LogoutOutlined } from '@ant-design/icons';
// import { Header } from 'antd/es/layout/layout';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menus, setMenus] = useState<any>();
  const [img, setImg] = useState<any>(window.location.pathname);
  const [openKey, setOpenKey] = useState<any>();
  const [subkeySelected, setSubkeySelected] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const val = _.uniq(_.orderBy(modules, ['sequence']));
    setMenus(val);
  }, []);
  const onSelectMenu = (key: any) => {
    setSubkeySelected(key.key);
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
  const orderSubMenu = (data: any) => {
    return (
      <SubMenu
        key={data.key}
        onTitleClick={onSelectMenu}
        className='ant-submenu-openn'
        title={
          <span>
            <img src={data.icon} className={img === data.key ? 'subimage-bright' : 'subimage-dim'} />
            <span className={img === data.key ? 'title-bright' : 'title-dim'}>{data.Module_Name}</span>
          </span>
        }
      >
        <div className='new-submenu'>
          {data.submenu.map((val: any) => (
            <Menu.Item key={val.key}
            >
              <Link to={val.name}></Link>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='selected-dot'></div>
                <div>
                  <span className={subkeySelected === val
                    .key ? 'selected-submenu' : 'unselected-submenu'}>{val.name}</span>
                </div>
              </div>
            </Menu.Item>
          ))}
        </div>
      </SubMenu>
    );
  };
  return (
    <>
      <Layout>
        {loginId === 'true' && (
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
            <Menu
              mode='inline'
              onClick={onSelectMenu}
              selectedKeys={openKey}
              defaultSelectedKeys={['/dashboard']}
              theme='dark'
              className={!collapsed ? 'side-menu' : 'side-menu-collapsed'}
            >
              {menus?.length &&
                menus.map((val: any) => {
                  if (!val.submenu?.length) {
                    return (
                      <Menu.Item
                        key={val.key}
                      >
                        <Link to={val.to}></Link>
                        <img src={val.icon} className={img === val.key ? 'image-bright' : 'image-dim'} />
                        <span className={img === val.key ? 'title-bright' : ''}>{val.name}</span>
                      </Menu.Item>
                    );
                  } else {
                    return orderSubMenu(val);
                  }
                })}
              <Menu.Item>
                <div className='logout-div'>
                  <div style={{ opacity: '0.75' }}><LogoutOutlined /></div>
                  <div className='logout' onClick={logoutClick}>Logout</div>
                </div>
              </Menu.Item>
            </Menu>

          </Sider>
        )}
        <Layout className='main-layout'>
          {/* <Header className='header'>
            <Button className='back-Button'><img src={menuBack} /></Button>
            <Button className='group-Button'><img src={group} /></Button>
            <Button className='notification-Button'><img src={notification} /></Button>
            <Button className='img-Button'><img src={notification} /></Button>
          </Header> */}
          <div className='spin-Loading'>
            <Content>
              <Routes>
                <Route path="/" element={<LoginPage signupValidate={false} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </Content>
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
