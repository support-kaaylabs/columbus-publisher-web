import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload, getImageLocate } from '../../shared/urlHelper';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { get } from 'lodash';
import './login.scss';

type userProfileProps = {
  setImage: Dispatch<SetStateAction<any>>;
  image: any;
};
const userProfile: FC<userProfileProps> = ({ image, setImage }) => {
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [phoneNumber, setPhoneNum] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoHandler = useRef<any>(null);
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
      setPhoneNum(localStorage.getItem('Phone_Number'));
      setImage(localStorage.getItem('Image'));
      setName(localStorage.getItem('User_Name'));
      setEmail(localStorage.getItem('User_Email'));
    }
  }, []);

  const changeLogoHandler = (event: any) => {
    const fileUploaded = [event.target.files[0]];
    const userId: any = localStorage.getItem('User_ID');
    imageUpload(userId, '', fileUploaded).then((data: any) => {
      setIsLoading(true);
      if (data.success) {
        getImageLocate().then((res: any) => {
          const Image = get(res, 'data[0].Image', '');
          localStorage.setItem('Image', Image);
          setImage(localStorage.getItem('Image'));
          setIsLoading(false);
        });
      }
    });
  };
  return (
    <div className="userProfile">
      <div className="userContainer">
        <div className="setting">
          <p>Setting</p>
        </div>
        <div className="userContain">
          <div className="userImg">
            {isLoading ? (
              <div className="profileLoading">
                <Spin indicator={antIcon} />
              </div>
            ) : (
              <img src={image} alt="avatar" className="profileImg" />
            )}
            <div className="userImgIcon" onClick={clickHandler}>
              <div>
                <CameraOutlined />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={logoHandler}
                onChange={changeLogoHandler}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="userDetail">
            <div className="user">
              <p>{name}</p>
            </div>
            <div className="detail">
              <p>{email}</p>
            </div>
            <div className="detail">
              <p>{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
