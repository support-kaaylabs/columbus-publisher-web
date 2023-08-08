import React, { useState, type FC, useEffect, useRef, MouseEvent } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { CameraOutlined, ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Cards from './card';
import { useNavigate } from 'react-router-dom';
import { successNotification, errorNotification } from '../../../src/shared/globalVariables';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_phone_verify, sellerRegister } from '../../../src/shared/urlHelper';
import { get } from 'lodash';
import cameraIcon from '../Home/Images/profilepicCamera.svg';
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

interface signupProps {
  signupPageValidation: any;
  forgotPageValidation: any;
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

const Signup: FC<signupProps> = ({ signupPageValidation, forgotPageValidation }) => {

  const [form] = Form.useForm();

  const [password, setPassword] = useState('');
  const [current, setCurrent] = useState(0);
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityValue, setCityValue] = useState<any>();
  const [countryId, setCountryId] = useState<any>();
  const [stateId, setStateId] = useState<any>();
  const [selectedFileList, setSelectedFileList] = useState({});
  const [steps, setSteps] = useState(1);
  const [name, setName] = useState<any>();
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [gstNumber, setGstNumber] = useState<any>('');
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [zipCode, setZipCode] = useState<any>();
  const [entityErr, setEntityErr] = useState<boolean>(false);
  const [userNameErr, setUserNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailValidErr, setEmailValidErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordTestErr, setPasswordTestErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);
  const [testConfirmPassword, setTestConfirmPassword] = useState<boolean>(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const [regionErr, setRegionErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [zipcodeErr, setZipcodeErr] = useState(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);
  const [uniquePhoneNumberErr, setUniquePhoneNumberErr] = useState(false);
  const [passwordcheck, setPasswordCheck] = useState<boolean>(false);
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

  const logoHandler = useRef<any>(null);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [image, setImage] = useState<any>();

  const navigate = useNavigate();

  const onNextClick = async () => {
    const upperCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    const digitRegex = /(?=.*?[0-9])/;
    const characterLengthRegex = /[a-zA-Z0-9].{7,}/;
    const specialCharRegex = /(?=.*[!@#$%^&*])/;
    const isUppercaseValidate = upperCaseRegex.test(password);
    const isDigitValidate = digitRegex.test(password);
    const isCharacterValidate = characterLengthRegex.test(password);
    const isSpecialCharValidate = specialCharRegex.test(password);
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
    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pass = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const passwordTest = pass.test(password);
    if (current === 0) {
      const verifyParams = {
        emailId: email,
        phoneNumber: undefined,
        userType: 'merchant',
      };
      email_phone_verify(verifyParams)
        .then(() => {
          if (!name) {
            setEntityErr(true);
          }
          if (!userName) {
            setUserNameErr(true);
          }
          if (!email) {
            setEmailErr(true);
          }
          if (reg.test(email) === false) {
            setEmailValidErr(true);
          }
          if (!password) {
            setPasswordErr(true);
          }
          if (!passwordTest) {
            setPasswordTestErr(true);
          }
          if (!confirmPassword) {
            setConfirmPasswordErr(true);
          }
          if (password !== confirmPassword) {
            setTestConfirmPassword(true);
          }
          if (password !== confirmPassword) {
            return;
          } else if (password === confirmPassword && email && name && userName && !emailValidErr && !uniqueEmailErr) {
            if (!entityErr && !userNameErr && !passwordErr && !passwordTestErr && !testConfirmPassword && isUppercaseValidate && isDigitValidate && isCharacterValidate && isSpecialCharValidate) {
              setCurrent(current + 1);
              setSteps(steps + 1);
            }
          }
        }).catch((err) => {
          const mailErr = get(err, 'error.mailError', '');
          const phoneErr = get(err, 'error.phoneError', '');
          if (mailErr && !current) {
            return setUniqueEmailerr(true);
          } else if (phoneErr && current) {
            return setUniquePhoneNumberErr(true);
          }
        });

    } else if (current === 1) {
      const verifyParams = {
        emailId: email,
        phoneNumber: phoneNumber,
        userType: 'merchant',
      };
      email_phone_verify(verifyParams)
        .then(() => {
          if (!phoneNumber) {
            setPhoneNumberErr(true);
          }
          if (!selectedCountry) {
            setRegionErr(true);
          }
          if (!selectedState) {
            setStateErr(true);
          }
          if (!selectedCity) {
            setCityErr(true);
          }
          if (!zipCode) {
            setZipcodeErr(true);
          }
          if (phoneNumber && selectedCountry && selectedState && selectedCity && zipCode && !uniquePhoneNumberErr) {
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

  const prev = () => {
    setCurrent(current - 1);
    setSteps(steps - 1);
  };

  const handleCountryChange = async (value: string) => {
    setCountryId(value);
    const selectedCountry = regionDatas.find((country) => country.Country_Id === value);
    const country = selectedCountry?.Country_Id;
    setSelectedCountry(selectedCountry || null);
    const params = { id: country };
    await getAllStatesByCountryId(params).then((response) => {
      if (response) {
        setStateData(response.data);
      }
    });
    setSelectedState(null);
    setSelectedCity(null);
    setRegionErr(false);
  };

  const handleStateChange = (value: string) => {
    const selectedState = stateData.find((state) => state.State_Id === value);
    const stateId = selectedState.State_Id;
    setStateId(stateId);
    setSelectedState(selectedState || null);
    const params = { id: stateId };
    getAllCitiesByStateId(params).then((res) => {
      if (res) {
        setCityData(res?.data);
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

  useEffect(() => {
    getCountry();
  }, []);
  const handleEntityNameChange = (e: any) => {
    setName(e.target.value);
    setEntityErr(false);
  };

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value);
    setUserNameErr(false);
  };
  const customRules = [
    {
      required: true,
      message: <span style={{ marginLeft: '5px' }}>Please Select Your Profile Picture!</span>,
    },
  ];

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValidErr(false);
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
    setPasswordErr(false);
    setPasswordTestErr(false);
    setPasswordCheck(true);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value.trim());
    setConfirmPasswordErr(false);
    setTestConfirmPassword(false);
    setPasswordCheck(false);

  };

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value.trim());
    setPhoneNumberErr(false);
    setUniquePhoneNumberErr(false);
  };

  const handleZipCode = (e: any) => {
    setZipCode(e.target.value.trim());
    setZipcodeErr(false);
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
  const handleSubmit = () => {
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
            Country: selectedCountry?.Country_Name,
            Country_Id: countryId,
            State: selectedState?.State_Name,
            State_Id: stateId,
            City: selectedCity?.City_Name,
            Pincode: zipCode,
          };
          sellerRegister(params, selectedFileList).then((res) => {
            if (res.success) {
              signupPageValidation(false);
              forgotPageValidation(false);
              successNotification('User Registered Successfully');
              navigate('/');
              empty();
            } else {
              errorNotification('Unable to Register');
            }
          });
        }
      });

  };
  const clickHandler = () => {
    logoHandler.current.click();
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
      reader.readAsDataURL(fileUploaded);
    } else {
      setImage(null);
    }
    setSelectedFileList(fileUploaded);
  };

  return (
    <Form
      name='basic'
      size={'large'}
      form={form}
      autoComplete='off'
      initialValues={{ remember: true }}
      className='form'
      layout='vertical'
      onFinish={handleSubmit}
    >
      {current <= 2 && (
        <div className='form-sign-up'>
          <p>Sign Up</p>
        </div>
      )}
      {current > 2 && (
        <div className='form-sign-up'>
          <p>Subscription</p>
        </div>
      )}
      {current === 0 &&
        <div>
          <Form.Item
            className='form-item-signup'
            name="entity"
            label="Publishing Entity Name"
            rules={[
              {
                required: true,
                message: 'Please Enter Publishing Entity Name!',
              },
            ]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='text'
              placeholder='Enter Publishing Entity Name'
              onChange={(e) => handleEntityNameChange(e)}
              value={name} />
            {entityErr === true && (
              <div className='error'>Please Enter Publishing Entity Name</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name="username"
            label="UserName"
            rules={[
              {
                required: true,
                message: 'Please Enter UserName!',
              },
            ]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='text'
              placeholder='Enter your UserName'
              onChange={(e) => handleUserNameChange(e)}
              value={userName} />
            {userNameErr === true && (
              <div className='error'>Please Enter your UserName</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name='email'
            label='Email Address'
            required
            colon={false}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='email'
              placeholder='Enter Your Email Address'
              onChange={(e) => handleEmailChange(e)}
              value={email} />
            {emailValidErr === true && (
              <div className='error'>Please Enter Valid Email Address</div>
            )}
            {uniqueEmailErr === true && (
              <div className='error'>This email is already taken. Please choose a different one.</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name='password'
            label='Password '
            required
            colon={false}
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              className='password-label'
              minLength={8}
              autoComplete="new-password"
              type='password'
              placeholder='Enter your Password '
              onChange={(e) => handlePasswordChange(e)}
              value={password} />
            {passwordcheck && (
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
              <div className='error'>Please Enter your Password</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            required
            colon={false}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ]}>
            <Input.Password
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              className='password-label'
              placeholder='Enter your Confirm Password'
              onChange={(e) => handleConfirmPasswordChange(e)}
              value={confirmPassword}
            />
            {testConfirmPassword === true && (
              <div className='error'>Password and Confirm Password does not match</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='GST Number'
            colon={false}
            rules={[{ required: true, message: 'Please Enter GST Number!' }]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='text'
              placeholder='Enter your GST Number'
              onChange={(e) => setGstNumber(e.target.value.trim())}
              value={gstNumber} />
          </Form.Item>
        </div >
      }
      {
        current === 1 &&
        <div>
          <Form.Item
            className='form-item-signup'
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please Enter Phone Number!',
              },
            ]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='number'
              pattern="[0-9]{10}"
              placeholder='Please Enter Your Phone Number.'
              onChange={(e) => handlePhoneNumberChange(e)}
              value={phoneNumber} />
            {phoneNumberErr === true && (
              <div className='error'>Please enter your phone number.</div>
            )}
            {uniquePhoneNumberErr === true && (
              <div className='error'>This Phone Number is already taken. Please choose a different one.</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name="Region"
            label="Region"
            rules={[
              {
                required: true,
                message: 'Please Enter Region!',
              },
            ]}>
            <Select
              style={{ marginTop: '-2%', marginBottom: '10px' }}
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
            {regionErr === true && (
              <div className='error'>Please Select Region!</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name="State"
            label="State"
            rules={[
              {
                required: true,
                message: 'Please Enter State!',
              },
            ]}>
            <Select
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              placeholder='Select State'
              showSearch
              onSearch={(e) => getState(e)}
              onChange={handleStateChange}
              value={selectedState?.State_Name}
              optionFilterProp="children"
            >
              {stateData.map((state) => (
                <Select.Option key={state.State_Name} value={state.State_Id} onClick={() => handleStateChange(state)}>
                  {state.State_Name}
                </Select.Option>
              ))}
            </Select>
            {stateErr === true && (
              <div className='error'>Please Select State!</div>
            )}
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            name="City/County"
            label="City/County"
            rules={[
              {
                required: true,
                message: 'Please Enter City/County!',
              },
            ]}>
            <Select
              style={{ marginTop: '-2%', marginBottom: '10px' }}
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
            name="zip"
            label="ZipCode"
            rules={[
              {
                required: true,
                message: 'Please Enter ZipCode!',
              },
            ]}>
            <Input
              style={{ marginTop: '-2%', marginBottom: '10px' }}
              type='text'
              placeholder='Enter Zip code'
              onChange={(e) => handleZipCode(e)}
              value={zipCode} />
            {zipcodeErr === true && (
              <div className='error'>Please Enter Zip code</div>
            )}
          </Form.Item>
        </div>
      }
      {
        current === 2 &&
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
                  <img src={image} alt="" className="profile-img" />
                  <div className={image ? 'add-profile-img-selected' : 'add-profile'}><CameraOutlined />    Add Profile</div>
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
      {
        current === 3 && (
          <div>
            <Cards />
            <Button className='payment'>Make Payment</Button>
          </div>
        )
      }
      <div>
        <Row>
          <Col span={13}>
            {current < 2 ? (
              <div className='steps'>
                {`Step${steps}/3`}
              </div>
            ) : <div className='steps-current2'>
              {`Step${steps}/3`}
            </div>}
          </Col>
          <Col span={5}>
            {current > 0 && (
              current < 2 ?
                <Button className='prev-button' onClick={() => prev()}>
                  <ArrowLeftOutlined />
                </Button> :
                <Button className='prev-button-current2' onClick={() => prev()}>
                  <ArrowLeftOutlined />
                </Button>
            )}
          </Col>
          {current <= 2 && (
            <Col span={6}>
              {current === 0 ?
                <Button className='next-button' onClick={onNextClick}>Next     <ArrowRightOutlined /></Button> :
                current === 1 ?
                  <Button className='next-button-current1' onClick={onNextClick}>Next    <ArrowRightOutlined /></Button>:
                  <Form.Item>
                    <div>
                      <Button
                        htmlType="submit"
                        className='signup-button'>Sign Up</Button>
                    </div>
                  </Form.Item>
              }
            </Col>
          )}
        </Row>
        {/* <div className='prev-button-div' style={{ marginTop: '20px' }}>
          {current < 2 ? (
            <div className='steps'>
              {`Step${steps}/3`}
            </div>
          ) : <div className='steps-current2'>
            {`Step${steps}/3`}
          </div>}
          {current > 0 && (
            current < 2 ?
              <Button className='prev-button' onClick={() => prev()}>
                <ArrowLeftOutlined />
              </Button> :
              <Button className='prev-button-current2' onClick={() => prev()}>
                <ArrowLeftOutlined />
              </Button>
          )}
          {current < 2 && (
            current === 0 ?
              <Button className='next-button' onClick={onNextClick}>Next    <ArrowRightOutlined /></Button> :
              <Button className='next-button-current1' onClick={onNextClick}>Next    <ArrowRightOutlined /></Button>
          )}
          {current === 2 && (
            <Form.Item>
              <div>
                <Button
                  htmlType="submit"
                  className='signup-button'>Sign Up</Button>
              </div>
            </Form.Item>
          )}
        </div> */}
      </div>
    </Form>
  );
};

export default Signup;

