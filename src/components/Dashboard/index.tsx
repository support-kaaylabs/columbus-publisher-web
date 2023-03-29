import React from 'react';
import '../Dashboard/dashboard.scss';
import { Col, Row, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface dashboardDetails {
  data: {
    eventName:string,
    todayPercent:number,
    today:number,
    preDate: number,
    week:number,
    preWeek: number,
    weekPercent:number,
    preMonth: number,
    month:number,
    monthPercent:number,
    quarter:number,
    preQuarter:number,
    quarterPercent:number,
  };
}

const Dashboard = (props: dashboardDetails) => {
  const { data } = props;
  console.log(data, 'propsss==========>');
  
  return (
    <div className="dashboard-page">
      <div
        className={
          data?.eventName === 'views'
            ? 'impression-img'
            : null || data?.eventName === 'click'
              ? 'clicks-img'
              : null || data?.eventName === 'favs'
                ? 'favourite-img'
                : null || data?.eventName === 'cta'
                  ? 'call-to-action-img'
                  : ''
        }
      >
        <Row justify="space-around" className="card-alignment">
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <div className="icon-img">
              <img
                src={require(`../Images/${data.eventName}.png`)}
                alt="eye-icon"
              />
              <p>{data?.eventName === 'views'
                ? 'Impressions'
                : null || data?.eventName === 'click'
                  ? 'Clicks'
                  : null || data?.eventName === 'favs'
                    ? 'Favourites'
                    : null || data?.eventName === 'cta'
                      ? 'Call to Auction'
                      : ''}</p>
            </div>
          </Col>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <Card
              style={{ boxShadow: '0px 0px 10px #00000029' }}
              bordered={false}
            >
              <b>Today</b>
              <p className="percentage">{data.todayPercent}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.today}</span> &nbsp;
                {data.today < data.preDate ? (
                  <ArrowDownOutlined
                    style={{ fontSize: '16px', color: '#EE1313' }}
                  />
                ): (
                  <ArrowUpOutlined
                    style={{ fontSize: '16px', color: '#27AE07' }}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <Card
              style={{ boxShadow: '0px 0px 10px #00000029' }}
              bordered={false}
            >
              <b>This Week</b>
              <p className="percentage">{data.weekPercent}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.week}</span> &nbsp;
                {data.week < data.preWeek ? (
                  <ArrowDownOutlined
                    style={{ fontSize: '16px', color: '#EE1313' }}
                  />
                ): (
                  <ArrowUpOutlined
                    style={{ fontSize: '16px', color: '#27AE07' }}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <Card
              style={{ boxShadow: '0px 0px 10px #00000029' }}
              bordered={false}
            >
              <b>This Month</b>
              <p className="percentage">{data.monthPercent}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.month}</span> &nbsp;
                {data.month < data.preMonth ? (
                  <ArrowDownOutlined
                    style={{ fontSize: '16px', color: '#EE1313' }}
                  />
                ): (
                  <ArrowUpOutlined
                    style={{ fontSize: '16px', color: '#27AE07' }}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
          >
            <Card
              style={{ boxShadow: '0px 0px 10px #00000029' }}
              bordered={false}
            >
              <b>Quarter</b>
              <p className="percentage">{data.quarterPercent}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.quarter}</span>{' '}
                &nbsp;
                {data.quarter < data.preQuarter ? (
                  <ArrowDownOutlined
                    style={{ fontSize: '16px', color: '#EE1313' }}
                  />
                ): (
                  <ArrowUpOutlined
                    style={{ fontSize: '16px', color: '#27AE07' }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
