import React, { useState, type FC, useEffect, useRef } from 'react';
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
  const [cityValue, setCityValue] = useState<any>();
  const [countryId, setCountryId] = useState<any>();
  const [stateId, setStateId] = useState<any>();
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [steps, setSteps] = useState(1);

  const onNextClick = () => {
    if (current <= 2) {
      setCurrent(current + 1);
      setSteps(steps + 1);
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

  const handleMediaFile = (files: any) => {
    const { fileList, file } = files;
    const { status } = file;
    if (status) {
      const imgFiles = fileList[0].name;
      setSelectedFileList(imgFiles);
    }
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

  const getState = (value: any) => {
    console.log(value, 'vvvvv');
    const params = { id: countryId, searchValue: value };
    console.log(params, 'parammmss for state');
    getAllStatesByCountryId(params).then((response) => {
      console.log(response, 'responseee');
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
    console.log(params, 'papapaapap');
    getAllCitiesByStateId(params).then((response) => {
      if (response.success) {
        setCityData(response.data);
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
            className='form-item-signup'
            label='State'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter Region!' }]}>
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
          </Form.Item>
          <Form.Item
            className='form-item-signup'
            label='City/County'
            required
            colon={false}
            rules={[{ required: true, message: 'Please Enter City/County!' }]}>
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
            <div className='upload'>
              <Upload
                className='upload'
                name='file'
                listType="text"
                fileList={selectedFileList}
                multiple={false}
                beforeUpload={beforeUpload}
                onChange={handleMediaFile}
              >
                {/* {selectedFileList && (
                  <img src={`${selectedFileList}`}/>
                )} */}
                {uploadButton}
              </Upload>
            </div>
          </Form.Item>
          <div>
            <Button className='signup-button'>Sign Up</Button>
          </div>
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

