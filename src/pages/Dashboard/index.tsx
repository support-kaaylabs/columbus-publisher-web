import React, { useEffect, useState, type FC } from 'react';
import Impression from '../../components/Dashboard';

const Dashboard: FC = (props) => {
  type dashboardInfo = {
    title: string;
    todayPercentage: number;
    weekPercentage: number;
    monthPercentage: number;
    quaterPercentage: number;
    todayDifference: number;
    weekDifference: number;
    monthDifference: number;
    quaterDifference: number;
  };
  const dummyData: dashboardInfo[] = [
    {
      title: 'Impressions',
      todayPercentage: 26.5,
      weekPercentage: 45.5,
      monthPercentage: 52.5,
      quaterPercentage: 63,
      todayDifference: 4586,
      weekDifference: 6593,
      monthDifference: 6782,
      quaterDifference: 8952,
    },
    {
      title: 'Clicks',
      todayPercentage: 26.5,
      weekPercentage: 45.5,
      monthPercentage: 52.5,
      quaterPercentage: 63,
      todayDifference: 4586,
      weekDifference: 6593,
      monthDifference: 6782,
      quaterDifference: 8952,
    },
    {
      title: 'Favourite',
      todayPercentage: 26.5,
      weekPercentage: 45.5,
      monthPercentage: 52.5,
      quaterPercentage: 63,
      todayDifference: 4586,
      weekDifference: 6593,
      monthDifference: 6782,
      quaterDifference: 8952,
    },
    {
      title: 'Call to action',
      todayPercentage: 26.5,
      weekPercentage: 45.5,
      monthPercentage: 52.5,
      quaterPercentage: 63,
      todayDifference: 4586,
      weekDifference: 6593,
      monthDifference: 6782,
      quaterDifference: 8952,
    },
  ];

  return (
    <div>
      {/* ************** Impression *************** */}
      <h1>Dashboard Page</h1>
      {dummyData.map((item, index) => (
        <div key={index}>
          <Impression data={item} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
