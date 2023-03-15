import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spin, Tabs, Breadcrumb, Space } from 'antd';
import { get } from 'lodash';
import { FileExcelOutlined } from '@ant-design/icons';
import GeneralReports from './general-report';
import Customreport from './custom-report';
import './report.less';

const { TabPane } = Tabs;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Reports = (properties:any) => {
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState('General');

  const query = useQuery();
  const currentPage = query.get('page');

  const fetchData = () => {
    if (currentPage) {
      setActiveTab(currentPage);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleActiveTab = (event:any) => {
    setActiveTab(event);
    const parameters = new URLSearchParams();
    parameters.append('page', event);

    get(properties, 'history', '').push({
      pathname: '/reports',
      search: parameters.toString(),
    });
  };

  return (
    <Spin spinning={loading}>
      <div className="search-container">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Space>
                <FileExcelOutlined />
                Reports
              </Space>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div />
      </div>
      <div style={{ padding: '0px 10px' }}>
        <Tabs
          type="card"
          activeKey={activeTab}
          onChange={handleActiveTab}
          className="theme-tabs"
        >
          <TabPane tab="General Reports" key="General">
            <GeneralReports properties={properties} />
          </TabPane>
          <TabPane tab="Custom Reports" key="Custom">
            <Customreport properties={properties} />
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  );
};

export default Reports;
