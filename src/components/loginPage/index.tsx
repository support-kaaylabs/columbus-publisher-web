import React, { useState, type FC, useEffect } from 'react';
import { Row, Col } from 'antd';
import './index.scss';
import Logo from '../columbusImages/logo.svg';
import { useNavigate } from 'react-router-dom';
import Signin from './signin';
import Signup from './signup';
import ForgotPassword from './ForgotPassword';
interface Props {
  signupValidate: boolean;
}

const LoginPage: FC<Props> = ({ signupValidate }) => {
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
          <Col md={{ offset: 8, span: 8 }} lg={{ offset: 8, span: 8 }} xl={{ offset: 8, span: 8 }} className='login-content-div'>
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
        {signup &&
          <Signup signupPageValidation={signupPageValidation} forgotPageValidation={forgotPageValidation} />
        }
        {forgot &&
          <ForgotPassword signupPageValidation={signupPageValidation} forgotPageValidation={forgotPageValidation}  />
        }
        {!signupValidate && !signup && !forgot &&
          <Signin
            signupPageValidation={signupPageValidation}
            forgotPageValidation={forgotPageValidation} />
        }

      </Col>
    </Row>
  );
};

export default LoginPage;
