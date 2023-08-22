import React, { type FC } from 'react';
import {Row, Col} from 'antd';
import CommingSoon from '../../assets/Group 56838.svg';
const Matrics:FC = () => {
  return(
    <Row>
      <Col span={6} offset={9}>
        <img src={CommingSoon}/>
      </Col>
    </Row>
    
  );
};

export default Matrics;
