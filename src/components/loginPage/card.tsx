import React, { useState, type FC } from 'react';
import { Row, Col, Card, Tag } from 'antd';

const Cards: FC = () => {
  const titleValue = [{
    labeltitle: 'Flat',
    listItem1: '$25 upto 500 selections',
    listItem2: 'Unlimited Impressions',
    listItem3: '($1 Per Selection Post 500)',
    Tag: 'Free Trail For One Month',
    priceLabel: '$25',
  },
  {
    labeltitle: 'Base',
    listItem1: '$15 upto 100 selections and 6 months',
    listItem2: 'Unlimited Impressions',
    listItem3: '($0.15 Per Selection Post 100-500)',
    priceLabel: '$15',
  },
  {
    labeltitle: 'Minimum',
    listItem1: '$10 upto 25 selections and 3 months',
    listItem2: 'Unlimited Impressions',
    listItem3: '($0.10 Per Selection Post 25-99)',
    priceLabel: '$10',
  }];

  return (
    <Row>
      {titleValue.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <div>
          <Col span={8}>
            <Card className='subscription-card2'>
              <div className='subscription-label'><b>{item.labeltitle}</b></div>
              <ul className='list-div'>
                <li className='list'>{item.listItem1}</li>
                <li className='list'>{item.listItem2}</li>
                <li className='list'>{item.listItem3}</li>
              </ul>
              {item.Tag &&
                <Tag className='subscription-tag'>{item.Tag}</ Tag>
              }
              <label className='price-label'>{item.priceLabel}</label>
            </Card>
          </Col>  
        </div>
      ))}
    </Row>
  );
};

export default Cards;
