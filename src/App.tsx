// import { Col, Row, Popover, Dropdown, Layout, Menu } from 'antd';
// import Logo from './components/HomePage/Images/logoSymbolLarge.svg';
// import DefaultUser from './components/Images/defaultUser.png';
// import MenuLogo from './components/HomePage/Images/menuLogo.svg';
// import LogoSymbolLarge from './components/HomePage/Images/logoSymbolLarge.svg';
// import MainLogo from './components/Images/logo.svg';
// import LogoSymbolSmall from './components/HomePage/Images/logoSymbolSmall.svg';
// import CloseIcon from './components/HomePage/Images/closeIconSmall.png';
// import MenuIcon from './components/HomePage/Images/menuIconSmall.png';
// import AvatarLogo from './components/Images/avatar-menu-logo.svg';
// import { ProductIcon, DashboardIcon } from './components/icons/svgIcons';
import Dashboard from './pages/Dashboard';
// import ProductList from './components/Product';
// import ProductDetail from './components/Product/detail';
// import UserProfile from './components/Home/userProfile';
// import type { MenuProps } from 'antd';
// import { updateUserInfo } from './shared/urlHelper';
// const { Header, Sider, Content } = Layout;
import React, { type FC, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.scss';
import { Layout, Menu } from 'antd';
import { modules } from './shared/ModuleHelper';
import _ from 'lodash';
import Logo from '../src/assets/columbusbig.png';
import MiniLogo from '../src/assets/columbussmall.png';
import LoginPage from './components/loginPage';
import Signup from './components/loginPage/signup';
import ForgotPassword from './components/loginPage/ForgotPassword';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menus, setMenus] = useState<any>();
  const [img, setImg] = useState<any>();
  const [openKey, setOpenKey] = useState<any>();
  const [subMenuSelected, setSubMenuSelected] = useState<any>();
  const [subkeySelected, setSubkeySelected] = useState<any>();


  const navigate = useNavigate();

  useEffect(() => {
    const val = _.uniq(_.orderBy(modules, ['sequence']));
    setMenus(val);
  }, []);
  const onSelectMenu = (key: any) => {
    console.log('selected Key', key);
    console.log(key, 'keyeyeyey');
    setSubMenuSelected(key);
    setOpenKey(key);
    setImg(key.key);
    navigate(key.key);
  };

  const onCollapsedChange = (data: any) => {
    setCollapsed(!collapsed);
  };

  const loginId = localStorage.getItem('Login');
  // setLogin(loginId);
  const orderSubMenu = (data: any) => {
    console.log(data, 'datatta');
    return (
      <SubMenu
        key={data.key}
        onTitleClick={onSelectMenu}
        title={
          <span>
            <img src={data.icon} className={img === data.key ? 'subimage-bright' : 'subimage-dim'} />
            <span >{data.Module_Name}</span>
          </span>
        }
      >
        <div className='new-submenu'>
          {data.submenu.map((val: any) => (
            <Menu.Item key={val.key}
            >
              <Link to={val.to}></Link>
              <span className={subkeySelected === val.key ? 'unselected-submenu' : 'selected-submenu'}>{val.name}</span>
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
            <div className='logoss' onClick={() => onCollapsedChange(collapsed)}>
              <div>
                <img src={!collapsed ? Logo : MiniLogo} alt='ColumbusLogo' className={!collapsed ? 'logoC' : 'logoColumbus'} />
              </div>
            </div>
            <Menu
              mode='inline'
              onClick={onSelectMenu}
              selectedKeys={openKey}
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
                        <span>{val.name}</span>
                      </Menu.Item>
                    );
                  } else {
                    return orderSubMenu(val);
                  }
                })}
            </Menu>
          </Sider>
        )}
        <Layout className='main-layout'>
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
