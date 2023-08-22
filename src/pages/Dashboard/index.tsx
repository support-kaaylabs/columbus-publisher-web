import React, { type FC } from 'react';
import PublisherDashboard from '../../components/Dashboard';
import { getDashboardData } from '../../shared/urlHelper';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import Charts from '../../components/Dashboard/Chart';
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
    <div className="dashboard-head" style={{overflowY: 'auto',height: '100vh'}}>
      {loader && (
        <div className="loader">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
      {!loader && (
        <Row>
          <Col sm={24} xs={24} md={0} lg={0}>
            <div className="content-name">DASHBOARD</div>
          </Col>
          <Col>
            {dashboardData?.map((item, index) => (
              <div key={index}>
                <PublisherDashboard data={item} />
              </div>
            ))}
            <div>{!loading && <Charts />}</div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
