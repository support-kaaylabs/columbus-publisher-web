import React, { type FC } from 'react';
import { Row, Col } from 'antd';
import './index.scss';
import Logo from '../columbusImages/logo.svg';
import Signin from './signin';

const LoginPage: FC = () => {
  return (
    <Row className='login'>
      <Col span={12} className='login-left'>
        <div className='login-title'>
          <p className='login-main-title'>Welcome to Columbus</p>
          <p className='login-sub-title'>&quot; The Discovery Platform &quot;</p>
        </div>
        <div className='login-logo'>
          <img src={Logo} alt='Columbus-Logo' />
        </div>
      </Col>
      <Col span={12} className='login-right'>
        <Signin />
      </Col>
    </Row>
  );
};

export default LoginPage;