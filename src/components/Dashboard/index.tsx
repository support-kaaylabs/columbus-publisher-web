import React from 'react';
import './dashboard.scss';
import { Col, Row } from 'antd';
import impressions from '../../assets/impressionImg.png';
import calltoAction from '../../assets/calltoAction.png';
import clicks from '../../assets/clicksGreen.png';


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
      <Row className='row' gutter={1}>
        <Col span={24} className='col'>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div className='left-div'>

                <Row className='event-name'>
                  <Col><p>
                    {data?.Event_Name === 'PRODUCT_VIEWS'
                      ? 'Impressions'
                      : null || data?.Event_Name === 'PRODUCT_CLICK'
                        ? 'Clicks'
                        : null || data?.Event_Name === 'CALL_TO_ACTION'
                          ? 'Call to Action'
                          : ''}
                  </p></Col>
                  <Col><p>45615</p></Col>
                  <Col><div>Jun01- Till Date</div></Col>
                </Row>
              </div>
              <div className='right-div'>
                {data?.Event_Name === 'PRODUCT_VIEWS'
                  ?
                  <div className="container">
                    <img className="background" src={impressions} alt="eye-icon" />
                    <div className="logo"><img src={require(`../../assets/${data.Event_Name}.png`)} /></div>
                  </div>
                  : null || data?.Event_Name === 'PRODUCT_CLICK'
                    ? <div className="container">
                      <img className="background" src={clicks} alt="eye-icon" />
                      <div className="logo"><img src={require(`../../assets/${data.Event_Name}.png`)} /></div>
                    </div>
                    : null || data?.Event_Name === 'CALL_TO_ACTION'
                      ? <div className="container">
                        <img className="background" src={calltoAction} alt="eye-icon" />
                        <div className="logo"><img src={require(`../../assets/${data.Event_Name}.png`)} /></div>
                      </div>
                      : ''}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
