
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { chartDataType, seriesType } from '../../shared/type';
import './apexchart.scss';

const ApexChart: React.FC<chartDataType> = ({ viewDate, viewCount, clickCount, ctaCount, collapsed }) => {
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
  const pageWidth = window.innerWidth;
  let wd;
  if(collapsed) {
    wd = '100%';
  } else {
    wd = pageWidth < 768 ? 600 : pageWidth-260;
  }
  
  return (
    <div className='chart'>
      <ReactApexChart options={options as ApexCharts.ApexOptions} series={series} type="area" height={350} width={wd} />
    </div>
  );
};

export default ApexChart;

