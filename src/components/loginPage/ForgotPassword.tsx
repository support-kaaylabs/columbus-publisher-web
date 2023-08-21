import React, { type FC, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import backArrow from '../../assets/backArrow.svg';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../shared/urlHelper';

interface forgotProps {
  signupPageValidation: any;
  forgotPageValidation: any;
}

const ForgotPassword: FC<forgotProps> = ({ signupPageValidation, forgotPageValidation }) => {
  const [email, setEmail] = useState<any>();
  const [forgotLinkSent, setForgotLinkSent] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!email) {
      setEmptyEmail(true);
    } else {
      const params = { emailId: email, userType: 'merchant' };
      forgotPassword(params).then(() => {
        setForgotLinkSent(true);
        setEmailErr(false);
        setEmail('');
      }).catch(() => {
        setEmailErr(true);
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
            <Col>
              <Button className='button' onClick={backHandle}><img className='img' src={backArrow} /></Button>
              <p className='p-forgot'> Forgot Password <div className='send-emailmessage'>Send a link to your email for reset password</div></p>
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
            {forgotLinkSent && (
              <div className='mail-message'>Mail has been sent to your Mail Account. Please Check Your Mail to Reset Your Password.</div>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
