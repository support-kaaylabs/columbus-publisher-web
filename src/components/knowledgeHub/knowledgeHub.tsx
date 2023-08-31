import React, { type FC } from 'react';
import {Row, Col} from 'antd';
import CommingSoon from '../../assets/Group 56838.svg';
import './knowledgeHub.scss';
const KnowledgeHub:FC = () => {
  return(
    <div>
      <Row>
        <Col sm={24} md={24} xs={24} lg={24} xl={24} className='img-div'>
          <img src={CommingSoon} />
        </Col>
      </Row>
    </div>
  );
};

export default KnowledgeHub;
