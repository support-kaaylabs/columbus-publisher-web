import React, { type FC, useState, useRef, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload, getImageLocate } from '../../shared/urlHelper';
import { Col, Row } from 'antd';
import Arrow from './Images/leftArrowIconLarge.png';
import DefaultUser from '../Images/defaultUser.png';
import StoreImg from './Images/storeLarge.png';
import UserImg from './Images/userLarge.png';
import cameraIcon from './Images/cameraIcon.svg';
import { get } from 'lodash';
import './login.scss';

const userProfile: FC = () => {
  const [name, setName] = useState<any>();
  const [storeName, setStoreName] = useState<any>();
  const logoHandler = useRef<any>(null);
  const [cameraIconDisplay, setCameraIconDisplay] = useState<any>(true);
  const [image, setImage] = useState<any>();
  const navigate = useNavigate();

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
      if (data.success) {
        getImageLocate().then((res: any) => {
          const image = get(res, 'data[0].Image', '');
          localStorage.setItem('Image', image);
          setImage(image);
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
                <div
                  className="user-img-logo-content"
                  onMouseLeave={cameraIconHandlerHide}
                >
                  <div
                    className="profile-head"
                    onMouseEnter={cameraIconHandlerDisplay}
                  >
                    <div className="profile-logo-img">
                      <img src={image} alt="avatar" className="profile-img" />
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
        </div>
      </Col>
    </Row>
  );
};

export default userProfile;
