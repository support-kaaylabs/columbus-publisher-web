
import React, { type FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Col, Row, ConfigProvider } from 'antd';
import LoginPage from './components/loginPage';
import ResetPassword from './components/loginPage/resetPassword';
import MenuBar from './components/demo/menuBar';
import MobileMenuBar from './components/demo/mobileMenuBar';

const App: FC = () => {
  const [loginVisible] = useState(window.localStorage.getItem('Login'));


  return (
    <ConfigProvider theme={{
      token: {
        fontFamily: 'Gilroy-medium'
      }
    }}>
      {loginVisible && (
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <MenuBar />
          </Col>
          <Col xs={24} sm={24} md={0} lg={0}>
            <MobileMenuBar />
          </Col>
        </Row>
      )}
      {(!loginVisible) && (
        <Routes>
          <Route path="/" element={<LoginPage signupValidate={false} />} />
          <Route path="/reset-password/:id" element={<ResetPassword signupPageValidation={false} forgotPageValidation={false} />} />
        </Routes>
      )}
    </ConfigProvider>
  );
};

export default App;
