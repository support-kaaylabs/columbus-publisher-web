import React, { type FC, useState, useEffect } from 'react';
import { get } from 'lodash';
import './detail.scss';
import Arrow from './Images/leftArrowIconLarge.png';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow1 from './Images/nounCursorImg.svg';
import { Collapse, Row, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../../shared/urlHelper';
import ProgressBar from './progressbar';
import DefaultImage from './Images/defaultImage.png';

const ProductDetail: FC = () => {
  const [identifiedImageId, setIdentifiedImageId] = useState<any>();
  const [percentage, setPercentage] = useState<string>();
  const [storePrice, setStorePrice] = useState<string>();
  const [productImage, setProductImage] = useState<any>();
  const [todos, setTodos] = useState<any>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { Panel } = Collapse;

  useEffect(() => {
    const params = {
      id: slug,
      userId: localStorage.getItem('User_Uid'),
    };
    getProductDetail(params).then((data) => {
      if (data) {
        const bpp = get(data, 'data.autobid[0].BPP', []);
        const price = get(data, 'data.product[0].Price', []);
        const different = price - bpp;
        const percent = ((different / price) * 100).toFixed(2);
        setPercentage(percent);
        setTodos(get(data, 'data.product[0]', {}));
        setStorePrice(bpp);
        setIdentifiedImageId(get(data, 'data.productImage[0]', []));
        setProductImage(get(data, 'data.productImage', []));
      }
    });
  }, [slug]);

  return (
    <div className="head-detail">
      <div className="arrow" onClick={() => navigate(-1)}>
        <img src={Arrow} alt="Left Arrow" />
      </div>
      <Row className="content-detail">
        {todos && (
          <div className="content-div">
            <Col md={24} sm={24} lg={11} className="left-content">
              <div className="large-image">
                {identifiedImageId.Image === undefined ? 
                  <button className="main-image">
                    <button className="main-image">
                      <img src={DefaultImage} alt="Phone" />
                    </button>
                  </button>
                  :
                  <button className="main-image">
                    {identifiedImageId.Type === 'VIDEO' ? (
                      <video controls>
                        <source src={identifiedImageId.Image} type="video/mp4" />
                      </video>
                    ) : (
                      <button className="main-image">
                        <img src={identifiedImageId.Image} alt="Phone" />
                      </button>
                    )}
                  </button>}
                <div className="large-image-content">
                  {productImage &&
                    productImage.map((item: any) =>
                      item.Type === 'VIDEO' ? (
                        <button
                          className="sub-image"
                          key={item.id}
                          onClick={() => setIdentifiedImageId(item)}
                        >
                          <video>
                            <source src={item.Image} type="video/mp4" />
                          </video>
                        </button>
                      ) : (
                        <button
                          className="sub-image"
                          key={item.id}
                          onClick={() => setIdentifiedImageId(item)}
                        >
                          <img src={item.Image} alt="Phone" />
                        </button>
                      )
                    )}
                </div>
              </div>
            </Col>
            <Col md={24} sm={24} lg={11} className="right-content">
              <div className="right-div">
                <div className="para-content">
                  <p className="para1">{todos.Brand}</p>
                  <p className="para2">{todos.Product_Name}</p>
                  <div className="rating">
                    <span className="rating1">₹{todos.Price}</span>
                    <span className="rating2">₹{storePrice}</span>
                    <span className="rating3">{percentage}% Off</span>
                  </div>
                </div>
                <div className="product-detail-box">
                  <Collapse
                    accordion
                    expandIcon={({ isActive }) =>
                      isActive ? <MinusOutlined /> : <PlusOutlined />
                    }
                    defaultActiveKey={['1']}
                    expandIconPosition="end"
                    className="collapse"
                  >
                    <Panel header="PRODUCT DETAILS" key="1" className="panel1">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: todos.Long_Description,
                        }}
                      />
                    </Panel>
                    <Panel header="MORE DETAILS" key="2" className="panel2">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: todos.Long_Description,
                        }}
                      />
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col md={24} sm={24} lg={11} className="progress-div">
              <div className="impression">
                <p>Impression</p>
                <ProgressBar
                  value="4,00,000"
                  styles="250px"
                  image={Eye}
                  background="#f9dede"
                  color="#e53935"
                />
              </div>
              <div className="clicks">
                <p>Clicks</p>
                <ProgressBar
                  value="400"
                  styles="150px"
                  image={Hand}
                  background="#d8defc"
                  color="#0909dc"
                />
              </div>
              <div className="cta">
                <p>CTA</p>
                <ProgressBar
                  value="40"
                  styles="150px"
                  image={Arrow1}
                  background="#caf2d2"
                  color="#03781b"
                />
              </div>
            </Col>
            <Col md={24} sm={24} lg={11}></Col>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;
