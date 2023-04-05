import React, { type FC } from 'react';
import PublisherDashboard from '../../components/Dashboard';
import {getDashboardData} from '../../shared/urlHelper';
import { useEffect, useState } from 'react';
import {get} from 'lodash';
import Charts from '../../components/Dashboard/Chart';
import { errorNotification } from '../../shared/globalVariables';

const Dashboard: FC = (props) => {
  const [dashboardData , setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const sellerId = localStorage.getItem('User_ID');  
    const params = {sellerId}; 
    setLoading(true);
    getDashboardData(params).then((data)=>{
      if(data.success) {
        setDashboardData(get(data, 'data', []));  
        setLoading(false);
      }
    }).catch((err)=>{
      errorNotification(err);
      setLoading(false);
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
        {!loading && <Charts />}
      </div>
    </div>
  );
};

export default Dashboard;
