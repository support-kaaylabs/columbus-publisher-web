import React, { type FC, useState, useEffect } from 'react';
import Logo from '../../components/HomePage/Images/COLUMBUS 250 x 150 (1).png';
import MiniLogo from '../../components/HomePage/Images/C_m 80(1).png';
import { Layout, Row, Col, Space, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import { modules } from '../../../src/pages/Dashboard/ModuleHelper';
import _ from 'lodash';
import SubMenu from 'antd/es/menu/SubMenu';
import './index.scss';


const { Header, Footer, Sider, Content } = Layout;

const SliderLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menus, setMenus] = useState<any>();

  useEffect(() => {
    const val = _.uniq(_.orderBy(modules, ['sequence']));
    setMenus(val);
  }, []);

  const orderSubMenu = (data: any) => {
    return (
      <SubMenu
        key={data.key}
        title={
          <span>
            {/* <Icon type={data.type} /> */}
            <span>{data.Module_Name}</span>
          </span>
        }
      >
        {data.submenu.map((val: any) => (
          <Menu.Item key={val.key} 
            style={{ backgroundColor: 'white', color: '#570026' }}
            // className={val.visible === false && "hide"}
          >
            {val.name}
            {/* <Link to={val.to}>{val.name}</Link> */}
          </Menu.Item>
        ))}
      </SubMenu>
    );
  };

  const onCollapsedChange = (data: any) => {
    setCollapsed(!collapsed);
  };
  
  console.log(menus, 'menuuuuss');
  return (
    <div>
      <Space direction='vertical' style={{ width: '100%'}}>
        <Layout>
          <Row>
            <Col sm={0} xs={0} md={0} lg={8} xl={10}>
              <Sider width={250}
                theme='light'
                collapsible
                collapsed={collapsed}
              >
                <div className='img-div' onClick={() => onCollapsedChange(collapsed)}>
                  <div style={{ height: '30px'}}>
                    <img src={!collapsed ? Logo : MiniLogo} alt='ColumbusLogo' />
                  </div>
                </div>
                <div>
                  <div>
                    <Menu style={{ backgroundColor: '#570026', height: '100vh', color: 'white' }} mode='inline'
                      className={!collapsed ? 'side-menu' : 'side-menu-collapsed'}
                    >
                      <nav>
                        <>
                          {menus?.length &&
                            menus?.map((val: any) => {
                              if (!val.submenu) {
                                return (
                                  <Menu.Item
                                    key={val.key}
                                    style={{ height: '50px', color: 'white' }}
                                  >
                                    <span>{val.name}</span>
                                  </Menu.Item>
                                );
                              } else {
                                return orderSubMenu(val);
                              }
                            })}
                        </>
                      </nav>
                    </Menu>
                  </div>
                </div >
              </Sider >
            </Col >
          </Row >
        </Layout >
      </Space >
    </div >
  );

};

export default SliderLayout;
