import React, { type FC } from 'react';
import PublisherDashboard from '../../components/Dashboard';
import { getDashboardData } from '../../shared/urlHelper';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import Charts from '../../components/Dashboard/Chart';
import dashboard from '../../assets/dashboardIn.png';
import { errorNotification } from '../../shared/globalVariables';
import { Col, Row, Spin } from 'antd';
import './index.scss';

const Dashboard: FC = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sellerUid = localStorage.getItem('User_Uid');
    const params = { sellerUid };
    setLoading(true);
    setLoader(true);
    getDashboardData(params)
      .then((data) => {
        console.log(data, 'data');
        if (data?.success) {
          setDashboardData(get(data, 'data', []));
          setLoading(false);
          setLoader(false);
        }
      })
      .catch((err) => {
        errorNotification(err);
        setLoading(false);
        setLoader(false);
      });
  };

  return (
    <div className='spin-Loading'>
      <div className="dashboard-head">
        {loader && (
          <div className="loader">
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        )}
        {!loader && (
          <div className='content-div'>
            <div className='dashboard-div'><img src={dashboard}/><div>Dashboard</div></div>
            <Row gutter={12} style={{marginLeft: '10px'}}>
              {dashboardData?.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <Col xs={24} sm={24} md={24} lg={8} xl={8} className='col'>
                  <PublisherDashboard data={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
