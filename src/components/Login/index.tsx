import React from 'react';
import { Input, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import classes from './index.module.scss';
import Logo from './Images/logoSmall.png';
import UserLogo from './Images/userIconSmall.png';
import PswdLogo from './Images/passwordIconSmall.png';

const Login: React.FC = () => {
  const submitHandler = () => {
    console.log('Received values of form: ');
  };
  return (
    <div className={classes.login_head}>
      <div className={classes.login_head_content}>
        <div className={classes.login_head_content_logo}>
          <img src={Logo} alt="JINGLS" />
        </div>
        <h3 className={classes.login_head_content_text}>
          <b>PUBLISHER</b>
        </h3>
        <form
          className={classes.login_head_content_form}
          onSubmit={submitHandler}
        >
          <div className={classes.login_head_content_form_nameHead}>
            <label>Username</label>
            <Input
              size="large"
              placeholder="Enter Your Name"
              prefix={<img src={UserLogo} alt="UserIcon" />}
              className={classes.login_head_content_form_name}
            />
          </div>
          <div className={classes.login_head_content_form_passwordHead}>
            <label>Password</label>
            <Input
              size="large"
              placeholder="Enter Your Password"
              prefix={<img src={PswdLogo} alt="PasswordIcon" />}
              className={classes.login_head_content_form_password}
            />
          </div>
        </form>
        <div className={classes.login_head_content_button}>
          <button type="button" onClick={submitHandler}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
