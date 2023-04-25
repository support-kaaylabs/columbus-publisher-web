import React, { type FC, useEffect, useState } from 'react';
import './content.scss';
import { Col, Row } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { getProduct } from '../../shared/urlHelper';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow from './Images/nounCursorImg.svg';

const ProductList: FC = () => {

  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem('User_Uid');

  useEffect(() => {   
    getProduct({ id: userId })
      .then((res: any) => {
        if(res.success){
          setTodos(get(res, 'data', {}));
        }        
      });
  }, []);

  return (
    <div className="head">
      <div className="filterHead">
        <div className="filter">
          <FilterOutlined />
        </div>
      </div>
      <Row className="contentRow">
        {todos &&
          todos.map((item: any, index) => (
            <Col key={index} sm={24} md={12} lg={8}>
              <div className="contentHead">
                <div className="contentLogo">
                  <img src={item.Image} alt={item.Brand} />
                </div>
                <div className="contentMain">
                  <div className="contentParaButton">
                    <div className="impression">
                      <p>IMPRESSION</p>
                      <button type="button">
                        <span>
                          <img src={Eye} alt="Eye" />
                          <p>{item.Price}</p>
                        </span>
                      </button>
                    </div>
                    <div className="clicks">
                      <p>CLICKS</p>
                      <button type="button">
                        <span>
                          <img src={Hand} alt="Hand" />
                          <p>{item.price}</p>
                        </span>
                      </button>
                    </div>
                    <div className="cta">
                      <p>CTA</p>
                      <button type="button">
                        <span>
                          <img src={Arrow} alt="Arrow" />
                          <p>{item.price}</p>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="para">
                    <p className="unitted">{item.Brand}</p>
                    <p className="knitted">{item.Product_Name}</p>
                  </div>
                  <div className="buttonDiv">
                    <button>
                      <Link to={`${item.Product_Uid}`}>
                        VIEW PRODUCT DETAILS
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProductList;