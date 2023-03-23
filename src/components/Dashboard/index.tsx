import React from 'react';
import '../Dashboard/dashboard.scss';
import { Col, Row, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface dashboardDetails {
  data: {
    title:string,
    todayPercentage:number,
    todayDifference:number,
    weekDifference:number,
    weekPercentage:number,
    monthDifference:number,
    monthPercentage:number,
    quaterDifference:number,
    quaterPercentage:number,
  };
}

const Dashboard = (props: dashboardDetails) => {
  const { data } = props;

  return (
    <div className="dashboard-page">
      <div
        className={
          data?.title === 'Impressions'
            ? 'impression-img'
            : null || data?.title === 'Clicks'
              ? 'clicks-img'
              : null || data?.title === 'Favourite'
                ? 'favourite-img'
                : null || data?.title === 'Call to action'
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
                src={require(`../Images/${data.title}.png`)}
                alt="eye-icon"
              />
              <p>{data.title}</p>
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
              <p className="percentage">{data.todayPercentage}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.todayDifference}</span> &nbsp;
                <ArrowDownOutlined
                  style={{ fontSize: '16px', color: '#EE1313' }}
                />
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
              <p className="percentage">{data.weekPercentage}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.weekDifference}</span> &nbsp;
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
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
              <p className="percentage">{data.monthPercentage}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.monthDifference}</span> &nbsp;
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
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
              <p className="percentage">{data.quaterPercentage}%</p>
              <div className="d-flex">
                <span className="diffrence">{data.quaterDifference}</span>{' '}
                &nbsp;
                <ArrowUpOutlined
                  style={{ fontSize: '16px', color: '#27AE07' }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
