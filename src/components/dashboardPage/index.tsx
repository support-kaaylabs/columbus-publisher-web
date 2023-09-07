import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getPublisherChartYearlyData, getPublisherChartYearlyPrevData, getPublisherChartMonthlyData, getPublisherChartMonthlyPrevData, getPublisherChartWeeklyData, getPublisherChartWeeklyPrevData, getPublisherChartWeeklyNextData } from '../../shared/urlHelper';
import { errorNotification } from '../../shared/globalVariables';
import { get } from 'lodash';
import { chartDataType, curValue, respDataType, chartContainerDataType, postMethodDataType } from '../../shared/type';
import ApexChart from './apexchart';
import ChartContainer from './chartContainer';
import DashboardImg from '../columbusImages/dashboard-img.svg';
import './index.scss';
import ChartSelect from './chartSelect';

const DashboardPage: React.FC = () => {
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
  const [chartMode, setChartMode] = useState<string>('Yearly');
  const [loading, setLoading] = useState<boolean>(true);
  const [userOnboard, setUserOnboard] = useState();
  const [crntWeek, setCrntWeek] = useState('');
  const [crntYear, setCrntYear] = useState(new Date().getFullYear());
  const [crntMonth, setCrntMonth] = useState(new Date().getMonth() + 1);
  const [crntDate, setCrntDate] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [yearCount, setYearCount] = useState(0);
  const [endDate, setEndDate] = useState('');
  const [displayName, setDisplayName] = useState<string | number>('');
  const countStyle = new Intl.NumberFormat('en-IN');
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const onBoardData = get(userOnboard, 'Created_At', '');
  const userOnboardMonth = new Date(onBoardData).getMonth() + 1;
  const userOnboardYear = new Date(onBoardData).getFullYear();
  const userOnboardDate = new Date(onBoardData).getDate();
  const weekMonth = new Date(crntWeek).getMonth() + 1;
  const weekYear = new Date(crntWeek).getFullYear();
  const weekDate = new Date(crntWeek).getDate();
  const prevButtonHandler = () => {
    setChartMode(chartMode + 'prev');
    if (chartMode.includes('Monthly')) {
      setCrntMonth(m => m - 1);
      setMonthCount(mc => mc + 1);
    }
    if (chartMode.includes('Yearly')) {
      setCrntYear(y => y - 1);
      setYearCount(yc => yc + 1);
    }
    if (chartMode.includes('Weekly')) {
      setCrntDate(d => d + 1);
      setWeekCount(wc => wc + 1);
    }
  };

  const nextButtonHandler = () => {
    setChartMode(chartMode + 'next'); 
    if (chartMode.includes('Yearly')) {
      setCrntYear(y => y + 1);
      setYearCount(yc => yc - 1);
    }
    if (chartMode.includes('Monthly')) {
      setCrntMonth(m => m + 1);
      setMonthCount(mc => mc - 1);
    }
    if (chartMode.includes('Weekly')) {
      setCrntDate(d => d - 1);
      setWeekCount(wc => wc - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    // if (chartMode === 'All') {
    //   chartModeFunc(getPublisherChartData);
    // } else
    if (chartMode.includes('Yearly')) {
      const dynmicBtn = chartMode.slice(-4);
      if ((dynmicBtn === 'prev' || dynmicBtn === 'next') && crntYear !== year) {
        const datas: postMethodDataType = {
          yearPosition: crntYear
        };
        getPublisherChartYearlyPrevData(datas).then((resp: respDataType) => {
          fetchData(resp);
          setEndDate(resp.endDate);
          setDisplayName(resp.displayName);
          setLoading(false);
        }).catch((err: any) => {
          errorNotification(err);
          setLoading(false);
        });
      }
      else {
        setEndDate('');
        chartModeFunc(getPublisherChartYearlyData);
      }
    } else if (chartMode.includes('Monthly')) {
      const dynmicBtn = chartMode.slice(-4);
      if ((dynmicBtn === 'prev' || dynmicBtn === 'next') && (crntYear === userOnboardYear ? crntMonth !== month : 1)) {
        let yearPosition;
        let monthPositon;
        if (crntMonth === 0) {
          setCrntMonth(12);
          setCrntYear(y => y - 1);
          monthPositon = 12;
          yearPosition = crntYear - 1;
        }
        else {
          monthPositon = crntMonth;
          yearPosition = crntYear;
        }
        const datas: postMethodDataType = {
          datePosition: monthPositon,
          yearPosition: yearPosition
        };
        getPublisherChartMonthlyPrevData(datas).then((resp: respDataType) => {
          fetchData(resp);          
          setEndDate(resp.endDate);
          setDisplayName(resp.displayName);
          setLoading(false);
        }).catch((err: any) => {
          errorNotification(err);
          setLoading(false);
        });
      } else {
        setEndDate('');
        chartModeFunc(getPublisherChartMonthlyData);
      }
    } else if (chartMode.includes('Weekly')) {
      const dynmicBtn = chartMode.slice(-4);
      if (dynmicBtn === 'prev' && (weekYear === userOnboardYear && weekMonth === userOnboardMonth ? weekDate > userOnboardDate : 1) ) {
        const datas: postMethodDataType = {
          datePosition: crntWeek,
        };
        getPublisherChartWeeklyPrevData(datas).then((resp: respDataType) => {
          fetchData(resp);
          setEndDate(resp.endDate);
          setCrntWeek(resp.weekDate);
          setDisplayName(resp.displayName);
          setLoading(false);
        }).catch((err: any) => {
          errorNotification(err);
          setLoading(false);
        });
      } else if (dynmicBtn === 'next' && crntDate > 0) {
        const datas: postMethodDataType = {
          datePosition: crntWeek,
        };
        getPublisherChartWeeklyNextData(datas).then((resp: respDataType) => {
          fetchData(resp);
          setEndDate(resp.endDate);
          setCrntWeek(resp.weekDate);
          setDisplayName(resp.displayName);
          setLoading(false);
        }).catch((err: any) => {
          errorNotification(err);
          setLoading(false);
        });
      } else {
        setEndDate('');
        chartModeFunc(getPublisherChartWeeklyData);
      }
    }
  }, [chartMode]);


  const chartModeFunc = (getChartFuncApi: () => Promise<any>) => {
    getChartFuncApi().then((resp: respDataType) => {
      if (resp.onBoard) setUserOnboard(resp.onBoard[0]);
      if (chartMode.includes('Weekly')) setCrntWeek(resp.weekDate);
      setDisplayName(resp.displayName);
      fetchData(resp);
      setLoading(false);
    }).catch((err: any) => {
      errorNotification(err);
      setLoading(false);
    });
  };
  const fetchData = (resp: respDataType) => {
    if (resp.success) {
      const containData = {
        viewsTotalCount: '',
        clicksTotalCount: '',
        ctaTotalCount: '',
        viewsStartDate: '',
        clicksStartDate: '',
        ctaStartDate: '',
      };
      resp.count.reduce((acc: chartContainerDataType, curValue: curValue) => {
        if (curValue['Event_Name'] === 'PRODUCT_VIEWS') {
          acc.viewsStartDate = curValue['DateWise'];
          acc.viewsTotalCount = countStyle.format(Number(curValue['Interactions']));
        } else if (curValue['Event_Name'] === 'PRODUCT_CLICK') {
          acc.clicksStartDate = curValue['DateWise'];
          acc.clicksTotalCount = countStyle.format(Number(curValue['Interactions']));
        } else if (curValue['Event_Name'] === 'CALL_TO_ACTION') {
          acc.ctaStartDate = curValue['DateWise'];
          acc.ctaTotalCount = countStyle.format(Number(curValue['Interactions']));
        }
        return acc;
      }, containData);
      setViewsTotalCount(containData.viewsTotalCount);
      setClicksTotalCount(containData.clicksTotalCount);
      setCtaTotalCount(containData.ctaTotalCount);
      setViewsStartDate(containData.viewsStartDate);
      setClicksStartDate(containData.clicksStartDate);
      setCtaStartDate(containData.ctaStartDate);
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
        <ChartContainer viewsTotalCount={viewsTotalCount} clicksTotalCount={clicksTotalCount} ctaTotalCount={ctaTotalCount} viewsStartDate={viewsStartDate} clicksStartDate={clicksStartDate} ctaStartDate={ctaStartDate} endDate={endDate} />
      </div>
      <div className='dashboard-chart'>
        <div className='chart-select'>
          <ChartSelect 
            setChartMode={setChartMode}
            chartMode={chartMode}
            crntYear={crntYear}
            userOnboardYear={userOnboardYear}
            yearCount={yearCount}
            crntMonth={crntMonth}
            userOnboardMonth={userOnboardMonth}
            monthCount={monthCount}
            weekYear={weekYear}
            weekMonth={weekMonth}
            weekDate={weekDate}
            userOnboardDate={userOnboardDate}
            weekCount={weekCount}
            prevButtonHandler={prevButtonHandler}
            nextButtonHandler={nextButtonHandler}
            displayName={displayName}      
          />
        </div>
        {loading && (<div className='chart-loading'>
          <Spin size='large' />
        </div>)}
        <div className='chart-flow'>
          {!loading &&
            <ApexChart loading={loading} viewCount={viewsCount} viewDate={viewsDate} clickCount={clicksCount} ctaCount={ctaCount} />
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
