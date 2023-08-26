import React, { type FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import DefaultUser from '../../assets/defaultUser.png';
import './index.scss';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_verification, updateSellerDetails, phone_verification, storeImageUpload } from '../../shared/urlHelper';
import cameraIcon from '../Home/Images/profilepicCamera.svg';
import { getSellerDetails } from '../../shared/urlHelper';
import { errorNotification } from '../../../src/shared/globalVariables';
import { get } from 'lodash';
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
  // const [userName, setUserName] = useState<any>();
  // const [gstNumber, setGstNumber] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [countryId, setCountryId] = useState<any>();
  const [stateData, setStateData] = useState<any[]>([]);
  const [stateId, setStateId] = useState<any>();
  const [cityValue, setCityValue] = useState<any>();
  const [cityData, setCityData] = useState<any[]>([]);
  // const [email, setEmail] = useState<any>();
  // const [phoneNumber, setPhoneNumber] = useState<any>();
  // const [zipCode, setZipCode] = useState<any>();
  const [editClick, setEditClick] = useState<boolean>(false);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [selectedFileList, setSelectedFileList] = useState({});
  const [emailValidErr, setEmailValidErr] = useState<boolean>(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);
  const [uniquePhoneNumberErr, setUniquePhoneNumberErr] = useState(false);
  const [country, setCountry] = useState<any>();
  const [state, setState] = useState<any>();
  const [city, setCity] = useState<any>();
  const [values, setValues] = useState({
    storeName: '',
    userName: '',
    gstNumber: '',
    email: '',
    phoneNumber: '',
    zipCode: '',
  });
  const logoHandler = useRef<any>(null);

  const [form] = Form.useForm();

  const handleEntityNameChange = (e: any) => {
    setValues({ ...values, userName: e.target.value });
  };


  const user_Name: any = localStorage.getItem('User_Name');

  const handleEditProfile = () => {
    setEditClick(true);
  };

  useEffect(() => {
    getSeller();
    setImage(localStorage.getItem('Image') === 'null' ? DefaultUser : localStorage.getItem('Image'));
    getCountry();

  }, []);

  const getSeller = () => {
    getSellerDetails().then((res) => {
      console.log(res, 'resssssuuulllt');
      const userDetails = res.data[0];
      console.log(userDetails, 'userDetails');
      const sellerDetails = res.data[1];
      console.log(sellerDetails.Store_Name, 'sellerDetails');
      setValues({
        ...values, storeName: sellerDetails.Store_Name, userName: userDetails.User_Name,
        gstNumber: sellerDetails.GST_Number, email: userDetails.Email_ID, phoneNumber: userDetails.Phone_Number,
        zipCode: sellerDetails.Pincode
      });
      setImage(userDetails.Image);
      setCountry(sellerDetails.Country);
      setState(sellerDetails.State);
      setCity(sellerDetails.City);
    });
  };

  const { userName, storeName, gstNumber, email, phoneNumber, zipCode } = values;
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
    setState(null);
    setCity(null);
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
      const userId: any = localStorage.getItem('User_ID');
      reader.readAsDataURL(fileUploaded);
      storeImageUpload(userId, '', fileUploaded).then((data: any) => {
        if (data.success) {
          console.log(data, 'datatata');
        }
        setImage(image);
      });
    } else {
      setImage(null);
    }
    setSelectedFileList(fileUploaded);
  };

  const handlePhoneNumberChange = (e: any) => {
    setValues({ ...values, phoneNumber: e.target.value.trim() });
    setUniquePhoneNumberErr(false);
  };

  const handleEmailChange = (e: any) => {
    setValues({ ...values, email: e.target.value.trim() });
    setEmailValidErr(false);
    setUniqueEmailerr(false);
  };

  const handleZipCode = (e: any) => {
    setValues({ ...values, zipCode: e.target.value.trim() });
  };
  const handleCityChange = (value: string) => {
    const selectedCity = cityData.find((city) => city.City_Id === value);
    setSelectedCity(selectedCity || null);
  };
  const handleSubmit = async () => {
    console.log('jfhsdjkfhkjd');
    const userId = localStorage.getItem('User_ID');

    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const verifyParams = {
      emailId: email,
      phoneNumber: phoneNumber,
      userType: 'merchant',
    };
    const emailParams = {userId,emailId: email, userType: 'merchant'};
    const phoneParams = {userId,phoneNumber: phoneNumber, userType: 'merchant'};
    email_verification(emailParams).then((res)=>{
      console.log(res, 'resultttt');
      if(res){
        phone_verification(phoneParams).then((res)=>{
          console.log(res, 'phone response============>');
        }).catch((err)=>{
          console.log(err, 'errrrororo');
        });
      }
    }).catch((err)=>{
      console.log(err, 'errororor');
    });
    const params = {
      userDetails: {
        User_Name: userName,
        Email_ID: email,
        Phone_Number: phoneNumber,
      },
      sellerDetails: {
        Store_Name: storeName,
        GST_Number: gstNumber,
        Country: selectedCountry ? selectedCountry.Country_Name : country,
        State: selectedState ? selectedState.State_Name : state,
        City: selectedCity ? selectedCity.City_Name : city,
        Pincode: zipCode,
        Country_Id: countryId,
        State_ID: stateId,
      }

    };
    updateSellerDetails({userId},params).then((res) => {
      if (res.success) {
        console.log(res.success, 'successs');
      } else {
        errorNotification('Unable to Update');
      }
    });


  };
  const handleCancel = () => {
    setEditClick(false);
  };
  return (
    <div>
      <div className='text-div'>
        {editClick ? (<p>Edit Profile</p>) : (<p>Profile</p>)}
      </div>
      <Row>
        <Col sm={24} md={6} xs={22} lg={5} xl={5} className='profile-col'>
          {!editClick ? (
            <Card
              className='ant-card'
              cover={<img src={image} alt='profile-img' className='img' />}
            >
              <Meta title={`${storeName}`} />
              <div className='ant-btn-div'>
                <Button className='edit-profile-button' onClick={handleEditProfile}>Edit Profile</Button>
              </div>
            </Card>
          ) : (
            <Card
              cover={<img src={image} alt='profile-img' className='img' />}
            >
              <div className='edit-profile'>
                <div
                  className="user-img-logo-content"
                  onMouseLeave={cameraIconHandlerHide}
                >
                  <div
                    className="profile-head"
                    onMouseEnter={cameraIconHandlerDisplay}
                  >
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
                <Form.Item
                  className='store-ptag'
                  // name='store'
                  // colon={false}
                  rules={[{ required: true, message: 'Please Enter Store Name!' }]}>
                  <Input
                    className='edit-card-label'
                    type='text'
                    placeholder='Enter your GST Number'
                    onChange={(e) => setValues({ ...values, gstNumber: e.target.value.trim() })}
                    value={storeName}
                    disabled={editClick ? false : true}
                  />
                </Form.Item>
                {/* <div className='store-ptag'><label className='edit-card-label'>{`${storeName}`}</label></div> */}
              </div>
            </Card>
          )}
        </Col >
        <Col sm={0} md={18} xs={0} lg={19} xl={19} className='form-col'>
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
                onFinish={handleSubmit}
              >
                <Row className='form-row'>
                  <Col sm={0} md={9} xs={0} lg={12} xl={12} className='form-col'>
                    <Form.Item
                      className='form-item'
                      required
                      label="Username"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Username',
                        },
                      ]}>
                      <Input
                        type='text'
                        placeholder='Enter Your User Name'
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
                        onChange={(e) => setValues({ ...values, gstNumber: e.target.value.trim() })}
                        value={gstNumber}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                    <Form.Item
                      className='form-item-select'
                      required
                      label="Region"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Region!',
                        },
                      ]}>
                      <Select
                        style={{ marginTop: '-2%' }}
                        placeholder='Select Country'
                        showSearch
                        defaultValue={country}
                        onSearch={() => getCountry()}
                        onChange={handleCountryChange}
                        value={selectedCountry ? selectedCountry.Country_Id : country}
                        optionFilterProp="children"
                        disabled={editClick ? false : true}
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
                      required
                      label="State/Province"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter State!',
                        },
                      ]}>
                      <Select
                        style={{ marginTop: '-2%' }}
                        placeholder='Select State/Province'
                        showSearch
                        onSearch={(e) => getState(e)}
                        onChange={handleStateChange}
                        value={selectedState ? selectedState?.State_Id : state}
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
                        <div className='cancel-Button-div'>
                          <Button className='cancel-Button' onClick={handleCancel}>Cancel</Button>
                        </div>
                      </Form.Item>
                    )}
                  </Col>
                  <Col sm={0} md={9} xs={0} lg={12} xl={12} className='form-col'>
                    <Form.Item
                      className='form-item'
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
                      {emailValidErr === true && (
                        <div className='error'>Please Enter Valid Email Address</div>
                      )}
                      {uniqueEmailErr === true && (
                        <div className='error'>This email is already taken. Please choose a different one.</div>
                      )}
                    </Form.Item>
                    <Form.Item
                      className='form-item'
                      label="Phone Number"
                      required
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
                      {uniquePhoneNumberErr === true && (
                        <div className='error'>This Phone Number is already taken. Please choose a different one</div>
                      )}
                    </Form.Item>
                    <Form.Item
                      className='form-item-select'
                      required
                      label="City/County"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter City/County!',
                        },
                      ]}>
                      <Select
                        style={{ marginTop: '-2%' }}
                        placeholder="Select City"
                        showSearch
                        onChange={handleCityChange}
                        value={selectedCity ? selectedCity.City_Id : city}
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
                      required
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
                        <div className='submit-Button-div'>
                          <Button htmlType="submit" className='submit-Button'>Save</Button>
                        </div>
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
