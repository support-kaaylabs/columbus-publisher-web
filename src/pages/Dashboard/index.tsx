import React, { type FC } from 'react';
import PublisherDashboard from '../../components/Dashboard';
import {getDashboardData} from '../../shared/urlHelper';
import { useEffect, useState } from 'react';
import {get} from 'lodash';
import Charts from '../../components/Dashboard/Chart';

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
  const [dashboardData , setDashboardData] = useState([]);
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sellerId = localStorage.getItem('User_ID');
    console.log(sellerId, 'sellerID');    
    const params = {sellerId}; 
    getDashboardData(params).then((data)=>{
      console.log(data, 'datatta==========>');
      
      if(data.success) {
        setDashboardData(get(data, 'data', []));     
      }
    }).catch((err)=>{
      console.log(err);
    });
  };

  return (    
    <div>
      <h1>Dashboard Page</h1>
      {dashboardData.map((item, index) => (
        <div key={index}>
          <PublisherDashboard data={item} />
        </div>
      ))}
      <div>
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
