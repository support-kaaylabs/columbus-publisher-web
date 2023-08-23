import React, { type FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import DefaultUser from '../../assets/defaultUser.png';
import './index.scss';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId } from '../../shared/urlHelper';
import { CameraOutlined } from '@ant-design/icons';
import cameraIcon from '../Home/Images/profilepicCamera.svg';

const { Meta } = Card;

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

const Profile: FC = () => {
  const [image, setImage] = useState<any>();
  const [userName, setUserName] = useState<any>();
  const [gstNumber, setGstNumber] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [countryId, setCountryId] = useState<any>();
  const [stateData, setStateData] = useState<any[]>([]);
  const [stateId, setStateId] = useState<any>();
  const [cityValue, setCityValue] = useState<any>();
  const [cityData, setCityData] = useState<any[]>([]);
  const [email, setEmail] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [zipCode, setZipCode] = useState<any>();
  const [editClick, setEditClick] = useState<boolean>();
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [selectedFileList, setSelectedFileList] = useState({});


  const logoHandler = useRef<any>(null);

  const [form] = Form.useForm();

  const handleEntityNameChange = (e: any) => {
    setUserName(e.target.value);
  };


  const user_Name: any = localStorage.getItem('User_Name');
  const handleEditProfile = () => {
    setEditClick(true);
  };

  useEffect(() => {
    setImage(localStorage.getItem('Image') === 'null' ? DefaultUser : localStorage.getItem('Image'));
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

  const searchCities = () => {
    const params = { id: stateId, searchValue: cityValue };
    getAllCitiesByStateId(params).then((response) => {
      if (response.success) {
        setCityData(response.data);
      }
    });
  };
  const getCities = (value: any) => {
    setCityValue(value);
    searchCities();
  };

  const handleCountryChange = async (value: string) => {
    console.log('hjdkfjdkjfk');

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
    // setRegionErr(false);
  };
  const customRules = [
    {
      required: true,
      message: <span style={{ marginLeft: '5px' }}>Please Select Your Profile Picture!</span>,
    },
  ];

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
    // setStateErr(false);
  };
  const cameraIconHandlerHide = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCameraIconDisplay(true);
  };
  const cameraIconHandlerDisplay = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCameraIconDisplay(false);
  };
  const clickHandler = () => {
    logoHandler.current.click();
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

  const handlePhoneNumberChange = (e: any) => {
    setPhoneNumber(e.target.value.trim());
    // setPhoneNumberErr(false);
    // setUniquePhoneNumberErr(false);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    // setEmailErr(false);
    // setEmailValidErr(false);
    // setUniqueEmailerr(false);
  };

  const handleZipCode = (e: any) => {
    setZipCode(e.target.value.trim());
  };
  const handleCityChange = (value: string) => {
    const selectedCity = cityData.find((city) => city.City_Id === value);
    setSelectedCity(selectedCity || null);
  };
  return (
    <div>
      <div className='text-div'>
        <p>Profile</p>
      </div>
      <Row>
        <Col sm={24} md={6} xs={22} lg={6} xl={6} className='profile-col'>
          <Card

            cover={<img src={image} alt='profile-img' className='img' />}
          >
            {/* <div>
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
                            <img src={image} style={{ width: '200px', height: '130px', borderRadius: '10px' }} />)}
                        </div>
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
              </div> */}
            <Meta title={`${user_Name}`} />
            <div className='ant-btn-div'>
              <Button className='edit-profile-button' onClick={handleEditProfile}>Edit Profile</Button>
            </div>
          </Card>
        </Col >
        <Col sm={0} md={17} xs={0} lg={18} xl={18} className='form-col'>
          <div className='right-Column-div'>
            <div >
              <Form
                name='basic'
                size={'large'}
                form={form}
                autoComplete='off'
                initialValues={{ remember: true }}
                className='form'
                layout='vertical'
              // onFinish={handleSubmit}
              >
                <Row className='form-row'>
                  <Col sm={0} md={9} xs={0} lg={12} xl={12} className='form-col'>
                    <Form.Item
                      className='form-item'
                      name="entity"
                      label="Publishing Entity Name"

                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Publishing Entity Name!',
                        },
                      ]}>
                      <Input
                        type='text'
                        placeholder='Enter Publishing Entity Name'
                        onChange={(e) => handleEntityNameChange(e)}
                        value={userName}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    <Form.Item
                      className='form-item'
                      label='GST Number'
                      colon={false}
                      rules={[{ required: true, message: 'Please Enter GST Number!' }]}>
                      <Input
                        type='text'
                        placeholder='Enter your GST Number'
                        onChange={(e) => setGstNumber(e.target.value.trim())}
                        value={gstNumber}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    <Form.Item
                      className='form-item'
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
                      // disabled={editClick? false:true}
                      >
                        {regionDatas.map((country) => (
                          <Select.Option key={country.Country_Name} value={country.Country_Id} onClick={() => handleCountryChange(country)}>
                            {country.Country_Name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className='form-item'
                      name="State"
                      label="State/Province"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter State!',
                        },
                      ]}>
                      <Select
                        style={{ marginTop: '-2%', marginBottom: '10px' }}
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
                    </Form.Item>
                    {editClick && (
                      <Form.Item>
                        <Button>Cancel</Button>
                      </Form.Item>
                    )}
                  </Col>
                  <Col sm={0} md={9} xs={0} lg={12} xl={12} className='form-col'>
                    <Form.Item
                      className='form-item'
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
                        value={email}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    <Form.Item
                      className='form-item'
                      name="phone"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Phone Number!',
                        },
                      ]}>
                      <Input
                        type='number'
                        pattern="[0-9]{10}"
                        placeholder='Please Enter Your Phone Number'
                        onChange={(e) => handlePhoneNumberChange(e)}
                        value={phoneNumber}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    <Form.Item
                      className='form-item'
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
                    </Form.Item>
                    <Form.Item
                      className='form-item'
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
                        value={zipCode}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    {editClick && (
                      <Form.Item>
                        <Button htmlType="submit">Save</Button>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
