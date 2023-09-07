import React, { type FC } from 'react';
import { Row, Col } from 'antd';
import CommingSoon from '../../assets/Group 56838.svg';
import './index.scss';
import mobImage from '../../assets/mobile-commingsoon.svg';


const Analysis: FC = () => {
  return (
    <Row>
      <Col sm={0} md={0} xs={0} lg={24} xl={24}>
        <div className='img-div'>
          <img src={CommingSoon} />
        </div>
      </Col>
      <Col sm={24} md={24} xs={24} lg={0} xl={0} >
        <div className='img-div'>
          <img src={mobImage} />
        </div>
      </Col>
    </Row>
  );
};

export default Analysis;
