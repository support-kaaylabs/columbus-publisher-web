import React, { useState, type FC } from 'react';
import { Tabs, Row, Col, Select, Space } from 'antd';
import './Chart.scss';
import Chart from 'react-apexcharts';

const { TabPane } = Tabs;
const Charts: FC = () => {
  const [chartData, setChartData] = useState({
    options: {
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
          fontFamily: undefined,
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
          title: 'Size: ',
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
        enabled: false,
      },
      grid: {
        show: true,
        strokeDashArray: 6,
      },
      colors: ['#e53935'],
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0'],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          labels: {
            style: {
              colors: 'grey',
              fontSize: '18px',
            },
          },
          axisBorder: {
            show: true,
            color: '#000000',
            width: 2.5,
          },
        },
      ],
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        axisTicks: {
          show: true,
        },
        labels: {
          style: {
            colors: 'grey',
            fontSize: '18px',
          },
        },
        axisBorder: {
          show: true,
          color: '#000000',
          height: 2.5,
        },
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  const [clickChartData, setClickChartData] = useState({
    options: {
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
          fontFamily: undefined,
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
          title: 'Size: ',
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
        enabled: false,
      },
      grid: {
        show: true,
        strokeDashArray: 6,
      },
      fill: {
        colors: ['#AFBCFB'],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          labels: {
            style: {
              colors: 'grey',
              fontSize: '18px',
            },
          },
          axisBorder: {
            show: true,
            color: '#000000',
            width: 2.5,
          },
        },
      ],
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        axisTicks: {
          show: true,
        },
        stroke: {
          curve: ['smooth', 'straight', 'stepline'],
        },
        labels: {
          style: {
            colors: 'grey',
            fontSize: '18px',
          },
        },
        axisBorder: {
          show: true,
          color: '#000000',
          height: 2.5,
        },
      },
    },
    series: [
      {
        name: 'series-1',
        data: [70, 60, 35, 50, 49, 20, 70, 31, 125],
      },
    ],
  });
  const [favouriteChartData, setFavouriteClickChartData] = useState({
    options: {
      chart: {
        id: 'apexchart-example',
      },
      dataLabels: {
        enabled: false,
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
          fontFamily: undefined,
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
          title: 'Size: ',
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
      grid: {
        show: true,
        strokeDashArray: 6,
      },
      fill: {
        colors: ['#79DE8D'],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          labels: {
            style: {
              colors: 'grey',
              fontSize: '18px',
            },
          },
          axisBorder: {
            show: true,
            color: '#000000',
            width: 2.5,
          },
        },
      ],
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        axisTicks: {
          show: true,
        },
        labels: {
          style: {
            colors: 'grey',
            fontSize: '18px',
          },
        },
        axisBorder: {
          show: true,
          color: '#000000',
          height: 2.5,
        },
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 39, 60, 10, 91, 15],
      },
    ],
  });

  return (
    <>
      <Row className="mt-4" style={{ margin: '30px' }}>
        <ul className="charts-tabs">
          <li>
            <Tabs>
              <TabPane tab="Impressions" key="Impressions">
                <div id="chart">
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    width={1000}
                    height={320}
                  />
                </div>
              </TabPane>
              <TabPane tab="Clicks" key="Clicks">
                <div id="chart">
                  <Chart
                    options={clickChartData.options}
                    series={clickChartData.series}
                    type="area"
                    width={1000}
                    height={320}
                  />
                </div>
              </TabPane>
              <TabPane tab="Favourite" key="Favourite">
                <div id="chart">
                  <Chart
                    options={favouriteChartData.options}
                    series={favouriteChartData.series}
                    type="area"
                    width={1000}
                    height={320}
                  />
                </div>
              </TabPane>
            </Tabs>
          </li>
          <li>
            <Space wrap className="drop-btn">
              <Select
                defaultValue="Monthly"
                style={{ width: 140 }}
                bordered={false}
                options={[
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Weekly', label: 'Weekly' },
                ]}
              />
            </Space>
          </li>
        </ul>
      </Row>
    </>
  );
};
export default Charts;
