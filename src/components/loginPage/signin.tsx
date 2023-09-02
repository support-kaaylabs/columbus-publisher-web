import React, { type FC, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';
import mobLogo from '../columbusImages/menuBar-Small-Logo.svg';
import './signin.scss';
interface signinProps {
  signupPageValidation: any;
  forgotPageValidation: any;
  setLoginVisible: any;
}
const Signin: FC<signinProps> = ({ signupPageValidation, forgotPageValidation, setLoginVisible }) => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const signupClick = () => {
    signupPageValidation(true);
  };

  const forgotClick = () => {
    forgotPageValidation(true);
  };

  const handleSubmit = () => {
    setBtnLoading(true);
    const params = {
      emailId,
      password,
      userType: 'merchant',
    };

    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
      setBtnLoading(false);
    } else {
      authenticate(params)
        .then((resp: any) => {
          const {
            User_Name,
            User_ID,
            User_Type,
            Image,
            User_Uid,
            Email_ID,
            Phone_Number,
            Store_Name,
          } = resp.data && resp.data[0];
          const { token } = resp;
          localStorage.setItem('Phone_Number', Phone_Number);
          localStorage.setItem('User_Email', Email_ID);
          localStorage.setItem('User_Name', User_Name);
          localStorage.setItem('User_ID', User_ID);
          localStorage.setItem('User_Uid', User_Uid);
          localStorage.setItem('User_Type', User_Type);
          localStorage.setItem('Image', Image);
          localStorage.setItem('token', token);
          localStorage.setItem('token', token);
          localStorage.setItem('Store_Nme', Store_Name);
          localStorage.setItem('publisherLogin', typeof true);
          localStorage.setItem('menu_collapse', typeof false);
          localStorage.setItem('Login', 'true');
          navigate('/dashboard');
          setLoginVisible(true);
        })
        .catch(() => {
          errorNotification('Please Enter valid Email and Password');
          setBtnLoading(false);
        });
    }
  };
  const subTitleLabel = 'The Discovery Platform';
  return (
    <div>
      {/* <Row> */}
      {/* <Col sm={24} xs={24} md={0} lg={0}>
          <div className='login-div'>
            <div className='mobile-login-logo'><img src={mobLogo} alt='mob-logo'/></div>
            <div className='login-main-title'>Welcome to Columbus</div>
            <div className='login-sub-title'>&quot;{subTitleLabel}&quot;</div>
          </div>
        </Col> */}
      {/* <Col sm={24} xs={24} md={24} lg={24} > */}
      <div className='signin-div'>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          size={'large'}
          className='form'
          style={{ marginTop: '18%' }}
        >
          <Form.Item className='form-sign-in'>
            <div>Sign In</div>
          </Form.Item>
          <Form.Item>
            {
              <div
                className='form-email-address'>
                <label>Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter Your Email-Id"
                  onChange={(e) => setEmail(e.target.value)}
                  value={emailId}
                />
              </div>
            }
          </Form.Item>

          <Form.Item>
            {
              <div className="form-password">
                <label>Password</label>
                <Input.Password
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                  value={password}
                />
              </div>
            }
          </Form.Item>

          <Form.Item>
            <a className="form-forgot"
              onClick={forgotClick}
            >
          Forgot password
            </a>
            <Button
              htmlType="submit"
              className='form-button'
              size='large'
              block
              loading={btnLoading}
            >
          Sign In
            </Button>
            <p className='form-account'>Don&apos;t have an account? <span className='form-signup' onClick={signupClick}>Sign Up</span></p>
          </Form.Item>
        </Form>
      </div>
      {/* </Col> */}
      {/* // </Row> */}
    </div>
  );
};

export default Signin;
