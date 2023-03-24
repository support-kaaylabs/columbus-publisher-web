/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type FC } from 'react';
import {  Card, Button, Form, Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './login.scss';
import { authenticate } from '../../shared/urlHelper';
import '../../stylesheet/style.scss';
import { errorNotification } from '../../shared/globalVariables';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = (e: any) => {
    console.log(e, 'hits=============>');
    navigate('/dashboard');
    const params = {
      emailId,
      password,
      userType: 'Merchant',
    };
    console.log(params, 'params----------->');
    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
    } else {
      authenticate(params)
        .then((resp) => {
          console.log(resp, 'responses==========>');
          console.log(localStorage.getItem('fcmToken'), 'devicesParams');
        })
        .catch((resp: any) => {
          if (resp.success === false && resp.error.mailError) {
            errorNotification(resp.error.mailError);
          } else if (resp.success === false && resp.error.passwordError) {
            errorNotification(resp.error.passwordError);
          }
        });
    }
  };
  return (
    <div className="login-page">
      <div className="main-component">
        <div className="welcome-title">WELCOME</div>
        <Card className="login">
          <div className="title">
            <img src={require('./Jingle.png')} alt="logo" />
          </div>
          <Form onFinish={handleSubmit} className="login-form">
            <Form.Item>
              {
                <div className="username-input">
                  <Input
                    type="email"
                    name="emailId"
                    placeholder="Email"
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
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="password-text"
                    suffix={
                      <EyeOutlined
                        onClick={() => {
                          return null;
                        }}
                      />
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              }
            </Form.Item>
            <Form.Item>
              <div className="login-button">
                <Button
                  loading={false}
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
