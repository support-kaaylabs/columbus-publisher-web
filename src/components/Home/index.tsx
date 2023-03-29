import React, { useState, type FC } from 'react';
import { Card, Button, Form, Input } from 'antd';
import '../Home/login.scss';
import Logo from './Images/logoSmall.png';
import { authenticate } from '../../shared/urlHelper';
import '../../stylesheet/style.scss';
import { errorNotification } from '../../shared/globalVariables';
import { useNavigate } from 'react-router-dom';
import UserLogo from './Images/userIconSmall.png';
import PswdLogo from './Images/passwordIconSmall.png';

const Home: FC = () => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = () => {
    navigate('/homePage/products');
    const params = {
      emailId,
      password,
      userType: 'Merchant',
    };

    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
    } else {
      setBtnLoading(true);
      authenticate(params).catch((resp: any) => {
        if (resp.success === false && resp.error.mailError) {
          errorNotification(resp.error.mailError);
          setBtnLoading(false);
        } else if (resp.success === false && resp.error.passwordError) {
          errorNotification(resp.error.passwordError);
          setBtnLoading(false);
        }
      });
    }
  };

  return (
    <div className="login-page">
      <div className="main-component">
        <div className="welcome-title">
          <img src={Logo} alt="JINGLS" />
        </div>
        <Card className="login">
          <div className="title">
            <b>PUBLISHER</b>
          </div>
          <Form onFinish={handleSubmit} className="login-form">
            <Form.Item>
              {
                <div className="username-input">
                  <label>Username</label>
                  <Input
                    type="email"
                    name="emailId"
                    prefix={<img src={UserLogo} alt="UserIcon" />}
                    size="large"
                    placeholder="Enter Your Name"
                    className="input-text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={emailId}
                  />
                </div>
              }
            </Form.Item>
            <Form.Item>
              {
                <div className="password-input">
                  <label>Password</label>
                  <Input
                    type="password"
                    name="password"
                    size="large"
                    prefix={<img src={PswdLogo} alt="PasswordIcon" />}
                    placeholder="Enter Your Password"
                    className="password-text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              }
            </Form.Item>
            <Form.Item>
              <div className="login-button">
                <Button
                  loading={btnLoading}
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  LOGIN
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Home;
