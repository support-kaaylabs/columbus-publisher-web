import React, { useState, type FC } from 'react';
import { Row, Col } from 'antd';
import './index.scss';
import Logo from '../columbusImages/logo.svg';
import Signin from './signin';
import Signup from './signup';
import ForgotPassword from './ForgotPassword';
interface Props{
  signupValidate: boolean;
}

const LoginPage: FC<Props> = ({signupValidate}) => {
  console.log(signupValidate,'signup validate');
  const [signup, setsignUp] = useState(false);
  const [forgot, setForgot] = useState(false);

  const signupPageValidation = (e: any) => {
    setsignUp(e);
  };

  const forgotPageValidation = (e: any) => {
    setForgot(e);
  };

  console.log(signup,'signnnnuupp');
  console.log(forgot, 'forrrrgot');
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
        {signup &&
        <Signup/>
        }
        {forgot &&
        <ForgotPassword />
        }
        {!signupValidate && !signup && !forgot &&
         <Signin 
           signupPageValidation={signupPageValidation}
           forgotPageValidation={forgotPageValidation}/>
        }
       
      </Col>
    </Row>
  );
};

export default LoginPage;
