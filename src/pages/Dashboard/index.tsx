import React, { type FC } from 'react';
import PublisherDashboard from '../../components/Dashboard';
import {getDashboardData} from '../../shared/urlHelper';
import { useEffect, useState } from 'react';
import {get} from 'lodash';
import Charts from '../../components/Dashboard/Chart';
import { errorNotification } from '../../shared/globalVariables';

const Dashboard: FC = (props) => {
  const [dashboardData , setDashboardData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sellerId = localStorage.getItem('User_ID');  
    const params = {sellerId}; 
    getDashboardData(params).then((data)=>{
      
      if(data.success) {
        setDashboardData(get(data, 'data', []));     
      }
    }).catch((err)=>{
      errorNotification(err);
    });
  };

  return (    
    <div>
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
