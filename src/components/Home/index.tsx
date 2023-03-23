/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type FC } from 'react';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import {
  EyeOutlined
} from '@ant-design/icons';
import '../Home/login.scss';
import { getJbReports, authenticate } from '../../shared/urlHelper';
import Meta from 'antd/es/card/Meta';
import '../../stylesheet/style.scss';
import { errorNotification } from '../../shared/globalVariables';
import { useNavigate } from 'react-router-dom';

const Home: FC = (props) => {
  const navigate = useNavigate();
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  // useEffect(() => {
  //   const adminLogin = localStorage.getItem('adminLogin');
  //   if (adminLogin) {
  //     navigate('/');
  //   }  }, []);

  const handleSubmit= (e : any) => {
    // e.preventDefault();
    navigate('/dashboard');
    const params = {
      emailId,
      password,
      userType: 'Merchant',
    };
    console.log(params, 'params----------->');   
    if (emailId === '' && password === '') {
      errorNotification('Please Enter the Email and Password');
    } else {
    //   this.setState({
    //     btnLoading: true
    //   });
      setBtnLoading(true); 
      authenticate(params).then((resp) => {
        console.log(resp, 'responses==========>');        
        // const { User_Name, User_ID, User_Type, Image, User_Uid } = resp.data && resp.data[0];
        // const { token } = resp;
        // localStorage.setItem("User_Name", User_Name);
        // localStorage.setItem("User_ID", User_ID);
        // localStorage.setItem("User_Uid", User_Uid);
        // localStorage.setItem("User_Type", User_Type);
        // localStorage.setItem("Image", Image);
        // localStorage.setItem("token", token);
        // localStorage.setItem("adminLogin", `${true}`);
        // localStorage.setItem("menu_collapse", `${false}`);
        // if (resp.success && (User_Type === "Merchant" || User_Type === "S-Admin")) {
        //   const deviceParams = {
        //     Device_ID: localStorage.getItem('fcmToken')
        //   }
        // }
        console.log(localStorage.getItem('fcmToken'), 'devicesParams');
        
        //   updateUserInfo(User_ID, deviceParams).then(res => {
        //     if (res.success) {
        //       if (User_Type === 'Admin') {
        //         this.handlingRole(User_Uid);
        //       } else if (User_Type === 'S-Admin') {
        //         successNotification("Login Successfully");
        //         this.setState({
        //           btnLoading: false
        //         });
        //         history.push('/Dashboard')
        //       }
        //     }
        //   })
        // }
      }).catch((resp: any) => {
        if (resp.success === false && resp.error.mailError) {
          errorNotification(resp.error.mailError);
          setBtnLoading(false);
        } else if (resp.success === false && resp.error.passwordError) {
          errorNotification(resp.error.passwordError);
          setBtnLoading(false);
        }
      });
    }
  };

  // const handleChange = (e: any) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setData[{...data, [name]: value}]
  // }

  // const passwordShow = () => {
  //   const { textType, iconName } = this.state;
  //   let options = { iconName: 'eye-invisible', textType: 'password' };
  //   if (iconName === "eye-invisible" && textType === 'password') {
  //     options = { iconName: 'eye', textType: 'text' };
  //   }
  //   this.setState(options);
  // }

  return (
    <div className="login-page">
      <div className="main-component">
        <div className="welcome-title">WELCOME</div>
        <Card className="login">
          <div className="title"><img src={require('./Jingle.png')} alt="logo" /></div>
          <Form onFinish={handleSubmit} className="login-form" >
            <Form.Item>
              {(
                <div className="username-input">
                  <Input
                    type="email"
                    name="emailId"
                    placeholder="Email"
                    className="input-text"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={emailId} 
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              {(
                <div className="password-input">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="password-text"
                    suffix={<EyeOutlined onClick={()=>{return null;}} />}
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password} 
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <div className="login-button">
                <Button
                  loading={false}
                  htmlType="submit"
                  // size="default"
                  className="login-form-button"
                  block
                >
                  LOGIN
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Home;
