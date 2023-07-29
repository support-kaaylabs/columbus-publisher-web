import React, { useState, type FC, useEffect, useRef, MouseEvent } from 'react';
import { Form, Input, Button, Steps, Upload, message, Select, Popover } from 'antd';
import { CameraOutlined, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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

// interface signupProps {
//   signupPageValidation: any;
//   forgotPageValidation: any;
// }

const Signup: FC = () => {

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
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [steps, setSteps] = useState(1);
  const [name, setName] = useState<any>();
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [gstNumber, setGstNumber] = useState<any>();
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
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const [phoneNumberTestErr, setPhoneNumberTestErr] = useState<boolean>(false);
  const [regionErr, setRegionErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [zipcodeErr, setZipcodeErr] = useState(false);

  const [loading, setLoading] = useState(false);

  const logoHandler = useRef<any>(null);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [image, setImage] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();

  const navigate = useNavigate();

  const onNextClick = () => {
    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pass = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const passwordTest = pass.test(password);
    if (current === 0) {
      if (!name) {
        setEntityErr(true);
      }
      if (!userName) {
        setUserNameErr(true);
      }
      if (!email) {
        console.log('email');
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
        console.log('confirmPassword');
        setConfirmPasswordErr(true);
      }
      if (password === confirmPassword && email && name && userName) {
        setCurrent(current + 1);
        setSteps(steps + 1);
      } else {
        console.log('error');
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
        console.log('email');
        setStateErr(true);
      }
      if (!selectedCity) {
        setCityErr(true);
      }
      if (!zipCode) {
        console.log('confirmPassword');
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
    console.log(selectedCountry, 'selectessssCountyt', country);
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

  const beforeUpload = (file: any) => {
    const { type, size } = file;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png' || type === 'image/webp';
    const isLt500kb = fileSize(size);
    if (!isJpgOrPng || !isLt500kb) {
      (!isLt500kb ? 'Image must be smaller than 500KB!' : 'You can only upload JPG/PNG/WEBP file!');
    }
    return isJpgOrPng && isLt500kb;
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

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailErr(false);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value.trim());
    setPasswordErr(false);
    setPasswordTestErr(false);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value.trim());
    setConfirmPasswordErr(false);
  };

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberErr(false);
  };

  const handleZipCode = (e: any) => {
    setZipCode(e.target.value);
    setZipcodeErr(false);
  };

  const handleSubmit = () => {
    console.log(selectedCountry, 'cccccc');
    const params = {
      name,
      userName,
      email,
      password,
      confirmPassword,
      gstNumber,
      phoneNumber,
      selectedCountry,
      selectedState,
      selectedCity,
      zipCode,
      selectedFileList
    };
    console.log(params, ' pppppppp');
    // const userId: any = localStorage.getItem('User_ID');
    // console.log(userId, 'userijmlkdkl');
    // imageUpload(userId, '', selectedFileList).then((data: any) => {
    //   if (data.success) {
    //     console.log('innnn');
    //     getImageLocate().then((res: any) => {
    //       console.log('innnn...........');
    //       const image = get(res, 'data[0].Image', '');
    //       localStorage.setItem('Image', image);
    //       setSelectedImage(image);
    //     });
    //   }
    // });
    const sellerData = {
      User_Name: userName,
      Email_ID: email,
      Password: password,
      Phone_Number: phoneNumber,
      Image: selectedImage,
    };
    const verifyParams = {
      emailId: email,
      phoneNumber: phoneNumber,
      userType: 'merchant',
    };
    
    email_phone_verify(verifyParams)
      .then((resp) => {
        if (resp.success) {
          const params = {
            sellerDetails: sellerData,
            storeDetails: {
              Store_Name: name,
              GST_Number: gstNumber,
              Country: selectedCountry?.Country_Name,
              Country_Id: countryId,
              State: selectedState?.State_Name,
              State_Id: stateId,
              City: selectedCity?.City_Name,
              Phone_Number: phoneNumber,
              Pincode: zipCode,
              Store_Image: selectedImage,
            },
          };
          console.log(params, 'parammmmss');
          sellerRegister(params).then((res) => {
            if (res.success) {
              console.log(res, 'ressss');
              const userId: any = res.data.userId;
              imageUpload(userId, '', selectedFileList).then((data: any) => {
                if (data.success) {
                  console.log('innnn');
                  // signupPageValidation(false);
                  // forgotPageValidation(false);
                  navigate('/');
                }
              });
              successNotification('User Registered Successfully');
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
    const fileUploaded: any = [event.target.files[0]];
    console.log(fileUploaded, 'fileupppload');
    const userId: any = localStorage.getItem('User_ID');
    console.log(userId, 'userId');
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    console.log(img.src, 'srsrrsrsr');
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
            {emailErr === true  && (
              <div className='error'>Please Enter Valid Email Address</div>
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
                <div className='ant-popover-inner-content'>
                  {/* <p style={{marginTop: '10px'}}>Password requirements:</p> */}
                  <ul>
                    <li>At least 8 characters</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one lowercase letter</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>
              }
              placement="right"
            >
              <Input.Password
                className='password-label'
                type='password'
                placeholder='Enter your Password '
                onChange={(e) => handlePasswordChange(e)}
                value={password} />
            </Popover>
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}>
            <Input.Password
              className='password-label'
              placeholder='Enter your Confirm Password'
              onChange={(e) => handleConfirmPasswordChange(e)}
              value={confirmPassword}
            />
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
            {phoneNumberErr === true  &&(
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
            {/* <Upload
              name="avatar"
              listType="picture-card"
              
              // className="avatar-uploader"
              // showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // fileList={selectedFileList}
              beforeUpload={beforeUpload}
              onChange={handleMediaFile}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload> */}
            {/* <div className='upload'>
              <Upload
                className='upload'
                name='file'
                // listType="text"
                fileList={selectedFileList}
                multiple={false}
                beforeUpload={beforeUpload}
                onChange={handleMediaFile}
              >
                {/* {selectedFileList && (
                  <img src={`${selectedFileList}`}/>
                )} */}
            {/* {uploadButton}
              </Upload>
            </div> */}
          </Form.Item>
          <Form.Item>
            {/* <div>
              <Button className='signup-button'>Cancel</Button>
            </div> */}
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
              Previous
            </Button>
          )}
          {current < 3 && (
            <Button className='next-button' onClick={onNextClick}>Next</Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Signup;

