import React from 'react';
import '../Dashboard/dashboard.scss';
import { Col, Row } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

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
      <Row
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
        <div className='contentLogo'>
          <Col md={24} sm={24} xl={3} >
            <div className="icon-img">
              <div className="icon-img-back">
                <img
                  src={require(`../Images/${data.Event_Name}.png`)}
                  alt="eye-icon"
                />
              </div>
              <p>
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
        </div>
        <div className='content'>
          <Col className='columnWid'>
            <b>Today</b>
            <p className="percentage">
              {data?.todayPercent ? data?.todayPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Today}</span> &nbsp;
              {data.Today < data.Predate ? (
                <ArrowDownOutlined
                  style={{ fontSize: '16px', color: '#EE1313' }}
                />
              ) : (
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
              )}
            </div>
          </Col>
          <Col className='columnWid'>
            <b>This Week</b>
            <p className="percentage">
              {data.weekPercent ? data.weekPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Week}</span> &nbsp;
              {data.Week < data.Preweek ? (
                <ArrowDownOutlined
                  style={{ fontSize: '16px', color: '#EE1313' }}
                />
              ) : (
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
              )}
            </div>
          </Col>
          <Col className='columnWid'>
            <b>This Month</b>
            <p className="percentage">
              {data.monthPercent ? data.monthPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Month}</span> &nbsp;
              {data.Month < data.Premonth ? (
                <ArrowDownOutlined
                  style={{ fontSize: '16px', color: '#EE1313' }}
                />
              ) : (
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
              )}
            </div>
          </Col>
          <Col className='columnWid'>
            <b>Quarter</b>
            <p className="percentage">
              {data.quarterPercent ? data.quarterPercent : '0'} %
            </p>
            <div className="d-flex">
              <span className="diffrence">{data.Quarter}</span> &nbsp;
              {data.Quarter < data.Prequarter ? (
                <ArrowDownOutlined
                  style={{ fontSize: '16px', color: '#EE1313' }}
                />
              ) : (
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
              )}
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default Dashboard;
