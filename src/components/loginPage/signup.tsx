import React, { useState, type FC, useEffect, useRef, MouseEvent } from 'react';
import { Form, Input, Button, Steps, Upload, Progress, Select, Popover } from 'antd';
import { CameraOutlined, ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import Cards from './card';
import { useNavigate } from 'react-router-dom';
import { successNotification, errorNotification } from '../../../src/shared/globalVariables';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_phone_verify, sellerRegister, imageUpload, getImageLocate } from '../../../src/shared/urlHelper';
import { get } from 'lodash';

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
  const [errorType, setErrorType] = useState<any>('');
  const [errorText, setErrorText] = useState<any>('');
  const [entityErr, setEntityErr] = useState<boolean>(false);
  const [userNameErr, setUserNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailValidErr, setEmailValidErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordTestErr, setPasswordTestErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);
  const [testConfirmPassword, setTestConfirmPassword] = useState<boolean>(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const [phoneNumberTestErr, setPhoneNumberTestErr] = useState<boolean>(false);
  const [regionErr, setRegionErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [zipcodeErr, setZipcodeErr] = useState(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);


  const [loading, setLoading] = useState(false);

  const logoHandler = useRef<any>(null);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [image, setImage] = useState<any>();

  const navigate = useNavigate();

  const onNextClick = async () => {
    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pass = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const verifyParams = {
      emailId: email,
      phoneNumber: phoneNumber,
      userType: 'merchant',
    };
    const passwordTest = pass.test(password);
    if (current === 0) {
      email_phone_verify(verifyParams)
        .then((resp) => {
          console.log(resp, 'resdfkdj');
        }).catch((err => {
          return setUniqueEmailerr(true);
        }));
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
      if (password === confirmPassword && email && name && userName) {
        if (entityErr || userNameErr || passwordErr || passwordTestErr || testConfirmPassword) {
          console.log('error');
        } else {
          setCurrent(current + 1);
          setSteps(steps + 1);
        }

      }
    } else if (current === 1) {
      if (!phoneNumber) {
        setPhoneNumberErr(true);
      }
      if (phoneNumber?.length !== 10) {
        setPhoneNumberTestErr(true);
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
      if (phoneNumber && selectedCountry && selectedState && selectedCity && zipCode) {
        setCurrent(current + 1);
        setSteps(steps + 1);
      }
    } else if (current === 2) {
      if (selectedFileList) {
        setCurrent(current + 1);
        setSteps(steps + 1);
      }
    }

  };
  const uploadButton = (
    <Button className='buttonImage' style={{ backgroundColor: 'transparent' }}>
      <CameraOutlined /> Add Profile
    </Button>
  );
  const prev = () => {
    setCurrent(current - 1);
    setSteps(steps - 1);
  };

  const fileSize = (size: any) => {
    const isSize = size / 1024 / 1024 < 0.5;
    return isSize;
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
  const evaluatePasswordStrength = (password: any) => {
    const lengthRegex = /.{8,}/;
    const specialCharacterRegex = /[^A-Za-z0-9]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;

    let strength = 0;

    if (lengthRegex.test(password)) {
      strength += 20;
    }

    if (specialCharacterRegex.test(password)) {
      strength += 20;
    }

    if (uppercaseRegex.test(password)) {
      strength += 20;
    }

    if (lowercaseRegex.test(password)) {
      strength += 20;
    }

    if (numberRegex.test(password)) {
      strength += 20;
    }

    return strength;
  };

  const passwordStrength = evaluatePasswordStrength(password);

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
    setName(e.target.value.trim());
    setEntityErr(false);
  };

  const handleUserNameChange = (e: any) => {
    setUserName(e.target.value.trim());
    setUserNameErr(false);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailErr(false);
    setEmailValidErr(false);
    setUniqueEmailerr(false);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value.trim());
    setPasswordErr(false);
    setPasswordTestErr(false);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value.trim());
    setConfirmPasswordErr(false);
    setTestConfirmPassword(false);
  };

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value.trim());
    setPhoneNumberErr(false);
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
            User_Name: userName,
            Email_ID: email,
            Password: password,
            Phone_Number: phoneNumber,
            Store_Name: name,
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

  const list = [{
    item: 'At least 8 characters'
  }, {
    item: 'Contains at least one uppercase letter'
  }, {
    item: 'Contains at least one lowercase letter'
  }, {
    item: 'Contains at least one special character'
  }, {
    item: 'Contains at least one number '
  }];

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
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    setImage(img.src);
    setSelectedFileList(fileUploaded);
  };

  return (
    <Form
      name='basic'
      size={'large'}
      form={form}
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
            ]}
            validateStatus={errorType === 'name' ? 'error' : ''}
            help={errorType === 'name' ? errorText : ''}>
            <Input
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
              type='email'
              placeholder='Enter Your Email Address'
              onChange={(e) => handleEmailChange(e)}
              value={email} />
            {(emailErr === true) && (
              <div className='error'>Please Enter Valid Email Address</div>
            )}
            {/* {emailValidErr === true && (
              <div className='error'>Please Enter Valid Email Address</div>
            )} */}
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
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Popover
              content={
                <div className='popover'>
                  <ul style={{ fontSize: '10px' }}>
                    {list.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <li>{item.item}</li>
                    ))}
                  </ul>
                </div>
              }
              placement="bottom"
            >
              <Input.Password
                className='password-label'
                minLength={8}
                type='password'
                placeholder='Enter your Password '
                onChange={(e) => handlePasswordChange(e)}
                value={password} />
            </Popover>
            {passwordStrength > 30 && (
              <>
                <Progress
                  type='line'
                  style={{ marginTop: 10, height: '1px', width: '100px' }}
                  percent={100}
                  size='small'
                  status='exception'
                  showInfo={false}
                />
                {passwordStrength > 30 && passwordStrength < 50 && (
                  <div className='error'>Your Password is Weak!</div>

                )}
              </>
            )}
            {passwordStrength > 50 && (
              <>
                <Progress
                  type='line'
                  style={{ marginTop: 10, height: '1px', width: '100px' }}
                  percent={100}
                  size='small'
                  showInfo={false}
                />
                {passwordStrength > 50 && passwordStrength < 80 && (
                  <div className='error'>Your Password is Good!</div>
                )}
              </>
            )}
            {passwordStrength > 80 && (
              <>
                <Progress
                  type='line'
                  style={{ marginTop: 10, height: '1px', width: '100px' }}
                  percent={100}
                  size='small'
                  showInfo={false}
                />
                <div className='error'>Your Password is Strong!</div>
              </>
            )}
            {passwordErr === true && (
              <div className='error'>Please Enter your Password</div>
            )}
            {passwordTestErr === true && (
              <div className='error'>Password must contain a minimum of 8 letters and at least one special character, one number, one Capital and one Small letters.</div>
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
              type='text'
              placeholder='Enter your GST Number'
              onChange={(e) => setGstNumber(e.target.value.trim())}
              value={gstNumber} />
          </Form.Item>
        </div>
      }
      {current === 1 &&
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
              type='tel'
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder='Please enter a 10-digit phone number.'
              onChange={(e) => handlePhoneNumberChange(e)}
              value={phoneNumber} />
            {phoneNumberErr === true && (
              <div className='error'>Please enter a 10-digit phone number.</div>
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
              <div className='error'>Please Please Enter Region!</div>
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
              <div className='error'>Please Please Enter State!</div>
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
              <div className='error'>Please Please Enter City/County!</div>
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
      {current === 2 &&
        <div>
          <Form.Item>
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
                </div>
              </div>
              <div
                className={
                  cameraIconDisplay ? 'camera-icon-hide' : 'camera-icon'
                }
                onClick={clickHandler}
              >
                {uploadButton}
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
          <Form.Item>
            <div>
              <Button
                htmlType="submit"
                className='signup-button'>Sign Up</Button>
            </div>
          </Form.Item>
        </div>
      }
      {current === 3 && (
        <div>
          <Cards />
          <Button className='payment'>Make Payment</Button>
        </div>
      )}
      <div>
        <div className='prev-button-div' style={{ marginTop: '20px' }}>
          <div className='steps'>
            {`Step${steps}/4`}
          </div>
          {current > 0 && (
            <Button className='prev-button' onClick={() => prev()}>
              <ArrowLeftOutlined />
            </Button>
          )}
          {current < 3 && (
            <Button className='next-button' onClick={onNextClick}>Next    <ArrowRightOutlined /></Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Signup;

