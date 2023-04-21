import React, {
  useState,
  useRef,
  useEffect,
  FC,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload, getImageLocate } from '../../shared/urlHelper';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import { Col, Row, Spin } from 'antd';
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
      setImage(localStorage.getItem('Image'));
      setName(localStorage.getItem('User_Name'));
      setStoreName(localStorage.getItem('Store_Name'));
      getImageLocate().then((res: any) => {
        const image = get(res, 'data[0].Image', '');
        setImage(image);
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
      <Col sm={24} xs={24} md={24} lg={24} className="content-name">
        <p>Your Info</p>
      </Col>
      <Col className="user-container">
        <div className="user-contain">
          <Row className="upload-image-contain">
            <Col sm={24} xs={24} md={8} lg={8} className="user-img">
              <div className="user-img-logo">
                <div className="profile-head">
                  {isLoading ? (
                    <div className="profile-loading">
                      <Spin indicator={antIcon} />
                    </div>
                  ) : (
                    <img src={image} alt="avatar" className="profile-img" />
                  )}

                  <div className="upload-image"  onClick={clickHandler}>
                    <div className="add-photo">
                      <CameraOutlined />
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
              </div>
            </Col>
            <Col className="user-detail" sm={24} xs={24} md={14} lg={14}>
              <Col sm={0} xs={0} md={24} lg={8} className="user-details">
                <p>
                  Personalize your account with a photo. Your profile photo will
                  appear on apps and devices.
                </p>
              </Col>
            </Col>
          </Row>
          <Row className="user-info">
            <Col sm={11} md={8} lg={8} className="seller">
              <p>Seller Name</p>
            </Col>
            <Col sm={11} md={14} lg={14} className="seller-name">
              <p>{name}</p>
            </Col>
          </Row>
          <Row className="user-info">
            <Col sm={11} md={8} lg={8} className="seller">
              <p>Store Name</p>
            </Col>
            <Col sm={11} md={14} lg={14} className="seller-name">
              <p>{storeName}</p>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default userProfile;
