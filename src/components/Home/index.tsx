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
    const params = {
      emailId,
      password,
      userType: 'merchant',
    };

    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
    } else {
      setBtnLoading(true);
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
          localStorage.setItem('adminLogin', typeof true);
          localStorage.setItem('menu_collapse', typeof false);
          setBtnLoading(false);
          navigate('/dashboard');
        })
        .catch(() => {
          errorNotification('Please Enter valid Email and Password');
          setBtnLoading(false);
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
                  <label>Email-Id</label>
                  <Input
                    type="email"
                    name="emailId"
                    prefix={<img src={UserLogo} alt="UserIcon" />}
                    size="large"
                    placeholder="Enter Your Email-Id"
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
                    onChange={(e) => setPassword(e.target.value.trim())}
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
