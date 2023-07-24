import React, { useState, type FC } from 'react';
import { Form, Input, Button, Steps } from 'antd';
const Signup: FC = () => {
  const [current, setCurrent] = useState(0);

  const onNextClick = () => {
    if (current <= 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Form
      name='basic'
      size={'large'}
      className='form'
      layout="vertical"
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
            <Input 
              type='password' 
              placeholder='Enter your Password ' />
          </Form.Item>
          <Form.Item 
            className='form-item-signup' 
            label='Confirm Password' 
            required 
            colon={false}
            rules={[{ required: true, message: 'Please Enter Confirm Password!' }]}>
            <Input 
              type='password' 
              placeholder='Enter your Confirm Password' />
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
            <Input 
              type='text' 
              placeholder='Enter Region' />
          </Form.Item>
          <Form.Item 
            className='form-item-signup' 
            label='State/Province' 
            required 
            colon={false}
            rules={[{ required: true, message: 'Please Enter State/Province!' }]}>
            <Input 
              type='text' 
              placeholder='Enter State/Province' />
          </Form.Item>
          <Form.Item 
            className='form-item-signup' 
            label='City/County' 
            required 
            colon={false}
            rules={[{ required: true, message: 'Please Enter City/County!' }]}>
            <Input 
              type='text' 
              placeholder='Enter City/County' />
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
      <div className='prev-button-div' style={{ marginTop: '20px'}}>
        <Button className='next-button' onClick={onNextClick}>Next</Button>
        {current > 0 && (
          <Button className='prev-button' onClick={() => prev()}>
            Previous
          </Button>
        )}
        <Steps current={current} />
      </div>
    </Form>
  );
};

export default Signup;
