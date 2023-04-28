import React, { type FC, useState, useEffect, useRef } from 'react';
import { get } from 'lodash';
import './detail.scss';
import Arrow from './Images/leftArrowIconLarge.png';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow1 from './Images/nounCursorImg.svg';
import { Collapse, Row, Col, Carousel } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../../shared/urlHelper';
import PlusIcon from './Images/plusIcon.svg';
import MinusIcon from './Images/minusIcon.svg';
import ProgressBar from './progressbar';
import DefaultImage from './Images/defaultImage.png';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ProductDetail: FC = () => {
  const [identifiedImageId, setIdentifiedImageId] = useState<any>();
  const [percentage, setPercentage] = useState<string>();
  const [storePrice, setStorePrice] = useState<string>();
  const [productImage, setProductImage] = useState<any>();
  const [todos, setTodos] = useState<any>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const carousel: any = useRef(null);

  const { Panel } = Collapse;

  const imgListProperties = {
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 2566,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 746,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

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

  const next = () => {
    carousel.current.next();
  };

  const previous = () => {
    carousel.current.prev();
  };
  return (
    <div className="head-detail">
      <div className="arrow" onClick={() => navigate(-1)}>
        <img src={Arrow} alt="Left Arrow" />
      </div>
      <Row className="content-detail">
        {todos && (
          <div className="content-div">
            <Col md={24} sm={24} lg={10} className="left-content">
              <Row className="large-image">
                {identifiedImageId.Image === undefined ? (
                  <Col>
                    <button className="main-image">
                      <button className="main-image">
                        <img src={DefaultImage} alt="Phone" />
                      </button>
                    </button>
                  </Col>
                ) : (
                  <Col>
                    <button className="main-image">
                      {identifiedImageId.Type === 'VIDEO' ? (
                        <video controls>
                          <source
                            src={identifiedImageId.Image}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <button className="main-image">
                          <img src={identifiedImageId.Image} alt="Phone" />
                        </button>
                      )}
                    </button>
                  </Col>
                )}
                <Col className="large-image-content">
                  <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    onClick={() => previous()}
                    className="prdt-carousel-arrow-left"
                  >
                    <LeftOutlined className="img-arrow-icon" />
                  </Col>
                  <Col
                    xs={22}
                    sm={22}
                    md={22}
                    lg={22}
                    xl={22}
                    className="img-spec"
                  >
                    <Carousel
                      ref={carousel}
                      {...imgListProperties}
                      className="carousal-sub-image"
                    >
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
                    </Carousel>
                  </Col>
                  <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    className="prdt-carousel-arrow-right"
                    onClick={() => next()}
                  >
                    <RightOutlined className="img-arrow-icon" />
                  </Col>
                </Col>
                <Col xs={0} sm={0} md={0} lg={24} className="impression">
                  <p>Impression</p>
                  <ProgressBar
                    value="4,00,000"
                    styles="250px"
                    image={Eye}
                    background="#f9dede"
                    color="#e53935"
                  />
                </Col>
                <Col xs={0} sm={0} md={0} lg={24} className="clicks">
                  <p>Clicks</p>
                  <ProgressBar
                    value="400"
                    styles="150px"
                    image={Hand}
                    background="#d8defc"
                    color="#0909dc"
                  />
                </Col>
                <Col xs={0} sm={0} md={0} lg={24} className="cta">
                  <p>CTA</p>
                  <ProgressBar
                    value="40"
                    styles="150px"
                    image={Arrow1}
                    background="#caf2d2"
                    color="#03781b"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={24} sm={24} lg={13} className="right-content">
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
                      isActive ? (
                        <img src={MinusIcon} alt="Minus-icon" />
                      ) : (
                        <img src={PlusIcon} alt="Plus-icon" />
                      )
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
            <Col xs={24} md={0} sm={24} lg={0} className="progress-div">
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
            <Col md={24} sm={24} lg={14}></Col>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;
