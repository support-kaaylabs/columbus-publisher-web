import React, { type FC, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import backArrow from '../../assets/backArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Logo from '../columbusImages/logo.svg';
import { resetPassword } from '../../shared/urlHelper';
import { successNotification, errorNotification } from '../../shared/globalVariables';

interface passwordProps {
  upperCaseValidation: boolean;
  digitValidation: boolean;
  charValidation: boolean;
  specialCharValidation: boolean;
  upperCaseClass: string;
  digitClass: string;
  charClass: string;
  specialCharClass: string;
}

interface ResetProps {
  signupPageValidation: any;
  forgotPageValidation: any;
}

const ResetPassword: FC<ResetProps> = ({signupPageValidation,forgotPageValidation}) => {
  const [newPassword, setNewPassword] = useState<any>();
  const [passwordcheck, setPasswordCheck] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false);
  const { id } = useParams();
  const [validation, setValidation] = useState<passwordProps>({
    upperCaseValidation: false,
    digitValidation: false,
    charValidation: false,
    specialCharValidation: false,
    upperCaseClass: 'check-normal',
    digitClass: 'check-normal',
    charClass: 'check-normal',
    specialCharClass: 'check-normal',
  });
  const {
    upperCaseValidation,
    digitValidation,
    charValidation,
    specialCharValidation,
    upperCaseClass,
    digitClass,
    charClass,
    specialCharClass,
  } = validation;
  const navigate = useNavigate();

  const empty = () => {
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = () => {
    const params = { id: id, password: newPassword };
    resetPassword(params).then((res: any) => {
      if (res.success) {
        successNotification('Your Password Updated Successfully');
        navigate('/');
        empty();
      }
    }).catch(()=>{
      errorNotification('This Password is Already Used By You. Please Change Another Password!');
    });
  };

  const backHandle = () => {
    console.log('backed');
    navigate('/');
  };
  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setPasswordCheck(false);

  };

  const handleBlur = () => {
    setPasswordCheck(false);
    if (upperCaseClass === 'check-error' || digitClass === 'check-error' || charClass === 'check-error' || specialCharClass === 'check-error') {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  };

  const handlePasswordChange = (e: any) => {
    setNewPassword(e.target.value);
    const upperCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    const digitRegex = /(?=.*?[0-9])/;
    const characterLengthRegex = /[a-zA-Z0-9].{7,}/;
    const specialCharRegex = /(?=.*[!@#$%^&*])/;
    const isUppercaseValidate = upperCaseRegex.test(e.target.value);
    const isDigitValidate = digitRegex.test(e.target.value);
    const isCharacterValidate = characterLengthRegex.test(e.target.value);
    const isSpecialCharValidate = specialCharRegex.test(e.target.value);
    setValidation({
      ...validation,
      upperCaseValidation: isUppercaseValidate,
      digitValidation: isDigitValidate,
      charValidation: isCharacterValidate,
      specialCharValidation: isSpecialCharValidate,
      upperCaseClass: isUppercaseValidate ? 'check-success' : 'check-error',
      digitClass: isDigitValidate ? 'check-success' : 'check-error',
      charClass: isCharacterValidate ? 'check-success' : 'check-error',
      specialCharClass: isSpecialCharValidate ? 'check-success' : 'check-error',
    });
    setPasswordCheck(true);
  };
  return (
    <Row className='login'>
      <Col xs={0} sm={0} md={12} lg={12} xl={12} className='login-left'>
        <Row justify='space-between'>
          <Col md={{ offset: 8, span: 8 }} lg={{ offset: 8, span: 8 }} xl={{ offset: 8, span: 8 }} className='login-content-div'>
            <div>
              <div className='login-title'>
                <p className='login-main-title'>Welcome to Columbus</p>
                <p className='login-sub-title'>&quot; The Discovery Platform &quot;</p>
              </div>
              <div className='login-logo'>
                <img src={Logo} alt='Columbus-Logo' />
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className='login-right'>
        <div className='forgot-div'>
          <div>
            <Row className='forgot'>
              <Col>
                <Button className='button' onClick={backHandle}><img className='img' src={backArrow} /></Button>
                <p className='p-forgot'> Change Password <div className='send-emailmessage'>Reset Your Password</div></p>
              </Col>
            </Row>
          </div><Form
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
              label='New Password'
              required
              rules={[
                {
                  message: 'Please Enter Your New Password!',
                },
              ]}>
              <Input.Password
                className='input'
                placeholder='Enter Your New Password'
                autoComplete="new-password"
                type='password'
                onChange={(e) => handlePasswordChange(e)}
                value={newPassword}
                onBlur={handleBlur}
              />
              {(passwordcheck || passwordValidate) && (
                <div className='password-condition-check-div'>
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={{ offset: 1, span: 22 }}
                      lg={{ offset: 3, span: 18 }}
                      xl={{ offset: 4, span: 16 }}
                    >
                      <div className="password-condition-div">
                        <span className="fs-12 jingle-blue fw-600">
                          Password Must Contain
                        </span>
                        <div style={{ marginTop: '10px' }}>
                          <p className={upperCaseClass}>
                            {upperCaseValidation && (
                              <CheckOutlined className="icon-align" />
                            )}
                            {!upperCaseValidation && (
                              <CloseOutlined className="icon-align" />
                            )}
                            At least 1 capital letter and 1 small letter
                          </p>
                          <p className={digitClass}>
                            {digitValidation && (
                              <CheckOutlined className="icon-align" />
                            )}
                            {!digitValidation && (
                              <CloseOutlined className="icon-align" />
                            )}
                            At least 1 number
                          </p>
                          <p className={charClass}>
                            {charValidation && (
                              <CheckOutlined className="icon-align" />
                            )}
                            {!charValidation && (
                              <CloseOutlined className="icon-align" />
                            )}
                            At least 8 Characters
                          </p>
                          <p className={specialCharClass}>
                            {specialCharValidation && (
                              <CheckOutlined className="icon-align" />
                            )}
                            {!specialCharValidation && (
                              <CloseOutlined className="icon-align" />
                            )}
                            At least 1 Special Character
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Form.Item>
            <Form.Item
              className='form-item'
              label='Confirm Password'
              required
              rules={[
                {
                  message: 'Please Enter Your Confirm Password!',
                },
              ]}>
              <Input.Password
                className='input'
                placeholder='Enter Your Confirm Password'
                onChange={(e) => handleConfirmPasswordChange(e)}
                value={confirmPassword}
              />
            </Form.Item>
            <Form.Item>
              <Button className='get-link' htmlType='submit'>Done</Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
