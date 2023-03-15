/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type FC } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { getJbReports } from '../../shared/urlHelper';
import Meta from 'antd/es/card/Meta';
import '../../stylesheet/style.scss';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = (): any => {
    getJbReports().then((res) => {
      const { data }: any = res.data;
      setData(data);
    });
  };

  const clickReportCard = (data: any) => {
    navigate(data.Report_Name, {state:{...data}});
  };

  console.log('data-->', data);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Reports</h3>
      </div>
      <Row gutter={16}>
        {data.length &&
          data.map((item: any) => (
            <Col span={6} style={{ marginTop: 5 }} key={item.Report_ID}>
              <Card
                className="report-cards"
                key={item.Report_ID}
                onClick={() => clickReportCard(item)}
              >
                <Meta title={item.Report_Name} description={item.Description} />
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Home;
