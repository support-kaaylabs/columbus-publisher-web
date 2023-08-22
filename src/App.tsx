
import React, { type FC, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.scss';
import { Button, Col, Layout, Menu, Row } from 'antd';
import headerIcon from '../src/assets/Icon feather-menu.svg';
import { modules } from './shared/ModuleHelper';
import Logo from '../src/assets/columbusbig.png';
import MiniLogo from '../src/assets/columbussmall.png';
import menuBack from '../src/assets/Group 56840.svg';
import group from '../src/assets/group.png';
import notification from '../src/assets/Group 56754.svg';
import selectedDot from '../src/assets/Ellipse 16.svg';
import UnSelectedDot from '../src/assets/Ellipse 17.svg';
import LoginPage from './components/loginPage';
import Signup from './components/loginPage/signup';
import { LogoutOutlined } from '@ant-design/icons';
import DashboardPage from './components/dashboardPage';
import ResetPassword from './components/loginPage/resetPassword';
import { differenceBy, get } from 'lodash';
import BenchMarking from  '../src/components/benchMarking/benchMarking';
import Management from  '../src/components/selections/management';
import Matrics from  '../src/components/selections/matrics';
import Analysis from  '../src/components/selections/analysis';
import ShoutOut from  '../src/components/shoutOut/shoutout';
import KnowledgeHub from  '../src/components/knowledgeHub/knowledgeHub';
import Profile from  '../src/components/settings/profile';
import Subscription from  '../src/components/settings/subscription';
import Support from  '../src/components/support/support';


const { Sider, Content, Header } = Layout;

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<any>(window.location.pathname);
  const [openKey, setOpenKey] = useState<any>([]);
  const [subMenuKey, setSubMenuKey] = useState<string>('');
  
  const navigate = useNavigate();
  useEffect(()=>{
    setActiveKey(window.location.pathname);
  },[window.location.pathname, collapsed]);

  const onSelectMenu = (key: any) => {
    setActiveKey(key);
    setSubMenuKey('');
    if(key.keyPath.length<2){
      setOpenKey([]);
    }
    navigate(key.key);
  };
  const onOpenChange = (key:any) =>{
    const diffKey = differenceBy(key,openKey);
    if(!collapsed){
      setActiveKey('');
    }
    setOpenKey(diffKey);
    if(diffKey.length){
      const keys= get(diffKey, '[0]','');
      setSubMenuKey(keys);
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
  return (
    <>
      {loginId === 'true' && (
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
                      className={((subMenuKey === module.key)) ? 'submenu-active':''}
                      key={module.key}
                      title={module.Module_Name}
                      icon={<img src={module.icon} alt={module.name}
                        className={activeKey === module.key ? 'subimage-bright' : 'subimage-dim'} />}
                    >
                      {module.submenu.map((subModule) => (
                        <Menu.Item key={subModule.key}>
                          <div>
                            <div className={activeKey === subModule.key ? 'selected-line' : 'unselected-line'}></div>
                            {activeKey === subModule.key ? (<img src={selectedDot} className='selected-dot' />) : (<img src={UnSelectedDot} className='unselected-dot' />)}
                            {/* </div> */}
                            <Link to={subModule.to} />
                            <span className={activeKey === subModule.key ? 'selected-submenu' : 'unselected-submenu'}>{subModule.name}</span>
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={module.key} icon={<img src={module.icon} className={activeKey === module.key ? 'image-bright' : 'image-dim'} alt={module.name} />}>
                      <Link to={module.to} />
                      <span className={activeKey === module.key ? 'title-bright' : 'title-dim'}>{module.Module_Name}</span>
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
                  <Col span={18}>
                    <Button className='back-Button'>
                      {collapsed? (<img src={menuBack} alt='menu-back' />):(<img src={headerIcon} alt='menu-back' />)}</Button>
                  </Col>
                  <Col span={6}>
                    <div className='col-div'>
                      <Col span={4}><img className='group-Button' src={group} alt='group' /></Col>
                      <Col span={4}><img className='notification-Button' src={notification} alt='notification' /></Col>
                      <Col span={5}><img src={notification} alt='notification' /></Col>
                    </div>
                  </Col>
                </Row>
              </Header>
            )}
            <div className='spin-Loading'>
              <Content>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage collapsed={collapsed} />} />
                  <Route path="/benchmarking" element={<BenchMarking/>} />
                  <Route path="/management" element={<Management/>} />
                  <Route path="/matrics" element={<Matrics/>} />
                  <Route path="/analysis" element={<Analysis/>} />
                  <Route path="/shoutout" element={<ShoutOut/>} />
                  <Route path="/knowledgeHub" element={<KnowledgeHub/>} />
                  <Route path="/support" element={<Support/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/subscription" element={<Subscription/>} />
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
          <Route path="/reset-password/:id" element={<ResetPassword signupPageValidation={false} forgotPageValidation={false} />} />
        </Routes>
      )}
    </>
  );
};

export default App;
