import React, { useEffect, useState, type FC } from 'react';
import Charts from '../../components/Chart/Chart';
import Impression from "../../components/Dashboard";

const Dashboard: FC = (props) => {
  // const [value, setValue] = useState<number>(0);
  type dashboardInfo = {
    title: string,
    todayPercentage: Number,
    weekPercentage: Number,
    monthPercentage: Number,
    quaterPercentage: Number,
    todayDifference: Number,
    weekDifference: Number,
    monthDifference: Number,
    quaterDifference: Number,
  }
  const dummyData: dashboardInfo[] = [
    {
      title: "Impressions",
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
      title: "Clicks",
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
      title: "Favourite",
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
      title: "Call to action",
      todayPercentage: 26.5,
      weekPercentage: 45.5,
      monthPercentage: 52.5,
      quaterPercentage: 63,
      todayDifference: 4586,
      weekDifference: 6593,
      monthDifference: 6782,
      quaterDifference: 8952,
    },
  ]

  return (
    <div>
      {/* ************** Impression *************** */}
      <div>
        <h1>Dashboard Page</h1>
        {dummyData.map((item, index) => (
          <Impression
            data={item}
          />
        ))}
      </div>
      {/* ************** Chart *************** */}
      <div>
        <h1>Chart</h1>
        <Charts />
      </div>
    </div>
  )
}

export default Dashboard