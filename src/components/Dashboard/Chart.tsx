import React, { useState, useEffect, type FC } from 'react';
import { Tabs, Row, Select, Space,DatePicker } from 'antd';
import './Chart.scss';
import get, { fill } from 'lodash';
import Chart from 'react-apexcharts';
import { getChartData } from '../../shared/urlHelper';
import moment from 'moment';
import grid from 'antd/es/grid';
import tooltip from 'antd/es/tooltip';
import { errorNotification } from '../../shared/globalVariables';

const { TabPane } = Tabs;

const Charts: FC = () => {
  const [counts, setCounts] = useState([]);
  const [dates, setDates] = useState([]);
  const [chartType, setChartType] = useState('views');
  const [chartMode, setChartMode] = useState('Daily');
  const [chartColor, setChartColor] = useState('');

  useEffect(() => {
    fetchData();
  }, [chartType, chartMode]);

  const fetchData = () => {
    const sellerId = localStorage.getItem('User_ID');
    const params = {sellerId, eventName: chartType, chartMode}; 
    getChartData(params).then((resp)=>{
      if(resp.success) {
        const counts = resp.data.map((id: any) => id.count);
        const dates = resp.data.map((id: any) => id.date);
        setCounts(counts);
        setDates(dates);
        setChartColor(
          chartType === 'views'
            ? '#e53935'
            : null || chartType === 'click'
              ? '#AFBCFB'
              : null || chartType === 'favs'
                ? '#79DE8D'
                : null || chartType === 'cta'
                  ? '#f2eaca'
                  : '');
      }
    }).catch((err)=>{
      errorNotification(err);
    });
  };

  const handleTab = (key:any) => {
    setChartType(key);
  };

  const options =  {
    chart: {
      id: 'apexchart-example',
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: undefined,
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true,
      strokeDashArray: 6,
    },
    colors: [chartColor],
    fill: {
      colors: [chartColor]
    },
    yaxis: [{
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: 'grey',
          fontSize: '18px',
        }
      },
      axisBorder: {
        show: true,
        color: '#000000',
        width: 2.5
      }
    }],
    xaxis: {
      categories: dates,
      axisTicks: {
        show: true
      },
      stroke: {
        curve: ['smooth', 'straight', 'stepline']
      },
      labels: {
        style: {
          colors: 'grey',
          fontSize: '18px',
        }
      },
      axisBorder: {
        show: true,
        color: '#000000',
        height: 2.5
      }
    }
  };

  const series= [{
    name: 'series-1',
    data: counts
  }];
  
  return (
    <>
      <Row className="mt-4" style={{ margin: '30px', justifyContent:'center' }}>
        <div className='chartStyle'>
          <Tabs onChange={handleTab} tabBarExtraContent={
            <Space className='drop-btn'>
              <Select
                defaultValue="Daily"
                style={{ width: 140 }}
                bordered={false}
                onChange={(value)=>setChartMode(value)}
                options={[
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Daily', label: 'Daily' },
                ]} 
              />
            </Space>
           
          } className='chartStyle'>
            <TabPane tab="Impressions" key="views">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={1000} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Clicks" key="click">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={1000} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Call To Action" key="cta">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={1000} height={320} />
              </div>
            </TabPane>
            <TabPane tab="Favourite" key="favs">
              <div id="chart">
                <Chart options={options} series={series} type="area" width={1000} height={320} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Row>
    </>
  );
};
