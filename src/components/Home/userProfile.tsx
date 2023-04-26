import React, { useState, useRef, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload, getImageLocate } from '../../shared/urlHelper';
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';
import Arrow from './Images/leftArrowIconLarge.png';
import DefaultUser from '../Images/defaultUser.png';
import StoreImg from './Images/storeLarge.png';
import UserImg from './Images/userLarge.png';
import { get } from 'lodash';
import './login.scss';

const userProfile: FC = () => {
  const [name, setName] = useState<any>();
  const [storeName, setStoreName] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoHandler = useRef<any>(null);
  const [image, setImage] = useState<any>();
  const navigate = useNavigate();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const clickHandler = () => {
    logoHandler.current.click();
  };

  const userID: any = localStorage.getItem('User_ID');

  useEffect(() => {
    if (userID == null || userID == undefined) {
      navigate(-1);
    } else {
      setImage(
        localStorage.getItem('Image') === 'null'
          ? DefaultUser
          : localStorage.getItem('Image')
      );
      setName(localStorage.getItem('User_Name'));
      setStoreName(localStorage.getItem('Store_Name'));
      getImageLocate().then((res: any) => {
        const storeName = get(res, 'data[0].Store_Name', '');
        setStoreName(storeName);
      });
    }
  }, []);

  const changeLogoHandler = (event: any) => {
    const fileUploaded = [event.target.files[0]];
    const userId: any = localStorage.getItem('User_ID');
    imageUpload(userId, '', fileUploaded).then((data: any) => {
      setIsLoading(true);
      if (data.success) {
        getImageLocate().then((res: any) => {
          const image = get(res, 'data[0].Image', '');
          localStorage.setItem('Image', image);
          setImage(image);
          setIsLoading(false);
        });
      }
    });
  };
  return (
    <Row className="user-profile">
      <Col
        sm={24}
        xs={24}
        md={24}
        lg={24}
        className="arrow"
        onClick={() => navigate(-1)}
      >
        <img src={Arrow} alt="Left Arrow" />
      </Col>
      <Col className="user-container">
        <div className="user-contain">
          <Row className="upload-image-contain">
            <Col sm={12} md={12} lg={12} className="user-img">
              <div className="user-img-logo">
                <div className="profile-head">
                  {isLoading ? (
                    <div className="profile-loading">
                      <Spin indicator={antIcon} />
                    </div>
                  ) : (
                    <div className="profile-logo-img" onClick={clickHandler}>
                      <img src={image} alt="avatar" className="profile-img" />
                      <input
                        type="file"
                        accept="image/*"
                        ref={logoHandler}
                        onChange={changeLogoHandler}
                        className="input"
                      />
                    </div>
                  )}
                </div>
                <div className="inform-col">
                  <p>Personalize your account with a photo</p>
                </div>
              </div>
            </Col>
            <Col className="user-detail" sm={12} md={12} lg={12}>
              <Row className="user-info-icon">
                <Col className="user-icon">
                  <img src={UserImg} alt="user-icon" />
                </Col>
                <Col className="seller">
                  <p className="seller-find">Seller Name</p>
                  <p className="seller-name">{name}</p>
                </Col>
              </Row>
              <Row className="store-info-icon">
                <Col className="user-icon">
                  <img src={StoreImg} alt="store-icon" />
                </Col>
                <Col className="seller">
                  <p className="seller-find">Store Name</p>
                  <p className="seller-name">{storeName}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row className="user-inform">
            <Col sm={11} md={11} lg={11} className="inform-col">
              <p>Personalize your account with a photo</p>
            </Col>
          </Row> */}
        </div>
      </Col>
    </Row>
  );
};

export default userProfile;
