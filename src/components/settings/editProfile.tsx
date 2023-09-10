import React,{type FC, useState, useEffect, MouseEvent, useRef} from 'react';
import {Form, Button, Input, Select, Card, Col, Row} from 'antd';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId, email_verification, updateSellerDetails, phone_verification, storeImageUpload } from '../../shared/urlHelper';
import { getSellerDetails } from '../../shared/urlHelper';
import { errorNotification, successNotification } from '../../../src/shared/globalVariables';
import { get } from 'lodash';
import cameraIcon from '../Home/Images/profilepicCamera.svg';
import defaultUser from '../../assets/defaultUser.png';
import { imageHeight, imageWidth } from '../../shared/helper';

const { Meta } = Card;

// interface Country {
//   Country_Id: number;
//   Country_Name: string;
// }

// interface State {
//   State_Id: string;
//   State_Name: string;
// }

// interface City {
//   City_Id: string;
//   City_Name: string;
// }

interface ImageUpdate{
  updateImage: any;
  editProfile: any;
}
const EditProfile: FC<ImageUpdate>=({updateImage, editProfile})=>{

  const [form] = Form.useForm();
  const logoHandler = useRef<any>(null);

  const [image, setImage] = useState<any>();
  const [loader, setLoader] = useState(false);
  const [editClick, setEditClick] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    storeName: '', userName: '',
    gstNumber: '',
    region: '' ,
    state: '' || null,
    city: '' || null,
    phoneNumber: '',
    zipcode: '',
    emailAddress: '',
    countryId: '' || null,
  });
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
  const [countryId, setCountryId] = useState<any>(null);
  const [stateId, setStateId] = useState<any>(null);
  const [cityValue, setCityValue] = useState<any>();
  const [stateErr, setStateErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateIsRequired, setStateIsRequired] = useState<boolean>(false);
  const [cityIsRequired, setCityIsRequired] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [uniqueEmailErr, setUniqueEmailerr] = useState(false);
  const [uniquePhoneNumberErr, setUniquePhoneNumberErr] = useState(false);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);

  const [entityName,setEntityName] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gst, setgst] = useState();
  const [zip,setZip] = useState();


  useEffect(()=>{
    getSeller();
    getCountry();
  },[editClick]);

  const getSeller = () => {
    setLoader(true);
    getSellerDetails().then((res) => {
      const userDetails = res.data[0];
      const sellerDetails = res.data[1];
      const initialFormValues = {storeName: sellerDetails.Store_Name, userName: userDetails.User_Name,
        gstNumber: sellerDetails.GST_Number,
        region: sellerDetails.Country,
        state: sellerDetails.State,
        city: sellerDetails.City,
        phoneNumber: userDetails.Phone_Number,
        zipcode: sellerDetails.Pincode,
        emailAddress: userDetails.Email_ID,
        stateId:sellerDetails.State_Id,
        countryId: sellerDetails.Country_Id
      };
      setEntityName(sellerDetails.Store_Name);
      setEmail(userDetails.Email_ID);
      setPhone(userDetails.Phone_Number);
      setSelectedState(sellerDetails.State);
      setSelectedCity(sellerDetails.City);
      form.setFieldsValue(initialFormValues);
      setInitialValues(initialFormValues);
      setLoader(false);
    });
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

  const handleCountryChange = async (value: string) => {
    setCityData([]);
    setStateId(null);
    setCountryId(value);
    const selectedCountry = regionDatas.find((country) => country.Country_Id === value);
    const country = selectedCountry?.Country_Id;
    setSelectedCountry(selectedCountry?.Country_Name);
    const params = { id: country };
    await getAllStatesByCountryId(params).then((response) => {
      if (response) {
        if(response.data.length === 0){
          setStateIsRequired(false);
          setStateData(response.data);
          setStateId(null);

        }else{
          setStateIsRequired(true);
          setStateData(response.data);
        }
      }
    });
    setCityIsRequired(false);
    setSelectedState(null);
    setSelectedCity(null);
  };
  const handleStateChange = (value: string) => {
    const selectedState = stateData.find((state) => state.State_Id === value);
    const stateId = selectedState.State_Id;
    setStateId(stateId);
    setSelectedState(selectedState?.State_Name);
    const params = { id: stateId };
    getAllCitiesByStateId(params).then((res) => {

      if (res) {
        if(res.data.length === 0){
          setCityIsRequired(false);
          setCityData(res.data);
        }else{
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
    setSelectedCity(selectedCity?.City_Name);
    setCityErr(false);
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
    const fileUploaded: any = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (fileUploaded) {
      const img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      img.onload=()=>{
        if (img.width === imageWidth && img.height === imageHeight) {
          const userId: any = localStorage.getItem('User_ID');
          reader.readAsDataURL(fileUploaded);
          storeImageUpload(userId, '', fileUploaded).then((data: any) => {
            setLoader(true);
            if (data.success) {
              getSeller();
              successNotification('Image Uploaded Successfully!');
              setImage(data.response.Location);
              localStorage.setItem('Image', `${data.response.Location}`);
              updateImage();
              setLoader(false);
            }else{
              errorNotification('You Can Only Upload JPG/PNG/JPEG/WEBP Images!');
            }
          });
        }else{
          errorNotification('You Can Only Upload Images with 360*360 dimentions!');
        }
      };
    }else {
      setImage(null);
    }
    // setSelectedFileList(fileUploaded);
  };
  const onFinish= async (values: any)=>{
    const {emailAddress,gstNumber,phoneNumber,region,state,city,zipcode,userName,storeName} = values;

    const userId = localStorage.getItem('User_ID');
    if (!selectedState && stateIsRequired) {
      return setStateErr(true);
    }
    if (!selectedCity && cityIsRequired) {
      return setCityErr(true);
    }
    const emailParams = { userId, emailId: emailAddress, userType: 'merchant' };
    const phoneParams = { userId, phoneNumber: phoneNumber, userType: 'merchant' };
    // setBtnLoading(true);
    await email_verification(emailParams).then((res) => {
      phone_verification(phoneParams).then(() => {
        const params = {
          userDetails: {
            User_Name: userName.trim(),
            Email_ID: emailAddress.trim(),
            Phone_Number: phoneNumber,
          },
          sellerDetails: {
            Store_Name: storeName.trim(),
            GST_Number: gstNumber,
            Country: selectedCountry,
            State: selectedState,
            City: selectedCity,
            Pincode: zipcode,
            Country_Id: countryId,
            State_Id: stateId,
          }
        };
        console.log('papapapappapapapa', params);
        if (!uniqueEmailErr && !uniquePhoneNumberErr && !(!selectedState && stateIsRequired) && !(!selectedCity && cityIsRequired) ) {
          updateSellerDetails({ userId }, params).then((res) => {
            if (res.success) {
              getSeller();
              successNotification('Updated Successfully');
              localStorage.setItem('User_Name', `${userName}`);
              localStorage.setItem('User_Email', `${emailAddress}`);
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
  
  const handleEditProfile = () => {
    setEditClick(true);
  };

  const onCancel =()=>{
    form.setFieldsValue(initialValues);
    setUniqueEmailerr(false);
    setUniquePhoneNumberErr(false);
    setStateErr(false);
    setCityErr(false);
    setEditClick(false);
  };

  const handleUserNameChange = (e: any) =>{
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) =>{
    setEmail(e.target.value);
    setUniqueEmailerr(false);
  };

  const handlePhoneNumberChange = (e: any) =>{
    setPhone(e.target.value);
    setUniquePhoneNumberErr(false);
  };

  const handleGSTNumberChange = (e: any) =>{
    setgst(e.target.value);
  };

  const handleZipcodeChange = (e: any) =>{
    setZip(e.target.value);
  };

  return(
    <>
      {/* {!loader? ( */}
      <div>
        <div className='text-div'>
          {editClick ? (<p>Edit Profile</p>) : (<p>Profile</p>)}
        </div>      
        <Form
          form={form}
          name='control-hooks'
          onFinish={onFinish}
          layout='vertical'
        >
          <Row>
            <Col sm={0} md={0} xs={0} lg={6} xl={6} className='profile-col'>
              {!editClick ? (
                <Card
                  className='ant-card'
                  cover={<img src={image? image: defaultUser} alt='profile-img' className='img' />}
                >
                  <Meta title={`${entityName}`} />
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
                    <div className='img-resolution'>Image should be in resolution of 360*360</div>
                    {/* <Form.Item
                        className='store-ptag'
                        name='storename'
                        rules={[{ required: true, message: 'Please Enter Store Name!' }]}>
                        <Input
                          className='edit-card-label'
                          type='text'
                          placeholder='Enter your Store Name'
                          onChange={(e) => handleStoreNameChange(e)}
                          value={`${storeName}`}
                          disabled={editClick ? false : true}
                        />
                      </Form.Item> */}
                    <Form.Item
                      className='store-ptag'
                      name='storeName'
                      rules={[{
                        required: true,
                        message: 'Please Enter Your Store Name'
                      }]}
                    >
                      <Input
                        className='edit-card-label'
                        placeholder='Enter Your Store Name'/>
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
                        <Meta title={`${entityName}`} />
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
                      <div className='img-resolution'>Image should be in resolution of 360*360</div>
                      <div className='form-store'>
                        {/* <Form.Item
                          className='form-storeName'
                          name='storename'
                          rules={[{ required: true, message: 'Please Enter Store Name!' }]}>
                          <Input
                            className='edit-card-label'
                            type='text'
                            placeholder='Enter your Store Name'
                            onChange={(e) => handleStoreNameChange(e)}
                            value={`${storeName}`}
                            disabled={editClick ? false : true}
                          />
                        </Form.Item> */}
                        <Form.Item
                          className='store-ptag'
                          name='storeName'
                          rules={[{
                            required: true,
                            message: 'Please Enter Your Store Name'
                          }]}
                        >
                          <Input
                            className='edit-card-label'
                            placeholder='Enter Your Store Name'/>
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
                  <Row className='form-row'>
                    <Col sm={24} md={12} xs={24} lg={12} xl={12} className='form-col'>
                      <Form.Item
                        className='form-item'
                        name='userName'
                        label='Username'
                        rules={[{
                          required: true,
                          message: 'Please Enter Your Username'
                        }]}
                      >
                        <Input
                          placeholder='Enter Your Username'
                          onChange={e=>handleUserNameChange(e)}
                          value={name}
                          disabled={!editClick}
                        />
                      </Form.Item>
                      <Form.Item
                        className='form-item'
                        name='emailAddress'
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
                      >
                        <div>
                          <Input
                            type='email'
                            placeholder='Enter Your Email Address'
                            onChange={(e)=>handleEmailChange(e)}
                            value={email}
                            disabled={!editClick}
                          />
                          {uniqueEmailErr === true && (
                            <div className='error'>This email is already taken. Please choose a different one.</div>
                          )}
                        </div>
                      </Form.Item>
                      <Form.Item
                        className='form-item'
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
                            onChange={(e)=>handlePhoneNumberChange(e)}
                            value={phone}
                            disabled={!editClick}
                          />
                          {uniquePhoneNumberErr && (
                            <div className='error'>This Phone Number is Already Taken. Please Choose a Different One!</div>
                          )}
                        </div>
                      </Form.Item>
                      <Form.Item
                        className='form-item'
                        name='gstNumber'
                        label='GST Number'
                      >
                        <Input
                          placeholder='Enter Your GST Number'
                          onChange={(e)=>handleGSTNumberChange(e)}
                          value={gst}
                          disabled={!editClick}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={12} xs={24} lg={12} xl={12} className='form-col'>
                      <Form.Item
                        className='form-item-select'
                        name='region'
                        label="Region"
                        rules={[{
                          required:true,
                          message: 'Please Select Region'
                        }]}
                      >
                        <Select
                          style={{ marginTop: '-1%', marginBottom: '10px' }}
                          placeholder='Select Country'
                          showSearch
                          onSearch={() => getCountry()}
                          onChange={handleCountryChange}
                          value={selectedCountry}
                          optionFilterProp="children"
                          disabled={!editClick}
                        >
                          {regionDatas.map((country: any) => (
                            <Select.Option key={country.Country_Name} value={country.Country_Id} onClick={() => handleCountryChange(country)}>
                              {country.Country_Name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className='form-item-select'
                        // name='state'
                        initialValue={selectedState}
                        required={stateIsRequired}
                        label="State/Province"
                      >
                        <Select
                          style={{ marginTop: '-1%', marginBottom: '10px' }}
                          placeholder='Select State/Province'
                          showSearch
                          onSearch={(e) => getState(e)}
                          onChange={handleStateChange}
                          value={selectedState}
                          optionFilterProp="children"
                          disabled={!editClick}
                        >
                          {stateData.map((state: any) => (
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
                        // name='city'
                        required = {cityIsRequired}
                        label="City/County"
                      >
                        <Select
                          style={{ marginTop: '-1%', marginBottom: '10px' }}
                          placeholder="Select City"
                          showSearch
                          onChange={handleCityChange}
                          value={selectedCity}
                          onSearch={(e) => getCities(e)}
                          optionFilterProp="children"
                          disabled={(editClick || !selectedState)? false: true}
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
                        className='form-item'
                        name='zipcode'
                        label='Zipcode'
                        rules={[{
                          required: true,
                          message: 'Please Enter Your Zipcode'
                        }]}
                      >
                        <Input
                          placeholder='Enter Your Zipcode'
                          onChange={(e)=>handleZipcodeChange(e)}
                          value={zip}
                          disabled={editClick ? false : true}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  {editClick && (
                    <Row className='cancel-div'>
                      <Col sm={24} md={12} xs={24} lg={12} xl={12} >
                        <Form.Item>
                          <div className='cancel-Button-div'>
                            <Button className='cancel-Button' onClick={onCancel}>Cancel</Button>
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
                </div>
              </div>
            </Col>
            {/* <Form.Item
              name='userName'
              label='Username'
              rules={[{
                required: true,
                message: 'Please Enter Your Username'
              }]}
            >
              <Input
                placeholder='Enter Your Username'/>
            </Form.Item>
            <Form.Item
              name='emailAddress'
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
            >
              <Input
                placeholder='Enter Your Email Address'
              />
              {uniqueEmailErr === true && (
                <div className='error'>This email is already taken. Please choose a different one.</div>
              )}
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label='Phone Number'
              rules={[{
                required: true,
                message: 'Please Enter Your Phone Number'
              }]}
            >
              <Input
                placeholder='Enter Your Phone Number'
              />
              {uniquePhoneNumberErr && (
                <div className='error'>This Phone Number is Already Taken. Please Choose a Different One!</div>
              )}
            </Form.Item>
            <Form.Item
              name='gstNumber'
              label='GST Number'
              rules={[{
                required: true,
                message: 'Please Enter Your GST Number'
              }]}
            >
              <Input
                placeholder='Enter Your GST Number'/>
            </Form.Item>
            <Form.Item
              className='form-item-select'
              name='region'
              label="Region"
              rules={[{
                required:true,
                message: 'Please Select Region'
              }]}
            >
              <Select
                style={{ marginTop: '-1%', marginBottom: '10px' }}
                placeholder='Select Country'
                showSearch
                onSearch={() => getCountry()}
                onChange={handleCountryChange}
                value={selectedCountry?.Country_Name}
                optionFilterProp="children"
              >
                {regionDatas.map((country: any) => (
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
                style={{ marginTop: '-1%', marginBottom: '10px' }}
                placeholder='Select State/Province'
                showSearch
                onSearch={(e) => getState(e)}
                onChange={handleStateChange}
                value={selectedState? selectedState.State_Name:state}
                optionFilterProp="children"
              >
                {stateData.map((state: any) => (
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
              required = {cityIsRequired}
              label="City/County"
            >
              <Select
                style={{ marginTop: '-1%', marginBottom: '10px' }}
                placeholder="Select City"
                showSearch
                onChange={handleCityChange}
                value={selectedCity?selectedCity.City_Id: city}
                onSearch={(e) => getCities(e)}
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
              name='zipcode'
              label='Zipcode'
              rules={[{
                required: true,
                message: 'Please Enter Your Zipcode'
              }]}
            >
              <Input
                placeholder='Enter Your Zipcode'/>
            </Form.Item> */}
            {/* <Form.Item>
              <Button htmlType='submit' 
                // loading={btnLoading}
              >Save</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Form.Item> */}
          </Row>
        </Form>
      </div>
      {/* ):('')} */}
    </>
  );
};

export default EditProfile;