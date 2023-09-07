import React, { type FC, useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import backArrow from '../../assets/backArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Logo from '../columbusImages/logo.svg';
import { resetPassword, resetPasswordLinkVerification } from '../../shared/urlHelper';
import { successNotification, errorNotification } from '../../shared/globalVariables';
import './resetPassword.scss';
import mobLogo from '../columbusImages/menuBar-Small-Logo.svg';
import SignupBackButton from '../../assets/SignupBack.svg';


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

const ResetPassword: FC<ResetProps> = () => {
  const [newPassword, setNewPassword] = useState<any>();
  const [passwordcheck, setPasswordCheck] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);
  const [newPasswordValid, setNewPasswordValid] = useState<boolean>(false);
  const [linkVerified, setLinkVerified] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
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

  useEffect(() => {
    linkVerify();
  }, []);
  const linkVerify = () => {    
    setLoader(true);
    resetPasswordLinkVerification({ id }).then((res) => {
      setLoader(false);
      setLinkVerified(res.success);
    }).catch((err)=>{
      setLoader(false);
      setLinkVerified(err.success);
    });
  };
  const empty = () => {
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleSubmit = () => {
    setBtnLoading(true);
    const params = { id: id, password: newPassword };
    if (!newPassword) {
      setPasswordErr(true);
      setBtnLoading(false);
    }
    if (!confirmPassword) {
      setConfirmPasswordErr(true);
      setBtnLoading(false);
    }
    if (newPassword === confirmPassword) {
      resetPassword(params).then((res: any) => {
        if (res.success) {
          successNotification('Your Password Updated Successfully!');
          setBtnLoading(false);
          navigate('/');
          empty();
          setLoader(false);
        }
      }).catch(() => {
        errorNotification('You have Already Used This Password. Try New One!');
        setNewPasswordValid(true);
        setLoader(false);
        setBtnLoading(false);
      });
    } else {
      setPasswordMatch(true);
      setLoader(false);
    }

  };

  const backHandle = () => {
    navigate('/');
  };
  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setPasswordCheck(false);
    setConfirmPasswordErr(false);
    setPasswordMatch(false);
  };

  const handleBlur = () => {
    setPasswordCheck(false);
    if (upperCaseClass === 'check-error' || digitClass === 'check-error' || charClass === 'check-error' || specialCharClass === 'check-error') {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  };

  const signIn = () => {
    navigate('/');
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
    setPasswordErr(false);
    setNewPasswordValid(false);
    setPasswordMatch(false);
  };
  return (
    <div>
      {loader && (
        <div className='spin-Loading'><Spin /></div>
      )}
      {!loader && (
        linkVerified && (
          <Row className='login'>
            <Col xs={0} sm={0} md={12} lg={12} xl={12} className='login-leftside'>
              <Row justify='space-between'>
                <Col sm={0} xs={0} md={24} lg={24} xl={24} className='login-content-div'>
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
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='login-rightside'>
              <Row>
                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <div className='login-div'>
                    <div className='mobile-login-logo'><img src={mobLogo} alt='mob-logo'/></div>
                    <p className='login-main-title'>Welcome to Columbus</p>
                    <p className='login-sub-title'>&quot; The Discovery Platform &quot;</p>
                  </div>
                </Col>
              </Row>
              <div className='forgot-div'>
                <div>
                  <Row>
                    <Col sm={24} xs={24} md={0} lg={0} className='reset-header'>
                      <div className='mob-forgot-div'>
                        <img src={SignupBackButton} alt='sign-up-back' onClick={() => backHandle()}/>
                        <div className='heading-div'>
                          <div className='mob-forgot-heading'> Change Password</div>
                          <div className='sendlink-label'>Reset Your Password</div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <Button className='button' onClick={backHandle}><img className='img' src={backArrow} alt='back-arrow' /></Button>
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
                    className='form-item-password'
                    label='New Password'
                    // name='password'
                    required
                    rules={[
                      {
                        message: 'Please Enter Your New Password!',
                      },
                    ]}
                    validateTrigger={['onChange']}
                  >
                    <Input.Password
                      className='password-label'
                      style={{ marginTop: '-1%' }}
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
                    {passwordErr === true && (
                      <div className='error'>Please Enter Your New Password!</div>
                    )}
                    {newPasswordValid === true && (
                      <div className='error'>You have Already Used This Password. Try New One</div>
                    )}
                  </Form.Item>
                  <Form.Item
                    className='form-item-password'
                    label='Confirm Password'
                    name='confirmedPassword'
                    required
                    rules={[
                      {
                        message: 'Please Enter Your Confirm Password!',
                      },
                    ]}>
                    <Input.Password
                      style={{ marginTop: '-1%' }}
                      className='password-label'
                      placeholder='Enter Your Confirm Password'
                      onChange={(e) => handleConfirmPasswordChange(e)}
                      value={confirmPassword}
                    />
                    {confirmPasswordErr === true && (
                      <div className='error'>Please Enter Your Confirm Password!</div>
                    )}
                    {passwordMatch === true && (
                      <div className='error'>New Password and Confirm Password are not Matched!</div>
                    )}
                  </Form.Item>
                  <Form.Item className='get-link'>
                    {loader && (
                      <div className='loader'><Spin /></div>
                    )}
                    <Button htmlType='submit' loading={btnLoading}>Done</Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        ))}
      {!linkVerified && !loader && (
        <Row>
          <Col span={12} offset={6} className='link-Expired'>
            <div className='link'>Link Expired!!</div>
            <div className='sign-in-link-div'>Already have an account?  <a className="sign-in" onClick={signIn} >
              Sign In
            </a></div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ResetPassword;
