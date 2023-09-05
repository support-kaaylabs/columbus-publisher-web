import React, { type FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';
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
  return (
    <div>
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
