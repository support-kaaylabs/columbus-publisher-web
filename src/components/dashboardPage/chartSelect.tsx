import React from 'react';
import { Select } from 'antd';
import { chartSelectType } from '../../shared/type';
import DashboardPrevIcon from '../columbusImages/dashboard-prev-icon.svg';
import DashboardNextIcon from '../columbusImages/dashboard-next-icon.svg';
const ChartSelect: React.FC<chartSelectType> = ({
  chartMode,
  setChartMode,
  crntYear,
  userOnboardYear,
  yearCount,
  crntMonth,
  userOnboardMonth,
  monthCount,
  weekYear,
  weekMonth,
  weekDate,
  userOnboardDate,
  weekCount,
  prevButtonHandler,
  nextButtonHandler,
  displayName,
  loading
}) => {
  return (
    <div className='select-div'>
      <p className='pTag'>Activity Insights</p>
      <div className='select-dropdown'>
        <div className='dynamicBtn'>
          {chartMode?.includes('Yearly') &&
            <>
              <button type='button' onClick={prevButtonHandler} className='chart-dropdown-prev' disabled={crntYear > userOnboardYear ? false : true}>
                <img src={DashboardPrevIcon} alt='dashboard-prev-icon' />
              </button>
              <div className='chart-dropdown-data-yearly'>
                {!loading && displayName}
              </div>
              <button type='button' onClick={nextButtonHandler} className='chart-dropdown-next' disabled={yearCount > 0 ? false : true}>
                <img src={DashboardNextIcon} alt='dashboard-next-icon' />
              </button>
            </>
          }
          {chartMode?.includes('Monthly') &&
            <>
              <button type='button' onClick={prevButtonHandler} className='chart-dropdown-prev' disabled={crntYear >= userOnboardYear && (crntYear === userOnboardYear ? crntMonth !== userOnboardMonth : 1) ? false : true}>
                <img src={DashboardPrevIcon} alt='dashboard-prev-icon' />
              </button>
              <div className='chart-dropdown-data-monthly'>
                {!loading && displayName}
              </div>
              <button type='button' onClick={nextButtonHandler} className='chart-dropdown-next' disabled={monthCount > 0 ? false : true}>
                <img src={DashboardNextIcon} alt='dashboard-next-icon' />
              </button>
            </>
          }
          {chartMode?.includes('Weekly') &&
            <>
              <button type='button' onClick={prevButtonHandler} className='chart-dropdown-prev' disabled={weekYear >= userOnboardYear && (weekYear === userOnboardYear && weekMonth === userOnboardMonth ? weekDate > userOnboardDate : 1) ? false : true}>
                <img src={DashboardPrevIcon} alt='dashboard-prev-icon' />
              </button>
              <div className='chart-dropdown-data-weekly'>
                {!loading && displayName}
              </div>
              <button type='button' onClick={nextButtonHandler} className='chart-dropdown-next' disabled={weekCount > 0 ? false : true}>
                <img src={DashboardNextIcon} alt='dashboard-next-icon' />
              </button>
            </>
          }
        </div>
        <Select
          defaultValue={chartMode}
          style={{ width: 140 }}
          bordered={false}
          onChange={(value) => setChartMode(value)}
          options={[
            // { value: 'All', label: 'All' },
            { value: 'Yearly', label: 'YTD' },
            { value: 'Monthly', label: 'MTD' },
            { value: 'Weekly', label: 'Weekly' },
          ]} />
      </div>
    </div>
  );
};

export default ChartSelect;