import React from 'react';
import { Row, Col } from 'antd';
import ImpressionBg from '../columbusImages/dasboard-impression-background.svg';
import ClickBg from '../columbusImages/dashboard-click-background.svg';
import CtaBg from '../columbusImages/dashboard-cta-background.svg';
import ImpressionBgIcon from '../columbusImages/dashboard-impression-background-icon.svg';
import ClickBgIcon from '../columbusImages/dashboard-click-background-icon.svg';
import CtaBgIcon from '../columbusImages/dashboard-cta-background-icon.svg';
import { chartContainerDataType } from '../../shared/type';
import './chartContainer.scss';

const ChartContainer: React.FC<chartContainerDataType> = ({ viewsTotalCount, viewsStartDate, clicksTotalCount, clicksStartDate, ctaTotalCount, ctaStartDate, userOnboard, chartMode }) => {
  return (
    <Row gutter={8} className='dashboard-container'>
      <Col sm={24} md={24} lg={8}>
        <div className='chart-container-column'>
          <div className='chart-container-column-left'>
            <p className='actions'>Impressions</p>
            <p className='impressions-counts'>{viewsTotalCount ? viewsTotalCount : '0'}</p>
            <p className='date'>{chartMode === 'All' ? userOnboard : (viewsStartDate ? viewsStartDate : '')} - Till Date</p>
          </div>
          <div className='chart-container-column-right'>
            <div className='background'>
              <img src={ImpressionBg} alt='impression-background' />
            </div>
            <div className='impression-background-icon'>
              <img src={ImpressionBgIcon} alt='impression-background-icon' />
            </div>
          </div>
        </div>
      </Col>
      <Col sm={24} md={24} lg={8}>
        <div className='chart-container-column'>
          <div className='chart-container-column-left'>
            <p className='actions'>Clicks</p>
            <p className='clicks-counts'>{clicksTotalCount ? clicksTotalCount : '0'}</p>
            <p className='date'>{chartMode === 'All' ? userOnboard : (clicksStartDate ? clicksStartDate : '')} - Till Date</p>
          </div>
          <div className='chart-container-column-right'>
            <div className='background'>
              <img src={ClickBg} alt='click-background' />
            </div>
            <div className='click-background-icon'>
              <img src={ClickBgIcon} alt='click-background-icon' />
            </div>
          </div>
        </div>
      </Col>
      <Col sm={24} md={24} lg={8}>
        <div className='chart-container-column'>
          <div className='chart-container-column-left'>
            <p className='actions'>Call to Action</p>
            <p className='cta-counts'>{ctaTotalCount ? ctaTotalCount : '0'}</p>
            <p className='date'>{chartMode === 'All' ? userOnboard : (ctaStartDate ? ctaStartDate : '')} - Till Date</p>
          </div>
          <div className='chart-container-column-right'>
            <div className='background'>
              <img src={CtaBg} alt='cta-background' />
            </div>
            <div className='cta-background-icon'>
              <img src={CtaBgIcon} alt='cta-background-icon' />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ChartContainer;