import React, { type FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';


const Signin: FC = () => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const params = {
      emailId,
      password,
      userType: 'Admin',
    };

    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
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
          localStorage.setItem('adminLogin', typeof true);
          localStorage.setItem('menu_collapse', typeof false);
          navigate('/signup');
        })
        .catch(() => {
          errorNotification('Please Enter valid Email and Password');
        });
    }
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      size={'large'}
      className='form'
    >
      <Form.Item className='form-sign-in'>
        <p>Sign in</p>
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
        <a className="form-forgot" href="">
          Forgot password
        </a>
        <Button
          htmlType="submit"
          className='form-button'
          size='large'
          block>
          Sign In
        </Button>
        <p className='form-account'>Don&apos;t have an account? <span className='form-signup'>Sign Up</span></p>
      </Form.Item>
    </Form>
  );
};

export default Signin;