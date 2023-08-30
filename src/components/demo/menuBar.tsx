import React, { useState, useEffect } from 'react';
import './menuBar.scss';
import { Link, Routes, Route, useNavigate} from 'react-router-dom';
import { Layout, Menu, Button, Card, Col, Row, Dropdown } from 'antd';
import DashboardIcon from '../columbusImages/dashboard-icon.svg';
import BenchMarkingIcon from '../columbusImages/benchmarking-icon.svg';
import SelectionIcon from '../columbusImages/selections-icon.svg';
import ShoutoutIcon from '../columbusImages/shoutout-icon.svg';
import KnowledgeHubIcon from '../columbusImages/knowledge-icon.svg';
import SettingsIcon from '../columbusImages/settings-icon.svg';
import SupportIcon from '../columbusImages/support-icon.svg';
import MenuBarBigLogo from '../columbusImages/menubar-Big-Logo.svg';
import MenuBarSmallLogo from '../columbusImages/menuBar-Small-Logo.svg';
import HeaderMenuIcon from '../columbusImages/header-menu-icon.svg';
import HeaderBackIcon from '../columbusImages/header-back-icon.svg';
import SelectionDot from '../columbusImages/selections-select-dot';
import SettingDot from '../columbusImages/setting-select-dot';
import DashboardPage from '../dashboardPage/index';
import BenchMarking from '../benchMarking/benchMarking';
import Management from '../selections/management';
import Matrics from '../selections/matrics';
import Analysis from '../selections/analysis';
import ShoutOut from '../shoutOut/shoutout';
import KnowledgeHub from '../knowledgeHub/knowledgeHub';
import Profile from '../settings/profile';
import Subscription from '../settings/subscription';
import Support from '../support/support';
import Signup from '../loginPage/signup';
import DarkCLogo from '../../assets/Smaller Logo Dark BG.svg';
import defaultUser from '../../assets/defaultUser.png';



const { Header, Sider, Content } = Layout;

const MenuBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [image, setImage] = useState('');
  const [updateImage, setUpdateImage] = useState<number>(0);
  const navigate = useNavigate();
  const userName: string | null = window.localStorage.getItem('User_Name');
  const userEmail: string | null = window.localStorage.getItem('User_Email');

  useEffect(()=>{
    const userProfile: string | null = `${window.localStorage.getItem('Image')}`;
    const imageUrl = userProfile === 'null' ? defaultUser : userProfile;
    setImage(imageUrl);
  }, [updateImage]);

  const imageUpdate = ()=>{
    setUpdateImage(updateImage + 1);
  };

  const logoutClick = () => {
    const keysToRemove = ['Phone_Number', 'User_Email', 'User_Name', 'User_ID', 'User_Uid', 'User_Type', 'Image', 'token', 'Store_Nme', 'publisherLogin', 'menu_collapse', 'Login'];
    keysToRemove.forEach(k =>
      localStorage.removeItem(k));
    window.location.href = '/';
  };

  const myProfileClick = ()=>{
    navigate('/profile');
  };
  const menu = (
    <Card className='profile-card' title={<img src={DarkCLogo} />} extra={<a onClick={logoutClick}>Sign out</a>}>
      <Row>
        <Col className='image-col'>
          <img src={image} />
        </Col>
        <Col className='user-col'>
          <div className='user-div'>
            <div className='user-name'>{userName}</div>
            <div className='user-email'>{userEmail}</div>
            <div className='user-button-div'>
              <a onClick={myProfileClick}>My Profile</a>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );

  const handleDropdownVisibleChange = () => {
    setDropdownVisible(false);
  };

  return (
    <Layout className='menubar-layout-web'>
      <Sider trigger={null} collapsible collapsed={collapsed} className={collapsed ? 'menubar-layout-sider-collapsed' : 'menubar-layout-sider'}>
        <div className='menubar-layout-sider-logo' onClick={() => setCollapsed(res => !res)}><img src={collapsed ? MenuBarSmallLogo : MenuBarBigLogo} alt='menubar-Logo-icon' /></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className='menubar-sider-menu'
        >
          <Menu.Item
            key='1'
            icon={<img src={DashboardIcon} alt='dashboard-icon' className='menuBar-icons' />}
            onClick={() => setDropdownSelected('Dashboard')}
          >
            <Link to='/dashboard' />
            Dashboard
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<img src={BenchMarkingIcon} alt='benchmarking-icon' className='menuBar-icons' />}
            onClick={() => setDropdownSelected('Benchmarking')}
          >
            <Link to='/benchmarking' />
            Benchmarking
          </Menu.Item>
          <Menu.SubMenu title='Selections' icon={<img src={SelectionIcon} alt='selections-icon' className='menuBar-icons' />}>
            <Menu.Item
              key='3'
              onClick={() => setDropdownSelected('Management')}
            >
              <Link to='/management' />
              Management
            </Menu.Item>
            <Menu.Item
              key='4'
              onClick={() => setDropdownSelected('Metrics')}
            >
              <Link to='/metrics' />
              Metrics
            </Menu.Item>
            <Menu.Item
              key='5'
              onClick={() => setDropdownSelected('Analysis')}
            >
              <Link to='/analysis' />
              Analysis
            </Menu.Item>
            {!collapsed && <div className='select-border'><SelectionDot dropdownSelected={dropdownSelected} /></div>}
          </Menu.SubMenu>
          <Menu.Item
            key='6'
            icon={<img src={ShoutoutIcon} alt='shoutout-icon' className='menuBar-icons' />}
            onClick={() => setDropdownSelected('Shoutout')}
          >
            <Link to='/shoutout' />
            Shoutout
          </Menu.Item>
          <Menu.Item
            key='7'
            icon={<img src={KnowledgeHubIcon} alt='knowledgeHub-icon' className='menuBar-icons' />}
            onClick={() => setDropdownSelected('KnowledgeHug')}
          >
            <Link to='/knowledgeHub' />
            Knowledge Hub
          </Menu.Item>
          <Menu.SubMenu title='Settings' icon={<img src={SettingsIcon} alt='settings-icon' className='menuBar-icons' />}>
            <Menu.Item
              key='8'
              onClick={() => setDropdownSelected('Profile')}
            >
              <Link to='/profile' />
              Profile
            </Menu.Item>
            <Menu.Item
              key='9'
              onClick={() => setDropdownSelected('Subscription')}
            >
              <Link to='/subscription' />
              Subscription
            </Menu.Item>
            {!collapsed && <div className='select-border'><SettingDot dropdownSelected={dropdownSelected} /></div>}
          </Menu.SubMenu>
          <Menu.Item
            key='10'
            icon={<img src={SupportIcon} alt='support-icon' className='menuBar-icons' />}
            onClick={() => setDropdownSelected('Support')}
          >
            <Link to='/support' />
            Support
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='menubar-layout-sub-layout'>
        <Header className={collapsed ? 'menubar-laybout-sub-layout-header-collapsed' : 'menubar-laybout-sub-layout-header'}>
          <Button
            type="text"
            icon={collapsed ? <img src={HeaderBackIcon} alt='back-icon' /> : <img src={HeaderMenuIcon} alt='menu-icon' />}
            onClick={() => setCollapsed(!collapsed)}
            className='header-collapsed-button'
          />
          <div className='user-profile'>
            <img src={image} alt='user-profile' className='user-profile-img' onClick={() => setDropdownVisible(true)} />
            <Dropdown
              overlay={menu}
              visible={dropdownVisible}
              onVisibleChange={handleDropdownVisibleChange}
            >
              <span></span>
            </Dropdown>
          </div>
        </Header>
        <Content
          className={collapsed ? 'menubar-laybout-sub-layout-content-collapsed' : 'menubar-laybout-sub-layout-content'}
        >
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/benchmarking" element={<BenchMarking />} />
            <Route path="/management" element={<Management />} />
            <Route path="/matrics" element={<Matrics />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/shoutout" element={<ShoutOut />} />
            <Route path="/knowledgeHub" element={<KnowledgeHub />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile updateImage={imageUpdate} />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuBar;