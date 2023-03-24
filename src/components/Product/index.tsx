import React, { type FC } from 'react';

import classes from './content.module.scss';
import { Col, Row } from 'antd';
import ShoeImg from './Images/shoeImgSmall.png';
import AppleImg from './Images/appleImgSmall.png';
import SonyImg from './Images/sonyImgSmall.png';
import { ProductInfo } from './types';
import { Link } from 'react-router-dom';
import Eye from './Images/eyeImg.svg';
import Hand from './Images/nounClickImg.svg';
import Arrow from './Images/nounCursorImg.svg';

const ProductList: FC = () => {

    const Todos: ProductInfo[] = [{
        id: 1,
        src: ShoeImg,
        impression: '40,00000',
        clicks: '400',
        cta: '40',
        paraOne: 'Unitted color of Benniton',
        paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER',
        slug: 'shoe'
    },
    {
        id: 2,
        src: SonyImg,
        impression: '60,00000',
        clicks: '654',
        cta: '78',
        paraOne: 'SONY',
        paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..'  ,
        slug: 'sony'
    },
    {
        id: 3,
        src: AppleImg,
        impression: '78,458',
        clicks: '852',
        cta: '85',
        paraOne: 'APPLE',
        paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)',
        slug: 'Apple'
    },
    {
        id: 4,
        src: SonyImg,
        impression: '78,458',
        clicks: '852',
        cta: '85',
        paraOne: 'APPLE',
        paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)',
        slug: 'Apple'
    },
    {
        id: 5,
        src: ShoeImg,
        impression: '40,00000',
        clicks: '400',
        cta: '40',
        paraOne: 'Unitted color of Benniton',
        paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER', 
        slug: 'Shoe'   
    },
    {
        id: 6,
        src: AppleImg,
        impression: '60,00000',
        clicks: '654',
        cta: '78',
        paraOne: 'SONY',
        paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..' , 
        slug: 'Sony' 
    },
    {
      id: 7,
      src: AppleImg,
      impression: '60,00000',
      clicks: '654',
      cta: '78',
      paraOne: 'SONY',
      paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..',
      slug: 'Sony'
  },
  {
      id: 8,
      src: SonyImg,
      impression: '78,458',
      clicks: '852',
      cta: '85',
      paraOne: 'APPLE',
      paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)',     
      slug: 'Apple'
    },
  {
      id: 9,
      src: ShoeImg,
      impression: '40,00000',
      clicks: '400',
      cta: '40',
      paraOne: 'Unitted color of Benniton',
      paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER',    
      slug: 'Shoe'
  }];

    return(
        <div className={classes.head}>
            <Row>
            {Todos.map(item => (                
                <Col span={8}>         
                <div className={classes.content_head}>
                    <div className={classes.content_logo}>
                        <img src={item.src} alt={item.slug} />
                    </div>
                    <div className={classes.content_main}>
                        <div className={classes.content_paraButton}>
                            <div className={classes.impression}>
                                <p>IMPRESSION</p>
                                <button type='button'><span><img src={Eye} alt='Eye' /><p>{item.impression}</p></span></button>
                            </div >
                            <div className={classes.clicks}>
                                <p>CLICKS</p>
                                <button type='button'><span><img src={Hand} alt='Hand' /><p>{item.clicks}</p></span></button>
                            </div>
                            <div className={classes.cta}>
                                <p>CTA</p>
                                <button type='button'><span><img src={Arrow} alt='Arrow' /><p>{item.cta}</p></span></button>
                            </div>
                        </div>   
                        <div className={classes.para}>         
                          <p className={classes.unitted}>{item.paraOne}</p>
                          <p className={classes.knitted}>{item.paraTwo}</p>   
                        </div>
                        <div className={classes.buttonDiv}>
                            <button><Link to={`${item.slug}`}>VIEW PRODUCT DETAILS</Link></button>
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
