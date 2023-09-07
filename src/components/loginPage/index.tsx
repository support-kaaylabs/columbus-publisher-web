import React, { useState, type FC, useEffect } from 'react';
import { Row, Col } from 'antd';
import './index.scss';
import Logo from '../columbusImages/logo.svg';
import { useNavigate } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';
import SignupForm from './signupform';
import ForgotPassword from './ForgotPassword';
import mobLogo from '../columbusImages/menuBar-Small-Logo.svg';

interface Props {
  signupValidate: boolean;
  setLoginVisible: any;
}

const LoginPage: FC<Props> = ({ signupValidate, setLoginVisible }) => {
  const [signup, setsignUp] = useState(false);
  const [forgot, setForgot] = useState(false);

  const signupPageValidation = (e: any) => {
    setsignUp(e);
  };
  const navigate = useNavigate();
  const loginId = localStorage.getItem('Login');

  useEffect(() => {
    if (loginId === 'true') {
      navigate('/dashboard');
    }
  });
  const forgotPageValidation = (e: any) => {
    setForgot(e);
  };

  return (
    <Row className='login'>
      <Col xs={0} sm={0} md={12} lg={12} xl={12} className='login-left'>
        <Row justify='space-between'>
          <Col  sm={0} xs={0} md={24} lg={24} xl={24} className='login-content-div'>
            <div>
              <div className='login-title'>
                <p className='login-main-title'>Welcome to Columbus</p>
                <p className='login-sub-title'>&quot; The Discovery Platform &quot;</p>
              </div>
              <div className='login-logo'>
                <img src={Logo} alt='Columbus-Logo' />
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className='login-right'>
        <Row>
          <Col sm={24} xs={24} md={0} lg={0}>
            <div className='login-div'>
              <div className='mobile-login-logo'><img src={mobLogo} alt='mob-logo'/></div>
              <p className='login-main-title'>Welcome to Columbus</p>
              <p className='login-sub-title'>&quot; The Discovery Platform &quot;</p>
            </div>
          </Col>
          <Col sm={24} xs={24} md={24} lg={24}>
            {signup &&
          // <Signup signupPageValidation={signupPageValidation} forgotPageValidation={forgotPageValidation} />
          <SignupForm signupPageValidation={signupPageValidation} forgotPageValidation={forgotPageValidation} />
            }
            {forgot &&
          <ForgotPassword signupPageValidation={signupPageValidation} forgotPageValidation={forgotPageValidation}  />
            }
            {!signupValidate && !signup && !forgot &&
          <Signin
            setLoginVisible={setLoginVisible}
            signupPageValidation={signupPageValidation}
            forgotPageValidation={forgotPageValidation} />
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;
