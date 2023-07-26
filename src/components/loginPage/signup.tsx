import React, { useState, type FC, useEffect } from 'react';
import { Form, Input, Button, Steps, Upload, message, Select } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import Cards from './card';
import { getAllCountries, getAllStatesByCountryId, getAllCitiesByStateId } from '../../../src/shared/urlHelper';

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
const Signup: FC = () => {
  const [password, setPassword] = useState('');
  const [current, setCurrent] = useState(0);
  const [regionDatas, setRegionDatas] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const onNextClick = () => {
    if (current <= 1) {
      setCurrent(current + 1);
    }
  };

  const uploadButton = (
    <Button style={{ backgroundColor: 'transparent' }}>
      <CameraOutlined /> Add Profile
    </Button>
  );

  const prev = () => {
    setCurrent(current - 1);
  };

  const fileSize = (size: any) => {
    const isSize = size / 1024 / 1024 < 0.5;
    return isSize;
  };

  const handleCountryChange = async (value: string) => {
    console.log(value, 'yyyyyyyyyy');
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
  };

  const handleStateChange = (value: string) => {
    const selectedState = stateData.find((state) => state.State_Id === value);
    console.log(selectedState, 'statettette');
    const stateId = selectedState.State_Id;
    console.log(stateId, 'stateiiiidd');
    setSelectedState(selectedState || null);
    const params = { id: stateId };
    getAllCitiesByStateId(params).then((res) => {
      if (res) {
        setCityData(res?.data);
      }
    });
    setSelectedCity(null);
  };

  const handleCityChange = (value: string) => {
    const selectedCity = cityData.find((city) => city.City_Id === value);
    setSelectedCity(selectedCity || null);
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

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <Form
      name='basic'
      size={'large'}
      className='form'
      layout='vertical'
    >
      <Form.Item className='form-sign-up' style={{ marginTop: '20px' }}>
        <div>
          <p>Sign Up</p>
        </div>
      </Form.Item>
      {current === 0 &&
        <div>
          <Form.Item
            className='form-item-signup'
            label='Publishing Entity Name'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Publishing Entity Name!' }]}>
            <Input
              type='text'
              placeholder='Enter Publishing Entity Name' />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='UserName'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter UserName!' }]}>
            <Input
              type='text'
              placeholder='Enter your UserName' />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='Email Address'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Your Email Address!' }]}>
            <Input
              type='email'
              placeholder='Enter Your Email Address' />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='Password '
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Password !' }]}>
            <Input.Password
              className='password-label'
              type='password'
              placeholder='Enter your Password ' />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='Confirm Password'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Confirm Password!' }]}>
            <Input.Password
              className='password-label'
              placeholder='Enter your Confirm Password' 
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password}
            />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='GST Number'
            colon={false}
            rules={[{ required: true, message: 'Please Enter GST Number!' }]}>
            <Input
              type='text'
              placeholder='Enter your GST Number' />
          </Form.Item>
        </div>
      }
      {current === 1 &&
        <div>
          <Form.Item
            className='form-item-signup'
            label='Phone Number'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Phone Number!' }]}>
            <Input
              type='text'
              placeholder='Enter Phone Number' />
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='Region'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Region!' }]}>
            <Select
              placeholder='Select Country'
              onChange={handleCountryChange}
              value={selectedCountry?.Country_Name}
            >
              {regionDatas.map((country) => (
                <Select.Option key={country.Country_Name} value={country.Country_Id}>
                  {country.Country_Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='State/Province'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter State/Province!' }]}>
            <Select
              placeholder="Select State"
              onChange={handleStateChange}
              value={selectedState?.State_Id}
              disabled={!selectedCountry}
            >
              {stateData?.map((state) => (
                <Select.Option key={state.State_Id} value={state.State_Id}>
                  {state.State_Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='City/County'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter City/County!' }]}>
            <Select
              placeholder="Select City"
              onChange={handleCityChange}
              value={selectedCity?.City_Id}
              disabled={!selectedState}
            >
              {cityData.map((city) => (
                <Select.Option key={city.City_Id} value={city.City_Id}>
                  {city.City_Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='Zip code'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Zip code!' }]}>
            <Input
              type='text'
              placeholder='Enter Zip code' />
          </Form.Item>
        </div>
      }
      {current === 2 &&
        <div>
          <Form.Item>
            {/* <Avatar shape= 'square'></Avatar> */}
            <Upload
              name='avatar'
              listType='picture-card'
              className='upload'
              beforeUpload={beforeUpload}
            // onChange={handleMediaFile}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item className='subscription' label='Subscription'></Form.Item>
          <Cards />
        </div>
      }
      <div>
        <div className='prev-button-div' style={{ marginTop: '20px' }}>
          {current > 0 && (
            <Button className='prev-button' onClick={() => prev()}>
              Previous
            </Button>
          )}
          <Button className='next-button' onClick={onNextClick}>Next</Button>
        </div>
        <div>
          <Steps current={current} />
        </div>
      </div>
    </Form>
  );
};

export default Signup;

