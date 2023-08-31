import React, { type FC, useEffect, useState, MouseEvent, useRef } from 'react';
import { Row, Col, Card, Button, Form, Input, Select, Spin } from 'antd';
import './index.scss';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_verification, updateSellerDetails, phone_verification, storeImageUpload } from '../../shared/urlHelper';
import cameraIcon from '../Home/Images/profilepicCamera.svg';
import { getSellerDetails } from '../../shared/urlHelper';
import { errorNotification, successNotification } from '../../../src/shared/globalVariables';
import { get } from 'lodash';
import defaultUser from '../../assets/defaultUser.png';

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

interface ImageUpdate{
  updateImage: any;
  editProfile: any;
}
const Profile: FC<ImageUpdate> = ({updateImage, editProfile}) => {
  const [image, setImage] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [countryId, setCountryId] = useState<any>();
  const [stateData, setStateData] = useState<any[]>([]);
  const [stateId, setStateId] = useState<any>();
  const [cityValue, setCityValue] = useState<any>();
  const [cityData, setCityData] = useState<any[]>([]);
  const [emailErr, setEmailErr] = useState<any>(false);
  const [editClick, setEditClick] = useState<boolean>(false);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [selectedFileList, setSelectedFileList] = useState({});
  const [emailValidErr, setEmailValidErr] = useState<boolean>(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);
  const [uniquePhoneNumberErr, setUniquePhoneNumberErr] = useState(false);
  const [country, setCountry] = useState<any>();
  const [state, setState] = useState<any>();
  const [city, setCity] = useState<any>();
  const [phoneNumberErr, setPhoneNumberErr] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
    setValues({ ...values, userName: e.target.value.trim() });
  };

  const handleEditProfile = () => {
    setEditClick(true);
    getAllStatesById();
    getAllCitiesById();
    searchCities();
  };

  useEffect(() => {
    getSeller();
    getCountry();
  }, []);

  const getSeller = () => {
    setLoader(true);
    getSellerDetails().then((res) => {
      const userDetails = res.data[0];
      const sellerDetails = res.data[1];
      setValues({
        ...values, storeName: sellerDetails.Store_Name, userName: userDetails.User_Name,
        gstNumber: sellerDetails.GST_Number, email: userDetails.Email_ID, phoneNumber: userDetails.Phone_Number,
        zipCode: sellerDetails.Pincode
      });
      form.setFieldsValue({
        Store_Name: sellerDetails.Store_Name,
        User_Name: userDetails.User_Name,
        GST_Number: sellerDetails.GST_Number,
        Country: sellerDetails.Country,
        State: sellerDetails.State,
        City: sellerDetails.City,
        Phone_Number: userDetails.Phone_Number,
        Zip_Code: sellerDetails.Pincode,
        Email_Address: userDetails.Email_ID,
      });
      setImage(userDetails.Image);
      setCountry(sellerDetails.Country);
      setState(sellerDetails.State);
      setCity(sellerDetails.City);
      setCountryId(sellerDetails.Country_Id);
      setStateId(sellerDetails.State_Id);
      setLoader(false);
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

  const getState = (value?: any) => {
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

  const getAllStatesById = async () => {
    const params = { id: countryId };
    await getAllStatesByCountryId(params).then((response) => {
      if (response) {
        setStateData(response.data);
      }
    });
  };
  const getAllCitiesById = async () => {
    const params = { id: stateId };
    getAllCitiesByStateId(params).then((res) => {
      if (res) {
        setCityData(res?.data);
      }
    });
  };
  const handleCountryChange = async (value: string) => {
    setCountryId(value);
    const selectedCountry = regionDatas.find((country) => country.Country_Id === value);
    const country = selectedCountry?.Country_Id;
    setCountry(selectedCountry.Country_Name);
    setSelectedCountry(selectedCountry || null);
    const params = { id: country };
    await getAllStatesByCountryId(params).then((response) => {
      if (response) {
        setStateData(response.data);
      }
    });
    form.setFieldsValue({
      State: undefined,
      City: undefined,
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
    form.setFieldsValue({
      City: null,
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

  const changeLogoHandler = async (event: any) => {
    console.log('innnnn');
    const fileUploaded: any = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (fileUploaded) {
      const userId: any = localStorage.getItem('User_ID');
      reader.readAsDataURL(fileUploaded);
      storeImageUpload(userId, '', fileUploaded).then((data: any) => {
        setLoader(true);

        if (data.success) {
          getSeller();
          successNotification('Image Uploaded Successfully');
          setImage(data.response.Location);
          localStorage.setItem('Image', `${data.response.Location}`);
          updateImage();
          setLoader(false);
        }else{
          errorNotification('You Can Only Upload JPG/PNG/JPEG/WEBP Images ');
        }
      });
    } else {
      setImage(null);
    }
    setSelectedFileList(fileUploaded);
  };

  const handlePhoneNumberChange = (e: any) => {
    setValues({ ...values, phoneNumber: e.target.value.trim() });
    setUniquePhoneNumberErr(false);
    setPhoneNumberErr(false);
  };

  const handleEmailChange = (e: any) => {
    setValues({ ...values, email: e.target.value.trim() });
    setEmailValidErr(false);
    setUniqueEmailerr(false);
    setEmailErr(false);
  };
  const handleStoreNameChange = (e: any) => {
    setValues({ ...values, storeName: e.target.value.trim() });
  };
  const handleZipCode = (e: any) => {
    setValues({ ...values, zipCode: e.target.value.trim() });
  };
  const handleCityChange = (value: string) => {
    const selectedCity = cityData.find((city) => city.City_Id === value);
    setSelectedCity(selectedCity || null);
  };
  const handleSubmit = async () => {
    const userId = localStorage.getItem('User_ID');

    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailValidErr(true);
    }
    const emailParams = { userId, emailId: email, userType: 'merchant' };
    const phoneParams = { userId, phoneNumber: phoneNumber, userType: 'merchant' };
    setBtnLoading(true);
    await email_verification(emailParams).then((res) => {
      console.log('email Verified', res);
      phone_verification(phoneParams).then(() => {
        const params = {
          userDetails: {
            User_Name: userName.trim(),
            Email_ID: email.trim(),
            Phone_Number: phoneNumber,
          },
          sellerDetails: {
            Store_Name: storeName.trim(),
            GST_Number: gstNumber,
            Country: selectedCountry ? selectedCountry.Country_Name : country,
            State: selectedState ? selectedState.State_Name : state,
            City: selectedCity ? selectedCity.City_Name : city,
            Pincode: zipCode,
            Country_Id: countryId,
            State_Id: stateId,
          }
        };
        if (!uniqueEmailErr && !uniquePhoneNumberErr && !emailValidErr) {
          updateSellerDetails({ userId }, params).then((res) => {
            if (res.success) {
              getSeller();
              successNotification('Updated Successfully');
              localStorage.setItem('User_Name', `${userName}`);
              localStorage.setItem('User_Email', `${email}`);
              editProfile();
              setBtnLoading(false);
              setEditClick(false);
            } else {
              setBtnLoading(false);
              errorNotification('Unable to Update');
            }
          });
        } else {
          errorNotification('Please Fill All the Fields');
        }
      }).catch((err) => {
        const phoneErr = get(err, 'error.phoneError', '');
        if (phoneErr) {
          return setUniquePhoneNumberErr(true);
        }
      });
    }).catch((err) => {
      const mailErr = get(err, 'error.mailError', '');
      if (mailErr) {
        return setUniqueEmailerr(true);
      }
    });
  };
  const handleCancel = () => {
    setEditClick(false);
  };
  return (
    <>
      {!loader? (
        <div>
          <div className='text-div'>
            {editClick ? (<p>Edit Profile</p>) : (<p>Profile</p>)}
          </div>
          <Row>
            <Col sm={0} md={0} xs={0} lg={6} xl={6} className='profile-col'>
              {!editClick ? (
                <Card
                  className='ant-card'
                  cover={<img src={image? image: defaultUser} alt='profile-img' className='img' />}
                >
                  <Meta title={`${storeName}`} />
                  <div className='ant-btn-div'>
                    <Button  className='btn-edit' onClick={handleEditProfile}>Edit Profile</Button>
                  </div>
                </Card>
              ) : (
                <Card
                  cover={<img src={image? image: defaultUser} alt='profile-img' className='img' />}
                  loading={loader}
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
                      rules={[{ required: true, message: 'Please Enter Store Name!' }]}>
                      <Input
                        className='edit-card-label'
                        type='text'
                        placeholder='Enter your Store Name'
                        onChange={(e) => handleStoreNameChange(e)}
                        value={`${storeName}`}
                        disabled={editClick ? false : true}
                      />
                    </Form.Item>
                  </div>
                </Card>
              )}
            </Col >
            <Col sm={24} md={24} xs={24} lg={0} xl={0} className='mobile-profile-col'>
              {!editClick ? (
                <Card>
                  <Row>
                    <Col sm={12} md={12} xs={12} lg={0} xl={0} className='img-col'>
                      <img src={image? image: defaultUser} alt='profile-img' className='img' />
                    </Col>
                    <Col sm={12} md={12} xs={12} lg={0} xl={0} className='card-profile-body'>
                      <div>
                        <Meta title={`${storeName}`} />
                        <div className='ant-button-div'><Button className='ant-btn' onClick={handleEditProfile}>Edit Profile</Button></div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ) : (
                <Card>
                  <Row align='middle'>
                    <Col sm={12} md={12} xs={12} lg={0} xl={0}>

                      <div className='edit-profile'>
                        <div className='profile-img-div'>
                          <img src={image? image: defaultUser} alt='profile-img' className='img' />
                        </div>
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
                      </div>
                    </Col>
                    <Col sm={12} md={12} xs={12} lg={0} xl={0}>
                      <div className='form-store'>
                        <Form.Item
                          className='form-storeName'
                          rules={[{ required: true, message: 'Please Enter Store Name!' }]}>
                          <Input
                            className='edit-card-label'
                            type='text'
                            placeholder='Enter your Store Name'
                            onChange={(e) => handleStoreNameChange(e)}
                            value={`${storeName}`}
                            disabled={editClick ? false : true}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
            <Col sm={24} md={24} xs={24} lg={18} xl={18} className='form-col'>
              <div className='right-Column-div'>
                <div >
                  <Form
                    name="control-hooks"
                    size={'large'}
                    form={form}
                    autoComplete='off'
                    initialValues={{ remember: true }}
                    className='form'
                    layout='vertical'
                    onFinish={handleSubmit}
                  >
                    <Row className='form-row'>
                      <Col sm={24} md={12} xs={24} lg={12} xl={12} className='form-col'>
                        <Form.Item
                          className='form-item'
                          required
                          name="User_Name"
                          label="Username"
                          rules={[{ required: true, message: 'Enter Your Name' }]}                    >
                          <Input
                            type='text'
                            placeholder='Enter Your User Name'
                            onChange={(e) => handleEntityNameChange(e)}
                            disabled={editClick ? false : true}
                          />
                        </Form.Item>
                        <Form.Item
                          className='form-item'
                          name='Email_Address'
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
                          {emailValidErr === true && !emailErr && (
                            <div className='error'>Please Enter Valid Email Address</div>
                          )}
                          {uniqueEmailErr === true && (
                            <div className='error'>This email is already taken. Please choose a different one.</div>
                          )}
                        </Form.Item>
                        <Form.Item
                          className='form-item'
                          name='Phone_Number'
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
                          {phoneNumberErr === true && (
                            <div className='error'>Please Enter your Phone Number!</div>
                          )}
                          {uniquePhoneNumberErr === true && !phoneNumberErr && (
                            <div className='error'>This Phone Number is already taken. Please choose a different one</div>
                          )}
                        </Form.Item>
                        <Form.Item
                          className='form-item'
                          name='GST_Number'
                          label='GST Number'
                          colon={false}
                        >
                          <Input
                            type='text'
                            placeholder='Enter your GST Number'
                            onChange={(e) => setValues({ ...values, gstNumber: e.target.value.trim() })}
                            disabled={editClick ? false : true}
                          />
                        </Form.Item>
                        
                      </Col>
                      <Col sm={24} md={12} xs={24} lg={12} xl={12} className='form-col'>
                        <Form.Item
                          className='form-item-select'
                          name='Country'
                          required
                          label="Region"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Region!',
                            },
                          ]}>
                          <Select
                            // style={{ marginTop: '-2%' }}
                            placeholder='Select Country'
                            showSearch
                            onSearch={() => getCountry()}
                            onChange={handleCountryChange}
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
                          name='State'
                          required
                          label="State/Province"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter State!',
                            },
                          ]}>
                          <Select
                            // style={{ marginTop: '-2%' }}
                            placeholder='Select State/Province'
                            showSearch
                            onSearch={(e) => getState(e)}
                            onChange={handleStateChange}
                            optionFilterProp="children"
                            // disabled={!selectedCountry}
                            disabled={editClick ? false : true}
                          >
                            {stateData.map((state) => (
                              <Select.Option key={state.State_Name} value={state.State_Id} onClick={() => handleStateChange(state)}>
                                {state.State_Name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                       
                        <Form.Item
                          className='form-item-select'
                          name='City'
                          required
                          label="City/County"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter City/County!',
                            },
                          ]}>
                          <Select
                            style={{ marginTop: '-2%'}}
                            placeholder="Select City"
                            showSearch
                            onChange={handleCityChange}
                            onSearch={(e) => getCities(e)}
                            disabled={editClick  ? false : true}
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
                          name='Zip_Code'
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
                            disabled={editClick ? false : true}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {editClick && (
                      <Row className='cancel-div'>
                        <Col sm={24} md={12} xs={24} lg={12} xl={12} >
                          <Form.Item>
                            <div className='cancel-Button-div'>
                              <Button className='cancel-Button' onClick={handleCancel}>Cancel</Button>
                            </div>
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={12} xs={24} lg={12} xl={12}>
                          <Form.Item>
                            <div className='submit-Button-div'>
                              <Button loading={btnLoading}
                                htmlType="submit"
                                className='submit-Button'>Save</Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row> 
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ):(
        <Spin  className='spin-Loading' size="large" style={{alignSelf: 'center'}}/>
      )
      }
    </>
  );
};

export default Profile;
