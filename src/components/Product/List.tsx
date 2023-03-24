import React, { type FC } from 'react';

import classes from './Content.module.scss';
import { Col, Row } from 'antd';
import imageOne from './Images/shoes.png';

import imageTwo from './Images/apple.png';
import imageThree from './Images/headphone.avif';
import { TodoItem } from './Types';
import { Link } from 'react-router-dom';
import Eye from './Images/eye1.png';
import Hand from './Images/hand.png';
import Arrow from './Images/arrow.png';

const ProductList: FC = () => {

    const Todos: TodoItem[] = [{
        id: 1,
        src: imageOne,
        impression: '40,00000',
        clicks: '400',
        cta: '40',
        paraOne: 'Unitted color of Benniton',
        paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER',
        slug: 'shoe'
    },
    {
        id: 2,
        src: imageTwo,
        impression: '60,00000',
        clicks: '654',
        cta: '78',
        paraOne: 'SONY',
        paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..'  ,
         
    },
    {
        id: 3,
        src: imageThree,
        impression: '78,458',
        clicks: '852',
        cta: '85',
        paraOne: 'APPLE',
        paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)'
    },
    {
        id: 4,
        src: imageThree,
        impression: '78,458',
        clicks: '852',
        cta: '85',
        paraOne: 'APPLE',
        paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)'
    },
    {
        id: 5,
        src: imageOne,
        impression: '40,00000',
        clicks: '400',
        cta: '40',
        paraOne: 'Unitted color of Benniton',
        paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER'    
    },
    {
        id: 6,
        src: imageTwo,
        impression: '60,00000',
        clicks: '654',
        cta: '78',
        paraOne: 'SONY',
        paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..'   
    },
    {
      id: 7,
      src: imageTwo,
      impression: '60,00000',
      clicks: '654',
      cta: '78',
      paraOne: 'SONY',
      paraTwo: 'WH-XB910N Active Noise Cancellation enabled ..' 
  },
  {
      id: 8,
      src: imageThree,
      impression: '78,458',
      clicks: '852',
      cta: '85',
      paraOne: 'APPLE',
      paraTwo: 'iPhone 14 Pro (Deep Purple, 128 GB)'        
  },
  {
      id: 9,
      src: imageOne,
      impression: '40,00000',
      clicks: '400',
      cta: '40',
      paraOne: 'Unitted color of Benniton',
      paraTwo: 'KNITTED LACE UP LIFESTYLE SNEAKER'    
  }];

    return(
        <div className={classes.head}>
            <Row>
            {Todos.map(item => (                
                <Col span={8}>         
                <div className={classes.content_head}>
                    <div className={classes.content_logo}>
                        <img src={item.src} alt='Shoes' />
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
