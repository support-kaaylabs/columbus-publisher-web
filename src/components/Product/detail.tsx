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

const ProductDetail: FC = () => {
  const [identifiedImageId, setIdentifiedImageId] = useState();
  const [todos, setTodos] = useState<any>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { Panel } = Collapse;

  useEffect(() => {
    const params = {
      id: slug
    };
    getProductDetail(params).then((data) => {
      if (data) {
        const route = data.resData;
        setTodos(get(data, 'resData', {}));
        setIdentifiedImageId(route.Image);
      }
    });
  }, [slug]);

  return (
    <div className="headDetail">
      <div className="arrow" onClick={() => navigate(-1)}>
        <img src={Arrow} alt="Left Arrow" />
      </div>
      <Row className="contentDetail">
        {todos && (
          <div className="contentDiv">
            <Col md={24} sm={24} lg={12} className="leftContent">
              <div className="largeImage">
                <button>
                  <img src={identifiedImageId} alt={todos.Brand} />
                </button>
                <div className="largeImageContent">
                  {todos.Product_Image &&
                    todos.Product_Image.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => setIdentifiedImageId(item.Image)}
                      >
                        <img src={item.Image} alt="Phone" />
                      </button>
                    ))}
                </div>
              </div>
            </Col>
            <Col md={12} sm={24} lg={12} className="rightContent">
              <div className="rightDiv">
                <div className="paraContent">
                  <p className="para1">{todos.Brand}</p>
                  <p className="para2">{todos.Product_Name}</p>
                  <div className="rating">
                    <span className="rating1">₹{todos.Price}</span>
                    <span className="rating2">₹{todos.Store_Price}</span>
                    <span className="rating3">{todos.percent}%</span>
                  </div>
                </div>
                <div className="productDetailBox">
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
            <Col md={24} sm={24} lg={12} className="progressDiv">
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
          </div>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;