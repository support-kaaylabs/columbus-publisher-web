import React, { type FC, useEffect, useState } from 'react';
import './content.scss';
import { Col, Row } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Eye from './images/eyeImg.svg';
import Hand from './images/nounClickImg.svg';
import Arrow from './images/nounCursorImg.svg';
const ProductList: FC = () => {
  const [todos, setTodos] = useState([]);
  const url = 'http://localhost:5000/api/v1/get-autobid-seller-data';
  console.log(todos);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.data);
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
