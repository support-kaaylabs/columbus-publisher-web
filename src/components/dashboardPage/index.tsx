import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { get } from 'lodash';
import { getPublisherChartData, getPublisherChartYearlyData, getPublisherChartMonthlyData, getPublisherChartWeeklyData } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';
import { chartDataType, curValue, dashboardPageType, respDataType } from '../../shared/type';
import ApexChart from './apexchart';
import ChartContainer from './chartContainer';
import DashboardImg from '../columbusImages/dashboard-img.svg';
import './index.scss';

const DashboardPage: React.FC<dashboardPageType> = ({ collapsed }) => {
  const [viewsCount, setViewsCount] = useState([]);
  const [viewsDate, setViewsDate] = useState([]);
  const [viewsTotalCount, setViewsTotalCount] = useState<string>('0');
  const [viewsStartDate, setViewsStartDate] = useState<string>('');
  const [clicksTotalCount, setClicksTotalCount] = useState<string>('0');
  const [clicksStartDate, setClicksStartDate] = useState<string>('');
  const [ctaTotalCount, setCtaTotalCount] = useState<string>('0');
  const [ctaStartDate, setCtaStartDate] = useState<string>('');
  const [clicksCount, setClicksCount] = useState([]);
  const [ctaCount, setCtaCount] = useState([]);
  const [chartMode, setChartMode] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (chartMode === 'All') {
      chartModeFunc(getPublisherChartData);
    } else if (chartMode === 'Yearly') {
      chartModeFunc(getPublisherChartYearlyData);
    } else if (chartMode === 'Monthly') {
      chartModeFunc(getPublisherChartMonthlyData);
    } else if (chartMode === 'Weekly') {
      chartModeFunc(getPublisherChartWeeklyData);
    }
  }, [chartMode, collapsed]);
  const chartModeFunc = (getChartFuncApi: () => Promise<any>) => {
    getChartFuncApi().then((resp: respDataType) => {
      fetchData(resp);
      setLoading(false);
    }).catch((err: any) => {
      errorNotification(err);
      setLoading(false);
    });
  };
  const fetchData = (resp: respDataType) => {
    if (resp.success) {
      const viewsTotalCount = get(resp.count, '[0].Interactions', '0');
      const clicksTotalCount = get(resp.count, '[1].Interactions', '0');
      const ctaTotalCount = get(resp.count, '[2].Interactions', '0');
      const viewsStartDate = get(resp.count, '[0].DateWise', '');
      const clicksStartDate = get(resp.count, '[1].DateWise', '');
      const ctaStartDate = get(resp.count, '[2].DateWise', '');
      setViewsTotalCount(viewsTotalCount);
      setClicksTotalCount(clicksTotalCount);
      setCtaTotalCount(ctaTotalCount);
      setViewsStartDate(viewsStartDate);
      setClicksStartDate(clicksStartDate);
      setCtaStartDate(ctaStartDate);
      const chartData = {
        viewDate: [],
        viewCount: [],
        clickDate: [],
        clickCount: [],
        ctaDate: [],
        ctaCount: []
      };
      resp.data.reduce((acc: chartDataType, currentValue: curValue) => {
        if (currentValue['Event_Name'] === 'PRODUCT_VIEWS') {
          acc.viewCount.push(currentValue['Interactions']);
          acc.viewDate.push(currentValue['DateWise']);
        } else if (currentValue['Event_Name'] === 'PRODUCT_CLICK') {
          acc.clickCount.push(currentValue['Interactions']);
        } else if (currentValue['Event_Name'] === 'CALL_TO_ACTION') {
          acc.ctaCount.push(currentValue['Interactions']);
        }
        return acc;
      }, chartData);
      setViewsCount(chartData['viewCount']);
      setViewsDate(chartData['viewDate']);
      setClicksCount(chartData['clickCount']);
      setCtaCount(chartData['ctaCount']);
    }
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <img src={DashboardImg} alt='Dashboard-image' />
        <p>Dashboard</p>
      </div>
      <div className='dashboard-container'>
        <ChartContainer viewsTotalCount={viewsTotalCount} clicksTotalCount={clicksTotalCount} ctaTotalCount={ctaTotalCount} viewsStartDate={viewsStartDate} clicksStartDate={clicksStartDate} ctaStartDate={ctaStartDate} />
      </div>
      {loading && (<div className='dashboard-loading'>
        <Spin size='large' />
      </div>)}
      <div className='dashboard-chart'>
        {!loading &&
          <ApexChart loading={loading} viewCount={viewsCount} viewDate={viewsDate} clickCount={clicksCount} ctaCount={ctaCount} setChartMode={setChartMode} chartMode={chartMode} />
        }
      </div>
    </div>
  );
};

export default DashboardPage;
