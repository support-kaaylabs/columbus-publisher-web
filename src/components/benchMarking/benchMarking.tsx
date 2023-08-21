import React, { type FC } from 'react';
import { Row, Col } from 'antd';
import CommingSoon from '../../assets/Group 56838.svg';

const BenchMarking: FC = () => {
  return (
    <div>
      <Row>
        <Col span={4} >
        </Col>
        <Col span={6} offset={5}>
          <img src={CommingSoon} />
        </Col>
      </Row>
    </div>
  );
};

export default BenchMarking;
