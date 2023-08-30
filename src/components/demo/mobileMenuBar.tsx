import React, { useEffect, useState } from 'react';
import './mobileMenuBar.scss';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Card, Col, Row, Dropdown } from 'antd';
import DashboardIcon from '../columbusImages/dashboard-icon.svg';
import BenchMarkingIcon from '../columbusImages/benchmarking-icon.svg';
import SelectionIcon from '../columbusImages/selections-icon.svg';
import ShoutoutIcon from '../columbusImages/shoutout-icon.svg';
import KnowledgeHubIcon from '../columbusImages/knowledge-icon.svg';
import SettingsIcon from '../columbusImages/settings-icon.svg';
import SupportIcon from '../columbusImages/support-icon.svg';
import MenuBarBigLogo from '../columbusImages/menubar-Big-Logo.svg';
import HeaderMenuIcon from '../columbusImages/header-menu-icon.svg';
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
import DefaultUserImg from '../columbusImages/defaultUser.png';
import { menuBarKeyType } from '../../shared/type';

const { Header, Content } = Layout;

const MobileMenuBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);  
  const [openKey, setOpenKey] = useState(['dashboard']);
  const userProfile: string | null = `${window.localStorage.getItem('Image')}`;
  const [image, setImage] = useState('');
  const [updateImage, setUpdateImage] = useState<number>(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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

 

  const imageUrl = userProfile === 'null' ? DefaultUserImg : userProfile;
  const currentKey = (window.location.href).split('/')[3];
  const onOpenKeyHandler = (key: string[]) => {
    setOpenKey([key[1]]);
  };
  const onClickHandler = (key: menuBarKeyType) => {
    const selectionArr = ['management', 'metrics','analysis', 'selections'];
    const settingArr = ['profile', 'subscription', 'settings'];
    if(selectionArr.includes(key.key)){
      setOpenKey(['selections']);
    } else if(settingArr.includes(key.key)){
      setOpenKey(['settings']);
    }
    else {
      setOpenKey([key.key]);
    }
    setOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout className='menubar-layout-mobile'>
      <Drawer placement="left" open={open} onClose={onClose} width={257} className='menubar-layout-drawer'>
        <div className='menubar-layout-sider-logo' onClick={onClose}><img src={MenuBarBigLogo} alt='menubar-Logo-icon' /></div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClickHandler}
          openKeys={openKey}
          onOpenChange={onOpenKeyHandler}
          defaultSelectedKeys={[currentKey]}
          className='menubar-sider-menu'
        >
          <Menu.Item
            key='dashboard'
            icon={<img src={DashboardIcon} alt='dashboard-icon' className='menuBar-icons' />}
          >
            <Link to='/dashboard' />
            Dashboard
          </Menu.Item>
          <Menu.Item
            key='benchmarking'
            icon={<img src={BenchMarkingIcon} alt='benchmarking-icon' className='menuBar-icons' />}
          >
            <Link to='/benchmarking' />
            Benchmarking
          </Menu.Item>
          <Menu.SubMenu key='selections' title='Selections' icon={<img src={SelectionIcon} alt='selections-icon' className='menuBar-icons' />} className='selections-dropdown'>
            <Menu.Item
              key='management'
            >
              <Link to='/management' />
              Management
            </Menu.Item>
            <Menu.Item
              key='metrics'
            >
              <Link to='/metrics' />
              Metrics
            </Menu.Item>
            <Menu.Item
              key='analysis'
            >
              <Link to='/analysis' />
              Analysis
            </Menu.Item>
            <div className='select-border'><SelectionDot currentKey={currentKey} /></div>
          </Menu.SubMenu>
          <Menu.Item
            key='shoutout'
            icon={<img src={ShoutoutIcon} alt='shoutout-icon' className='menuBar-icons' />}
          >
            <Link to='/shoutout' />
            Shoutout
          </Menu.Item>
          <Menu.Item
            key='knowledgeHub'
            icon={<img src={KnowledgeHubIcon} alt='knowledgeHub-icon' className='menuBar-icons' />}
          >
            <Link to='/knowledgeHub' />
            Knowledge Hub
          </Menu.Item>
          <Menu.SubMenu key='settings' title='Settings' icon={<img src={SettingsIcon} alt='settings-icon' className='menuBar-icons' />} className='settings-dropdown'>
            <Menu.Item
              key='profile'
            >
              <Link to='/profile' />
              Profile
            </Menu.Item>
            <Menu.Item
              key='subscription'
            >
              <Link to='/subscription' />
              Subscription
            </Menu.Item>
            <div className='select-border'><SettingDot currentKey={currentKey} /></div>
          </Menu.SubMenu>
          <Menu.Item
            key='support'
            icon={<img src={SupportIcon} alt='support-icon' className='menuBar-icons' />}
          >
            <Link to='/support' />
            Support
          </Menu.Item>
        </Menu>
      </Drawer>
      <Header className='menubar-laybout-sub-layout-header'>
        <Button
          type="text"
          icon={<img src={HeaderMenuIcon} alt='menu-icon' />}
          onClick={() => setOpen(true)}
          className='header-collapsed-button'
        />
        <div className='user-profile'>
          <img src={userProfile} alt='user-profile' className='user-profile-img' onClick={() => setDropdownVisible(true)} />
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
        className='menubar-laybout-sub-layout-content'
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
          <Route path="/profile" element={<Profile updateImage={imageUpdate} />}/>
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/signup" element={<Signup signupPageValidation={false} forgotPageValidation={false} />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default MobileMenuBar;