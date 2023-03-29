import React, { type FC, useState } from 'react';
import ShoeImg from './Images/shoeImgLarge.png';
import classes from './details.module.scss';
import Arrow from './Images/leftArrowIconLarge.png';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow1 from './Images/nounCursorImg.svg';
import { Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Shoes1 from './Images/shoes1.png';
import Shoes2 from './Images/shoes2.png';
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from './types';

const ProductDetail: FC = () => {
  const [identifiedImageId, setIdentifiedImageId] = useState(ShoeImg);
  const navigate = useNavigate();
  const text = ` - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
  since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software `;
  const { Panel } = Collapse;

  const todos: ProductInfo[] = [
    {
      id: 0,
      src: ShoeImg,
      impression: '40,00000',
      clicks: '400',
      cta: '40',
      paraOne: 'Unitted color of Benniton',
      paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER',
      slug: 'shoe',
      regularPrice: '₹3,824',
      discount: '15% Off',
      finalPrice: '₹4,499',
    },
  ];
  return (
    <div className={classes.head}>
      <div className={classes.arrow} onClick={() => navigate(-1)}>
        <img src={Arrow} alt="Left Arrow" />
      </div>
      {todos.map((item, index) => (
        <div key={index} className={classes.content}>
          <div className={classes.leftContent}>
            <div className={classes.largeImage}>
              <button>
                <img src={identifiedImageId} alt={item.slug} />
              </button>
              <div className={classes.largeImageContent}>
                <button
                  className={classes.button1}
                  onClick={() => setIdentifiedImageId(ShoeImg)}
                >
                  <img src={ShoeImg} alt="Phone" />
                </button>
                <button
                  className={classes.button2}
                  onClick={() => setIdentifiedImageId(Shoes1)}
                >
                  <img src={Shoes1} alt="Shoe" />
                </button>
                <button
                  className={classes.button3}
                  onClick={() => setIdentifiedImageId(Shoes2)}
                >
                  <img src={Shoes2} alt="HeadPhone" />
                </button>
              </div>
            </div>
            <div className={classes.impression}>
              <p>Impression</p>
              <div className={classes.buttonDiv}>
                <button type="button">
                  <span>
                    <img src={Eye} alt="Eye" />
                    <p>40,00000</p>
                  </span>
                </button>
              </div>
            </div>
            <div className={classes.clicks}>
              <p>Clicks</p>
              <div className={classes.buttonDiv}>
                <button type="button">
                  <span>
                    <img src={Hand} alt="Eye" />
                    <p>400</p>
                  </span>
                </button>
              </div>
            </div>
            <div className={classes.cta}>
              <p>CTA</p>
              <div className={classes.buttonDiv}>
                <button type="button">
                  <span>
                    <img src={Arrow1} alt="Arrow" />
                    <p>40</p>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className={classes.rightContent}>
            <div className={classes.paraContent}>
              <p className={classes.para1}>{item.paraOne}</p>
              <p className={classes.para2}>{item.paraTwo}</p>
              <div className={classes.rating}>
                <span className={classes.rating1}>{item.regularPrice}</span>
                <span className={classes.rating2}>{item.discount}</span>
                <span className={classes.rating3}>{item.finalPrice}</span>
              </div>
            </div>
            <div className={classes.productDetailBox}>
              <Collapse
                accordion
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
                defaultActiveKey={['1']}
                expandIconPosition="end"
                className={classes.collapse}
              >
                <Panel
                  header="PRODUCT DETAILS"
                  key="1"
                  className={classes.panel1}
                >
                  <p>{text}</p>
                </Panel>
                <Panel header="MORE DETAILS" key="2" className={classes.panel2}>
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
