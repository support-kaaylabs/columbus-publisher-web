import React, { useState, type FC } from 'react';
import { Card, Button, Form, Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import '../Home/login.scss';
import { authenticate } from '../../shared/urlHelper';
import '../../stylesheet/style.scss';
import { errorNotification } from '../../shared/globalVariables';
import { useNavigate } from 'react-router-dom';

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
