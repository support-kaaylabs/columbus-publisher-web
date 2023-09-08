import React, { type FC, useState, useEffect, MouseEvent, useRef } from 'react';
import { Form, Button, Col, Row, Input, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SignupBackButton from '../../assets/SignupBack.svg';
import frontArrow from '../../assets/frontArroww.svg';
import backArrow from '../../assets/BackArroww.svg';
import { successNotification, errorNotification } from '../../../src/shared/globalVariables';
import cameraIcon from '../Home/Images/profilepicCamera.svg';
import addProfileCameraIcon from '../../assets/Icon feather-camera.svg';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_phone_verify, sellerRegister } from '../../../src/shared/urlHelper';
import './signup.scss';
import { get } from 'lodash';
import { imageHeight, imageWidth } from '../../shared/helper';

interface Country {
  Country_Id: number;
  Country_Name: string;
}

interface State {
  State_Id: string;
  State_Name: string;
}

interface City {
  City_Id: string;
  City_Name: string;
}

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

interface signupProps {
  signupPageValidation: any;
  forgotPageValidation: any;
}

const SignupForm: FC<signupProps> = ({ signupPageValidation, forgotPageValidation }) => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const logoHandler = useRef<any>(null);

  const [password, setPassword] = useState('');
  const [steps, setSteps] = useState(1);
  const [email, setEmail] = useState<any>();
  const [current, setCurrent] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [name, setName] = useState<any>();
  const [userName, setUserName] = useState<any>('');
  const [gstNumber, setGstNumber] = useState<any>('');
  const [zipCode, setZipCode] = useState<any>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);
  const [uniquePhoneNumberErr, setUniquePhoneNumberErr] = useState(false);
  const [passwordcheck, setPasswordCheck] = useState<boolean>(false);
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityValue, setCityValue] = useState<any>();
  const [countryId, setCountryId] = useState<any>();
  const [stateId, setStateId] = useState<any>();
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [stateIsRequired, setStateIsRequired] = useState<boolean>(false);
  const [cityIsRequired, setCityIsRequired] = useState<boolean>(false);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [image, setImage] = useState<any>();
  const [selectedFileList, setSelectedFileList] = useState({});
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

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    await getAllCountries().then((res) => {
      if (res) {
        setRegionDatas(res?.data);
      }
    });
  };

  const getState = (value: any) => {
    const params = { id: countryId, searchValue: value };
    getAllStatesByCountryId(params).then((response) => {
      if (response) {
        setStateData(response.data);
      }
    });
  };

  const handleCountryChange = async (value: string) => {
    setCountryId(value);
    const selectedCountry = regionDatas.find((country) => country.Country_Id === value);
    const country = selectedCountry?.Country_Id;
    setSelectedCountry(selectedCountry || null);
    const params = { id: country };
    await getAllStatesByCountryId(params).then((response) => {
      if (response) {
        if (response.data.length === 0) {
          setStateIsRequired(false);
          setStateData(response.data);
        } else {
          setStateIsRequired(true);
          setStateData(response.data);
        }
      }
    });
    setCityIsRequired(false);
    setSelectedState(null);
    setSelectedCity(null);
    setStateErr(false);
  };

  const handleStateChange = (value: string) => {
    const selectedState = stateData.find((state) => state.State_Id === value);
    const stateId = selectedState.State_Id;
    setStateId(stateId);
    setSelectedState(selectedState || null);
    const params = { id: stateId };
    getAllCitiesByStateId(params).then((res) => {

      if (res) {
        if (res.data.length === 0) {
          setCityIsRequired(false);
          setCityData(res.data);
        } else {
          setCityIsRequired(true);
          setCityData(res.data);
        }
      }
    });
    setSelectedCity(null);
    setStateErr(false);
  };

  const handleCityChange = (value: string) => {
    const selectedCity = cityData.find((city) => city.City_Id === value);
    setSelectedCity(selectedCity || null);
    setCityErr(false);
  };

  const getCities = (value: any) => {
    setCityValue(value);
    searchCities();
  };

  const searchCities = () => {
    const params = { id: stateId, searchValue: cityValue };
    getAllCitiesByStateId(params).then((response) => {
      if (response.success) {
        setCityData(response.data);
      }
    });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setUniqueEmailerr(false);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
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

  const handleBlur = () => {
    if (upperCaseClass === 'check-error' || digitClass === 'check-error' || charClass === 'check-error' || specialCharClass === 'check-error') {
      setPasswordCheck(true);

      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
      setPasswordCheck(false);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setPasswordCheck(false);
  };

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value.trim());
    setUniquePhoneNumberErr(false);
  };

  const signIn = () => {
    signupPageValidation(false);
    forgotPageValidation(false);
    navigate('/');
  };

  const empty = () => {
    setName('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setGstNumber('');
    setPhoneNumber('');
    setZipCode('');
    setSelectedFileList({});
  };
  const cameraIconHandlerDisplay = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCameraIconDisplay(false);
  };

  const cameraIconHandlerHide = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCameraIconDisplay(true);
  };

  const changeLogoHandler = (event: any) => {
    const fileUploaded: any = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (fileUploaded) {
      const img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload = () => {
        if (img.width === imageWidth && img.height === imageHeight) {
          setSelectedFileList(fileUploaded);
          reader.readAsDataURL(fileUploaded);
          successNotification('Your Profile Picture Successfully updated');
        } else {
          errorNotification('You Can Only Upload Images with 360*360 dimentions!');
        }
      };
    } else {
      setImage(null);
    }
  };

  const onFinish = () => {
    setBtnLoading(true);
    const verifyParams = {
      emailId: email,
      phoneNumber: phoneNumber,
      userType: 'merchant',
    };

    email_phone_verify(verifyParams)
      .then((resp) => {
        if (resp.success) {
          const params = {
            User_Name: userName.trim(),
            Email_ID: email.trim(),
            Password: password,
            Phone_Number: phoneNumber,
            Store_Name: name.trim(),
            GST_Number: gstNumber,
            Country: selectedCountry ? get(selectedCountry, 'Country_Name') : '',
            State: get(selectedState, 'State_Name'),
            City: get(selectedCity, 'City_Name'),
            Country_Id: countryId,
            State_Id: stateId,
            Pincode: zipCode,
          };
          sellerRegister(params, selectedFileList).then((res) => {
            if (res.success) {
              signupPageValidation(false);
              forgotPageValidation(false);
              successNotification('User Registered Successfully!');
              navigate('/');
              empty();
              setBtnLoading(false);
            } else {
              errorNotification('Unable to Register!');
              setBtnLoading(false);
            }
          });
        }
      });

  };

  const prev = () => {
    setCurrent(current - 1);
    setSteps(steps - 1);
  };

  const validateCurrentPage = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo) {
      return false;
    }
  };

  const customRules = [
    {
      required: true,
      message: <span style={{ marginLeft: '5px' }}>Please Select Your Profile Picture!</span>,
    },
  ];
  const clickHandler = () => {
    logoHandler.current.click();
  };
  const onNextClick = async () => {
    const isValid = await validateCurrentPage();

    if (current === 1) {
      const verifyParams = {
        emailId: email,
        phoneNumber: undefined,
        userType: 'merchant',
      };
      email_phone_verify(verifyParams)
        .then(() => {
          if (password !== confirmPassword) {
            return;
          } else if (password === confirmPassword && !uniqueEmailErr && isValid && !passwordcheck && !passwordValidate) {
            setCurrent(current + 1);
            setSteps(steps + 1);
          }
        }).catch((err) => {
          const mailErr = get(err, 'error.mailError', '');
          const phoneErr = get(err, 'error.phoneError', '');
          if (mailErr) {
            return setUniqueEmailerr(true);
          } else if (phoneErr && current) {
            return setUniquePhoneNumberErr(true);
          }
        });
    } else if (current === 2) {
      const verifyParams = {
        emailId: email,
        phoneNumber: phoneNumber,
        userType: 'merchant',
      };
      email_phone_verify(verifyParams)
        .then(() => {
          if (!selectedState && stateIsRequired) {
            setStateErr(true);
          }
          if (!selectedCity && cityIsRequired) {
            setCityErr(true);
          } if (!(!selectedState && stateIsRequired) && !(!selectedCity && cityIsRequired) && !uniquePhoneNumberErr && isValid) {
            setCurrent(current + 1);
            setSteps(steps + 1);
          }
        }).catch((err) => {
          const phoneErr = get(err, 'error.phoneError', '');
          if (phoneErr) {
            return setUniquePhoneNumberErr(true);
          }
        });
    }
  };
  return (
    <div>
      <div className='signup-div'>
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          className='form'
        >
          {current < 2 && (
            <div className='form-sign-up'>
              <p>Sign Up</p>
            </div>
          )}
          {current > 1 && (
            <div className='form-signup-mobrow'>
              <Row>
                <Col sm={3} xs={3} md={0} lg={0}>
                  <div><img src={SignupBackButton} alt='sign-up-back' onClick={() => prev()} /></div>
                </Col>
                <Col sm={21} xs={21} md={24} lg={24}>
                  <div className='signup-label'>Sign Up</div>
                </Col>
              </Row>
            </div>
          )}
          {/* {current > 2 && (
            <div className='form-sign-up'>
              <p>Subscription</p>
            </div>
          )} */}
          {current === 1 &&
            <div>
              <Form.Item
                className='form-item-signup'
                name='entityName'
                label='Publishing Entity Name'
                rules={[{
                  required: true,
                  message: 'Please Enter Your Entity Name'
                }]}
              >
                <Input
                  placeholder='Enter Your Entity Name'
                  onChange={e => setName(e.target.value)}
                  value={name} />
              </Form.Item>
              <Form.Item
                className='form-item-signup'
                name='username'
                label='Username'
                rules={[{
                  required: true,
                  message: 'Please Enter Your Username'
                }]}
              >
                <Input
                  placeholder='Enter Your Username'
                  onChange={e => setUserName(e.target.value)}
                  value={userName} />
              </Form.Item>
              <Form.Item
                className='form-item-signup'
                name='email'
                label='Email Address'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please Enter Your Email Address',
                  },
                ]}
              ><div>
                  <Input
                    placeholder='Enter Your Email Address'
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                  />
                  {uniqueEmailErr === true && (
                    <div className='error'>This email is already taken. Please choose a different one.</div>
                  )}
                </div>
              </Form.Item>
              <Form.Item
                className='form-item-password'
                name='password'
                label='Password'
                required
                rules={[{
                  required: true,
                  message: 'Please Enter Your Password'
                }]}
              >
                <div>
                  <Input.Password
                    className='password-label'
                    autoComplete="new-password"
                    placeholder='Enter Your Password'
                    onChange={handlePasswordChange}
                    onBlur={handleBlur}
                    value={password}
                  />

                  {(passwordcheck || passwordValidate) && (
                    <div className='password-condition-check-div' id="passwordRulesDiv">
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
                              <p className={upperCaseClass} >
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
                  )
                  }
                </div>
              </Form.Item>
              <Form.Item
                className='form-item-password'
                name='confirmPassword'
                label='Confirm Password'
                rules={[{
                  required: true,
                  message: 'Please Enter Your Confirm Password'
                }, ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                })]}
              >
                <Input.Password
                  className='password-label'
                  placeholder='Enter Your Confirm Password'
                  onChange={(e) => handleConfirmPasswordChange(e)}
                  value={confirmPassword} />
              </Form.Item>
              <Form.Item
                className='form-item-signup'
                name='gstNumber'
                label='GST Number'
              >
                <Input
                  placeholder='Enter Your GST Number'
                  onChange={e => setGstNumber(e.target.value)}
                  value={gstNumber} />
              </Form.Item>
              <div className='sign-in-link-div'>Already have an account?  <a className="sign-in-link" onClick={signIn}>
                Sign In
              </a></div>

            </div>
          }
          {current === 2 &&
            <div>
              <Form.Item
                className='form-item-signup'
                name='phoneNumber'
                label='Phone Number'
                rules={[{
                  required: true,
                  message: 'Please Enter Your Phone Number'
                }]}
              >
                <div>
                  <Input
                    placeholder='Enter Your Phone Number'
                    onChange={(e) => handlePhoneNumberChange(e)}
                    value={phoneNumber} />
                  {uniquePhoneNumberErr && (
                    <div className='error'>This Phone Number is Already Taken. Please Choose a Different One!</div>
                  )}
                </div>
              </Form.Item>
              <Form.Item
                className='form-item-select'
                name="region"
                label="Region"
                rules={[{
                  required: true,
                  message: 'Please Enter Your Region'
                }]}
              >
                <Select
                  placeholder='Select Country'
                  showSearch
                  onSearch={() => getCountry()}
                  onChange={handleCountryChange}
                  value={selectedCountry?.Country_Name}
                  optionFilterProp="children"
                >
                  {regionDatas.map((country) => (
                    <Select.Option key={country.Country_Name} value={country.Country_Id} onClick={() => handleCountryChange(country)}>
                      {country.Country_Name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className='form-item-select'
                required={stateIsRequired}
                label="State/Province"
              >
                <Select
                  style={{ marginTop: '1%', marginBottom: '2%' }}
                  placeholder='Select State/Province'
                  showSearch
                  onSearch={(e) => getState(e)}
                  onChange={handleStateChange}
                  value={selectedState?.State_Name}
                  optionFilterProp="children"
                  disabled={!selectedCountry}
                >
                  {stateData.map((state) => (
                    <Select.Option key={state.State_Name} value={state.State_Id} onClick={() => handleStateChange(state)}>
                      {state.State_Name}
                    </Select.Option>
                  ))}
                </Select>
                {stateErr === true && (
                  <div className='error'>Please Select State/Province!</div>
                )}
              </Form.Item>
              <Form.Item
                className='form-item-select'
                required={cityIsRequired}
                label="City/County"
              >
                <Select
                  style={{ marginTop: '1%', marginBottom: '2%' }}
                  placeholder="Select City"
                  showSearch
                  onChange={handleCityChange}
                  value={selectedCity?.City_Id}
                  onSearch={(e) => getCities(e)}
                  disabled={!selectedState}
                  optionFilterProp="children"
                >
                  {cityData?.map((city) => (
                    <Select.Option key={city.City_Name} value={city.City_Id} onClick={() => handleCityChange(city)}>
                      {city.City_Name}
                    </Select.Option>
                  ))}
                </Select>
                {cityErr === true && (
                  <div className='error'>Please Select City/County!</div>
                )}
              </Form.Item>
              <Form.Item
                className='form-item-signup'
                name='zipcode'
                label='Zipcode'
                rules={[{
                  required: true,
                  message: 'Please Enter Your Zipcode'
                }]}
              >
                <Input
                  placeholder='Enter Your Zipcode'
                  onChange={e => setZipCode(e.target.value)}
                  value={zipCode} />
              </Form.Item>

            </div>
          }
          {current === 3 &&
            <div>
              <Form.Item
                className='profile-pic'
                name='profilePic'
                rules={customRules}>
                <div
                  className="user-img-logo-content"
                  onMouseLeave={cameraIconHandlerHide}
                >
                  <div
                    className="profile-head"
                    onMouseEnter={cameraIconHandlerDisplay}
                  >
                    <div className="profile-logo-img">
                      <div className='image-container'>
                        {image && (
                          <img src={image} style={{ width: '200px', height: '130px', borderRadius: '5px' }} />)}
                      </div>
                      <div className={image ? 'add-profile-img-selected' : 'add-profile'}>{!image && (<div className='button-div'><div className='image-div'><img src={addProfileCameraIcon} alt='camera' /></div><span>Add Profile </span></div>)}</div>
                    </div>
                  </div>
                  <div
                    className={
                      cameraIconDisplay ? 'camera-icon-hide' : 'camera-icon'
                    }
                    onClick={clickHandler}
                  >
                    <img src={cameraIcon} alt="camera-icon" />
                    <input
                      type="file"
                      accept="image/*"
                      ref={logoHandler}
                      onChange={changeLogoHandler}
                      className="input"
                    />
                  </div>
                </div>

              </Form.Item>
            </div>
          }
          {/* {
            current === 3 && (
              <div>
                <Cards />
                <Button className='payment'>Make Payment</Button>
              </div>
            )
          } */}
          <div className='lower-div'>
            <Row>
              <Col sm={5} xs={5} md={6} lg={10}>
                <div className='steps-div'>
                  <div className={current === 3 ? 'steps-current2' : 'steps'}>
                    {`Step  ${steps}/3`}
                  </div>
                </div>
              </Col>
              <Col sm={0} xs={0} md={4} lg={4}>
                <div className='prev-btn-div'>
                  {current > 1 && (
                    current < 4 && (
                      current === 3 ?
                        <div className='left-align'><div className='prev-button-current2'><Button className='prev' onClick={() => prev()}>
                          <img src={frontArrow} alt='front-arrow' />
                        </Button></div></div> :
                        <div className='left-alignment'><div className='prev-button'><Button className='prev' onClick={() => prev()}>
                          <img src={frontArrow} alt='front-arrow' />
                        </Button></div></div>
                    )
                  )}
                </div>
              </Col>
              <Col sm={19} xs={19} md={14} lg={10}>
                <div className='next-btn-div'>
                  {current === 1 ?
                    <Form.Item>
                      <div className='right-align-btn'><Button className='next-button' onClick={onNextClick}><div className='button-div'><span>Next </span><div className='backArrow'><img src={backArrow} alt='back-arrow' /></div></div></Button></div>
                    </Form.Item> :
                    current === 2 ?
                      <Form.Item>
                        <div className='right-align-btn'><Button className='next-button-current1' onClick={onNextClick}><div className='button-div'><span>Next </span><div className='backArrow'><img src={backArrow} alt='back-arrow' /></div></div></Button></div>
                      </Form.Item> :
                      <Form.Item>
                        <div className='signup-btn-div'>
                          <Button
                            htmlType="submit"
                            className='signup-button' loading={btnLoading}>Sign Up</Button>
                        </div>
                      </Form.Item>
                  }
                </div></Col>
            </Row>
          </div>
        </Form>

      </div>
    </div>
  );
};

export default SignupForm;