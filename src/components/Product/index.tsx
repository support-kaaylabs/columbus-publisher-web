import React, { type FC, useEffect, useState } from 'react';
import './content.scss';
import { Col, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { getProduct } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow from './Images/nounCursorImg.svg';
import DefaultImage from './Images/defaultImage.png';

const ProductList: FC = () => {
  const [todos, setTodos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = localStorage.getItem('User_Uid');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getProduct({ id: userId })
      .then((res: any) => {
        if (res.success) {
          setTodos(get(res, 'data', {}));
          setLoading(false);
        }
      })
      .catch((err) => {
        errorNotification(err);
        setLoading(false);
      });
  };

  return (
    <div className="head">
      {loading && (
        <div className="loader">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
      {!loading && (
        <>
          <Row className="content-row">
            {todos &&
              todos.map((item: any, index: number) => (
                <Col key={index} sm={24} md={12} lg={8}>
                  <div className="content-head">
                    <div className="content-logo">
                      <img
                        src={item.Image === null ? DefaultImage : item.Image}
                        alt={item.Brand}
                      />
                    </div>
                    <div className="content-main">
                      <div className="content-para-button">
                        <div className="impression">
                          <p>IMPRESSION</p>
                          <button type="button">
                            <span>
                              <img src={Eye} alt="Eye" />
                              <p>0</p>
                            </span>
                          </button>
                        </div>
                        <div className="clicks">
                          <p>CLICKS</p>
                          <button type="button">
                            <span>
                              <img src={Hand} alt="Hand" />
                              <p>0</p>
                            </span>
                          </button>
                        </div>
                        <div className="cta">
                          <p>CTA</p>
                          <button type="button">
                            <span>
                              <img src={Arrow} alt="Arrow" />
                              <p>0</p>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="para">
                        <p className="unitted">{item.Brand}</p>
                        <p className="knitted">{item.Product_Name}</p>
                      </div>
                      <div className="button-div">
                        <Link to={`${item.Product_Uid}`}>
                          <button>VIEW PRODUCT DETAILS</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductList;
