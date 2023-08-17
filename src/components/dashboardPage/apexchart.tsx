
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Tabs, Select } from 'antd';
import { chartDataType, seriesType } from '../../shared/type';
const { TabPane } = Tabs;

const ApexChart: React.FC<chartDataType> = ({ viewDate, viewCount, clickCount, ctaCount, setChartMode, chartMode }) => {
  const [series] = useState<seriesType[]>([
    {
      name: 'Impressions',
      data: viewCount,
    },
    {
      name: 'Clicks',
      data: clickCount,
    },
    {
      name: 'Call to Actions',
      data: ctaCount,
    },
  ]);
  const options = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'date',
      categories: viewDate,
    },
    // tooltip: {
    //   x: {
    //     format: 'MM',
    //   },

    // },
    colors: ['#4099FF', '#13C64F', '#F7Af2D'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
  };
  return (
    <Tabs tabBarExtraContent={
      <><p>Chart</p>
        <Select
          defaultValue={chartMode}
          style={{ width: 140 }}
          bordered={false}
          onChange={(value) => setChartMode(value)}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Yearly', label: 'YTD' },
            { value: 'Monthly', label: 'MTD' },
            { value: 'Weekly', label: 'Weekly' },
          ]} /></>
    }>
      <TabPane>
        <div id="chart">
          <ReactApexChart options={options as ApexCharts.ApexOptions} series={series} type="area" height={350} />
        </div>
      </TabPane>
    </Tabs>
  );
};

export default ApexChart;

