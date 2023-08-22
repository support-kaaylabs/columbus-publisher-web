import React from 'react';
import './dashboard.scss';
import { Col, Row } from 'antd';
import arrowDown from '../../assets/arrow-down.svg';
import arrowUp from '../../assets/arrow-up.svg';

interface dashboardDetails {
  data: {
    Event_Name: string;
    todayPercent: number;
    Today: number;
    Predate: number;
    Week: number;
    Preweek: number;
    weekPercent: number;
    Premonth: number;
    Month: number;
    monthPercent: number;
    Quarter: number;
    Prequarter: number;
    quarterPercent: number;
  };
}

const Dashboard = (props: dashboardDetails) => {
  const { data } = props;

  return (
    <div className="dashboard-page">
      <div
        className={
          data?.Event_Name === 'PRODUCT_VIEWS'
            ? 'impression-img'
            : null || data?.Event_Name === 'PRODUCT_CLICK'
              ? 'clicks-img'
              : null || data?.Event_Name === 'FAVOURITES_CLICK'
                ? 'favourite-img'
                : null || data?.Event_Name === 'CALL_TO_ACTION'
                  ? 'call-to-action-img'
                  : ''
        }
      >
        
        <Row className="row">
          <Col xs={24} sm={24} md={24} lg={4} className="logo">
            <div className="icon-img">
              <div className="icon-img-back">
                <img
                  src={require(`../../assets/${data.Event_Name}.png`)}
                  alt="eye-icon"
                />
              </div>
              <p className='event-name'>
                {data?.Event_Name === 'PRODUCT_VIEWS'
                  ? 'Impressions'
                  : null || data?.Event_Name === 'PRODUCT_CLICK'
                    ? 'Clicks'
                    : null || data?.Event_Name === 'FAVOURITES_CLICK'
                      ? 'Favourite'
                      : null || data?.Event_Name === 'CALL_TO_ACTION'
                        ? 'Call to Action'
                        : ''}
              </p>
            </div>
          </Col>
          <Col md={6} sm={11} xs={11} lg={4} className="column-wid">
            <p className='basic'>Today</p>
            <p className="percentage">
              {data?.todayPercent ? data?.todayPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Today}&nbsp; </span> &nbsp;
              {data.Today < data.Predate ? (
                <img src={arrowDown} alt='down-arrow' />
              ) : (
                <img src={arrowUp} alt='up-arrow' />
              )}
            </div>
          </Col>
          <Col md={6} sm={11} xs={11} lg={4} className="column-wid">
            <p className='basic'>This Week</p>
            <p className="percentage">
              {data.weekPercent ? data.weekPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Week}&nbsp;</span> &nbsp;
              {data.Week < data.Preweek ? (
                <img src={arrowDown} alt='down-arrow' />
              ) : (
                <img src={arrowUp} alt='up-arrow' />
              )}
            </div>
          </Col>
          <Col md={6} sm={11} xs={11} lg={4} className="column-wid">
            <p className='basic'>This Month</p>
            <p className="percentage">
              {data.monthPercent ? data.monthPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Month}&nbsp;</span> &nbsp;
              {data.Month < data.Premonth ? (
                <img src={arrowDown} alt='down-arrow' />
              ) : (
                <img src={arrowUp} alt='up-arrow' />
              )}
            </div>
          </Col>
          <Col md={6} sm={11} xs={11} lg={4} className="column-wid">
            <p className='basic'>Quarter</p>
            <p className="percentage">
              {data.quarterPercent ? data.quarterPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Quarter}&nbsp;</span> &nbsp;
              {data.Quarter < data.Prequarter ? (
                <img src={arrowDown} alt='down-arrow' />
              ) : (
                <img src={arrowUp} alt='up-arrow' />
              )}
            </div>
          </Col>
        </Row>        
      </div>
    </div>
  );
};

export default Dashboard;
