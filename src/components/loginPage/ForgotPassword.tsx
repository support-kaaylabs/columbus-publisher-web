import React, { type FC, useState } from 'react';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import backArrow from '../../assets/backArrow.svg';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../shared/urlHelper';
import './forgotPassword.scss';
import SignupBackButton from '../../assets/SignupBack.svg';


interface forgotProps {
  signupPageValidation: any;
  forgotPageValidation: any;
}

const ForgotPassword: FC<forgotProps> = ({ signupPageValidation, forgotPageValidation }) => {
  const [email, setEmail] = useState<any>();
  const [forgotLinkSent, setForgotLinkSent] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!email) {
      setEmptyEmail(true);
    } else {
      const params = { emailId: email, userType: 'merchant' };
      setLoader(true);
      forgotPassword(params).then(() => {
        setForgotLinkSent(true);
        setEmailErr(false);
        setEmail('');
        setLoader(false);
      }).catch(() => {
        setEmailErr(true);
        setLoader(false);

      });
    }

  };

  const backHandle = () => {
    signupPageValidation(false);
    forgotPageValidation(false);
    navigate('/');
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmptyEmail(false);
    setEmailErr(false);
    setForgotLinkSent(false);

  };
  return (

    <div className='forgot-div'>
      <div>
        <div>
          <Row className='forgot'>
            <Col sm={0} xs={0} md={24} lg={24}>
              <Button className='button' onClick={backHandle}><img className='img' src={backArrow} /></Button>
              <p className='p-forgot'> Forgot Password <div className='send-emailmessage'>Send a link to your email for reset password</div></p>
            </Col>
            <Col sm={24} xs={24} md={0} lg={0}>
              <div className='mob-forgot-div'>
                <img src={SignupBackButton} alt='sign-up-back' onClick={() => backHandle()}/>
                <div className='heading-div'>
                  <div className='mob-forgot-heading'> Forgot Password</div>
                  <div className='sendlink-label'>Send a link to your email for reset password</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Form
          name='basic'
          size={'large'}
          autoComplete='off'
          initialValues={{ remember: true }}
          className='form-forgot'
          layout='vertical'
          onFinish={handleSubmit}
        >
          <Form.Item
            className='form-item'
            label='Email Address'
            required
            rules={[
              {
                required: true,
                message: 'Please Enter Your Email Address!',
              },
            ]}>
            <Input
              className='input'
              placeholder='Enter Your Email Address'
              onChange={(e) => handleEmailChange(e)}
              value={email}
            />
            {(emailErr === true && !emptyEmail) && (
              <div className='error'>Please Enter Valid Email Address!</div>
            )}
            {emptyEmail === true && (
              <div className='error'>Please Enter Your Email Address!</div>
            )}
          </Form.Item>
          <Form.Item className='get-link' >
            <Button htmlType='submit'>Get Link</Button>
            {loader && (
              <div className='spin-Loading'><Spin/></div>
            )}
            {forgotLinkSent && !loader &&(
              <div className='mail-message'>Mail has been sent to your Mail Account. Please Check Your Mail to Reset Your Password.</div>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
